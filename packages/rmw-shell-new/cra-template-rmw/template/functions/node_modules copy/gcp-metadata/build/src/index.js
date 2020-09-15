"use strict";
/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gaxios_1 = require("gaxios");
const jsonBigint = require('json-bigint');
exports.HOST_ADDRESS = 'http://169.254.169.254';
exports.BASE_PATH = '/computeMetadata/v1';
exports.BASE_URL = exports.HOST_ADDRESS + exports.BASE_PATH;
exports.SECONDARY_HOST_ADDRESS = 'http://metadata.google.internal.';
exports.SECONDARY_BASE_URL = exports.SECONDARY_HOST_ADDRESS + exports.BASE_PATH;
exports.HEADER_NAME = 'Metadata-Flavor';
exports.HEADER_VALUE = 'Google';
exports.HEADERS = Object.freeze({ [exports.HEADER_NAME]: exports.HEADER_VALUE });
// Accepts an options object passed from the user to the API. In previous
// versions of the API, it referred to a `Request` or an `Axios` request
// options object.  Now it refers to an object with very limited property
// names. This is here to help ensure users don't pass invalid options when
// they  upgrade from 0.4 to 0.5 to 0.8.
function validate(options) {
    Object.keys(options).forEach(key => {
        switch (key) {
            case 'params':
            case 'property':
            case 'headers':
                break;
            case 'qs':
                throw new Error(`'qs' is not a valid configuration option. Please use 'params' instead.`);
            default:
                throw new Error(`'${key}' is not a valid configuration option.`);
        }
    });
}
async function metadataAccessor(type, options, noResponseRetries = 3, fastFail = false) {
    options = options || {};
    if (typeof options === 'string') {
        options = { property: options };
    }
    let property = '';
    if (typeof options === 'object' && options.property) {
        property = '/' + options.property;
    }
    validate(options);
    try {
        const requestMethod = fastFail ? fastFailMetadataRequest : gaxios_1.request;
        const res = await requestMethod({
            url: `${exports.BASE_URL}/${type}${property}`,
            headers: Object.assign({}, exports.HEADERS, options.headers),
            retryConfig: { noResponseRetries },
            params: options.params,
            responseType: 'text',
            timeout: requestTimeout(),
        });
        // NOTE: node.js converts all incoming headers to lower case.
        if (res.headers[exports.HEADER_NAME.toLowerCase()] !== exports.HEADER_VALUE) {
            throw new Error(`Invalid response from metadata service: incorrect ${exports.HEADER_NAME} header.`);
        }
        else if (!res.data) {
            throw new Error('Invalid response from the metadata service');
        }
        if (typeof res.data === 'string') {
            try {
                return jsonBigint.parse(res.data);
            }
            catch (_a) {
                /* ignore */
            }
        }
        return res.data;
    }
    catch (e) {
        if (e.response && e.response.status !== 200) {
            e.message = `Unsuccessful response status code. ${e.message}`;
        }
        throw e;
    }
}
async function fastFailMetadataRequest(options) {
    const secondaryOptions = Object.assign(Object.assign({}, options), { url: options.url.replace(exports.BASE_URL, exports.SECONDARY_BASE_URL) });
    // We race a connection between DNS/IP to metadata server. There are a couple
    // reasons for this:
    //
    // 1. the DNS is slow in some GCP environments; by checking both, we might
    //    detect the runtime environment signficantly faster.
    // 2. we can't just check the IP, which is tarpitted and slow to respond
    //    on a user's local machine.
    //
    // Additional logic has been added to make sure that we don't create an
    // unhandled rejection in scenarios where a failure happens sometime
    // after a success.
    //
    // Note, however, if a failure happens prior to a success, a rejection should
    // occur, this is for folks running locally.
    //
    let responded = false;
    const r1 = gaxios_1.request(options)
        .then(res => {
        responded = true;
        return res;
    })
        .catch(err => {
        if (responded) {
            return r2;
        }
        else {
            responded = true;
            throw err;
        }
    });
    const r2 = gaxios_1.request(secondaryOptions)
        .then(res => {
        responded = true;
        return res;
    })
        .catch(err => {
        if (responded) {
            return r1;
        }
        else {
            responded = true;
            throw err;
        }
    });
    return Promise.race([r1, r2]);
}
// tslint:disable-next-line no-any
function instance(options) {
    return metadataAccessor('instance', options);
}
exports.instance = instance;
// tslint:disable-next-line no-any
function project(options) {
    return metadataAccessor('project', options);
}
exports.project = project;
/*
 * How many times should we retry detecting GCP environment.
 */
function detectGCPAvailableRetries() {
    return process.env.DETECT_GCP_RETRIES
        ? Number(process.env.DETECT_GCP_RETRIES)
        : 0;
}
/**
 * Determine if the metadata server is currently available.
 */
let cachedIsAvailableResponse;
async function isAvailable() {
    try {
        // If a user is instantiating several GCP libraries at the same time,
        // this may result in multiple calls to isAvailable(), to detect the
        // runtime environment. We use the same promise for each of these calls
        // to reduce the network load.
        if (cachedIsAvailableResponse === undefined) {
            cachedIsAvailableResponse = metadataAccessor('instance', undefined, detectGCPAvailableRetries(), true);
        }
        await cachedIsAvailableResponse;
        return true;
    }
    catch (err) {
        if (process.env.DEBUG_AUTH) {
            console.info(err);
        }
        if (err.type === 'request-timeout') {
            // If running in a GCP environment, metadata endpoint should return
            // within ms.
            return false;
        }
        else if (err.code &&
            [
                'EHOSTDOWN',
                'EHOSTUNREACH',
                'ENETUNREACH',
                'ENOENT',
                'ENOTFOUND',
                'ECONNREFUSED',
            ].includes(err.code)) {
            // Failure to resolve the metadata service means that it is not available.
            return false;
        }
        else if (err.response && err.response.status === 404) {
            return false;
        }
        // Throw unexpected errors.
        throw err;
    }
}
exports.isAvailable = isAvailable;
/**
 * reset the memoized isAvailable() lookup.
 */
function resetIsAvailableCache() {
    cachedIsAvailableResponse = undefined;
}
exports.resetIsAvailableCache = resetIsAvailableCache;
function requestTimeout() {
    // In testing, we were able to reproduce behavior similar to
    // https://github.com/googleapis/google-auth-library-nodejs/issues/798
    // by making many concurrent network requests. Requests do not actually fail,
    // rather they take significantly longer to complete (and we hit our
    // default 3000ms timeout).
    //
    // This logic detects a GCF environment, using the documented environment
    // variables K_SERVICE and FUNCTION_NAME:
    // https://cloud.google.com/functions/docs/env-var and, in a GCF environment
    // eliminates timeouts (by setting the value to 0 to disable).
    return process.env.K_SERVICE || process.env.FUNCTION_NAME ? 0 : 3000;
}
exports.requestTimeout = requestTimeout;
//# sourceMappingURL=index.js.map