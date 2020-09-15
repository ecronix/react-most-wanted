"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf = require("protobufjs");
exports.protobuf = protobuf;
const gax = require("./gax");
const nodeFetch = require("node-fetch");
const routingHeader = require("./routingHeader");
exports.routingHeader = routingHeader;
const abort_controller_1 = require("abort-controller");
const status_1 = require("./status");
const google_auth_library_1 = require("google-auth-library");
const operationsClient_1 = require("./operationsClient");
const createApiCall_1 = require("./createApiCall");
const isbrowser_1 = require("./isbrowser");
const fallbackError_1 = require("./fallbackError");
var pathTemplate_1 = require("./pathTemplate");
exports.PathTemplate = pathTemplate_1.PathTemplate;
var gax_1 = require("./gax");
exports.CallSettings = gax_1.CallSettings;
exports.constructSettings = gax_1.constructSettings;
exports.RetryOptions = gax_1.RetryOptions;
exports.version = require('../../package.json').version + '-fallback';
var descriptor_1 = require("./descriptor");
exports.BundleDescriptor = descriptor_1.BundleDescriptor;
exports.LongrunningDescriptor = descriptor_1.LongrunningDescriptor;
exports.PageDescriptor = descriptor_1.PageDescriptor;
exports.StreamDescriptor = descriptor_1.StreamDescriptor;
var streaming_1 = require("./streamingCalls/streaming");
exports.StreamType = streaming_1.StreamType;
const CLIENT_VERSION_HEADER = 'x-goog-api-client';
class GrpcClient {
    /**
     * gRPC-fallback version of GrpcClient
     * Implements GrpcClient API for a browser using grpc-fallback protocol (sends serialized protobuf to HTTP/1 $rpc endpoint).
     *
     * @param {Object=} options.auth - An instance of OAuth2Client to use in browser, or an instance of GoogleAuth from google-auth-library
     *  to use in Node.js. Required for browser, optional for Node.js.
     * @param {Function=} options.promise - A constructor for a promise that
     * implements the ES6 specification of promise.
     * @constructor
     */
    constructor(options = {}) {
        if (isbrowser_1.isBrowser()) {
            if (!options.auth) {
                throw new Error(JSON.stringify(options) +
                    'You need to pass auth instance to use gRPC-fallback client in browser. Use OAuth2Client from google-auth-library.');
            }
            this.auth = options.auth;
        }
        else {
            this.auth =
                options.auth ||
                    new google_auth_library_1.GoogleAuth(options);
        }
        this.promise = 'promise' in options ? options.promise : Promise;
        this.fallback = true;
        this.grpcVersion = 'fallback'; // won't be used anywhere but we need it to exist in the class
    }
    /**
     * gRPC-fallback version of loadProto
     * Loads the protobuf root object from a JSON object created from a proto file
     * @param {Object} jsonObject - A JSON version of a protofile created usin protobuf.js
     * @returns {Object} Root namespace of proto JSON
     */
    loadProto(jsonObject) {
        const rootObject = protobuf.Root.fromJSON(jsonObject);
        return rootObject;
    }
    getServiceMethods(service) {
        const methods = Object.keys(service.methods);
        const methodsLowerCamelCase = methods.map(method => {
            return method[0].toLowerCase() + method.substring(1);
        });
        return methodsLowerCamelCase;
    }
    /**
     * gRPC-fallback version of constructSettings
     * A wrapper of {@link constructSettings} function under the gRPC context.
     *
     * Most of parameters are common among constructSettings, please take a look.
     * @param {string} serviceName - The fullly-qualified name of the service.
     * @param {Object} clientConfig - A dictionary of the client config.
     * @param {Object} configOverrides - A dictionary of overriding configs.
     * @param {Object} headers - A dictionary of additional HTTP header name to
     *   its value.
     * @return {Object} A mapping of method names to CallSettings.
     */
    constructSettings(serviceName, clientConfig, configOverrides, headers) {
        function buildMetadata(abTests, moreHeaders) {
            const metadata = {};
            if (!headers) {
                headers = {};
            }
            // Since gRPC expects each header to be an array,
            // we are doing the same for fallback here.
            for (const key in headers) {
                if (headers.hasOwnProperty(key)) {
                    metadata[key] = Array.isArray(headers[key])
                        ? headers[key]
                        : [headers[key]];
                }
            }
            // gRPC-fallback request must have 'grpc-web/' in 'x-goog-api-client'
            const clientVersions = [];
            if (metadata[CLIENT_VERSION_HEADER] &&
                metadata[CLIENT_VERSION_HEADER][0]) {
                clientVersions.push(...metadata[CLIENT_VERSION_HEADER][0].split(' '));
            }
            clientVersions.push(`grpc-web/${exports.version}`);
            metadata[CLIENT_VERSION_HEADER] = [clientVersions.join(' ')];
            if (!moreHeaders) {
                return metadata;
            }
            for (const key in moreHeaders) {
                if (key.toLowerCase() !== CLIENT_VERSION_HEADER &&
                    moreHeaders.hasOwnProperty(key)) {
                    const value = moreHeaders[key];
                    if (Array.isArray(value)) {
                        if (metadata[key] === undefined) {
                            metadata[key] = value;
                        }
                        else {
                            if (Array.isArray(metadata[key])) {
                                metadata[key].push(...value);
                            }
                            else {
                                throw new Error(`Can not add value ${value} to the call metadata.`);
                            }
                        }
                    }
                    else {
                        metadata[key] = [value];
                    }
                }
            }
            return metadata;
        }
        return gax.constructSettings(serviceName, clientConfig, configOverrides, status_1.Status, { metadataBuilder: buildMetadata }, this.promise);
    }
    /**
     * gRPC-fallback version of createStub
     * Creates a gRPC-fallback stub with authentication headers built from supplied OAuth2Client instance
     *
     * @param {function} CreateStub - The constructor function of the stub.
     * @param {Object} service - A protobufjs Service object (as returned by lookupService)
     * @param {Object} opts - Connection options, as described below.
     * @param {string} opts.servicePath - The hostname of the API endpoint service.
     * @param {number} opts.port - The port of the service.
     * @return {Promise} A promise which resolves to a gRPC-fallback service stub, which is a protobuf.js service stub instance modified to match the gRPC stub API
     */
    async createStub(service, opts) {
        // an RPC function to be passed to protobufjs RPC API
        function serviceClientImpl(method, requestData, callback) {
            return [method, requestData, callback];
        }
        // decoder for google.rpc.Status messages
        const statusDecoder = new fallbackError_1.FallbackErrorDecoder();
        if (!this.authClient) {
            if (this.auth && 'getClient' in this.auth) {
                this.authClient = await this.auth.getClient();
            }
            else if (this.auth && 'getRequestHeaders' in this.auth) {
                this.authClient = this.auth;
            }
        }
        if (!this.authClient) {
            throw new Error('No authentication was provided');
        }
        const authHeader = await this.authClient.getRequestHeaders();
        const serviceStub = service.create(serviceClientImpl, false, false);
        const methods = this.getServiceMethods(service);
        const newServiceStub = service.create(serviceClientImpl, false, false);
        for (const methodName of methods) {
            newServiceStub[methodName] = (req, options, metadata, callback) => {
                const [method, requestData, serviceCallback] = serviceStub[methodName].apply(serviceStub, [req, callback]);
                // tslint:disable-next-line no-any
                let cancelController, cancelSignal;
                if (isbrowser_1.isBrowser && typeof AbortController !== 'undefined') {
                    cancelController = new AbortController();
                }
                else {
                    cancelController = new abort_controller_1.AbortController();
                }
                if (cancelController) {
                    cancelSignal = cancelController.signal;
                }
                let cancelRequested = false;
                const headers = Object.assign({}, authHeader);
                headers['Content-Type'] = 'application/x-protobuf';
                for (const key of Object.keys(options)) {
                    headers[key] = options[key][0];
                }
                const grpcFallbackProtocol = opts.protocol || 'https';
                let servicePath = opts.servicePath;
                if (!servicePath &&
                    service.options &&
                    service.options['(google.api.default_host)']) {
                    servicePath = service.options['(google.api.default_host)'];
                }
                if (!servicePath) {
                    serviceCallback(new Error('Service path is undefined'));
                    return;
                }
                let servicePort;
                const match = servicePath.match(/^(.*):(\d+)$/);
                if (match) {
                    servicePath = match[1];
                    servicePort = match[2];
                }
                if (opts.port) {
                    servicePort = opts.port;
                }
                else if (!servicePort) {
                    servicePort = 443;
                }
                const protoNamespaces = [];
                let currNamespace = method.parent;
                while (currNamespace.name !== '') {
                    protoNamespaces.unshift(currNamespace.name);
                    currNamespace = currNamespace.parent;
                }
                const protoServiceName = protoNamespaces.join('.');
                const rpcName = method.name;
                const url = `${grpcFallbackProtocol}://${servicePath}:${servicePort}/$rpc/${protoServiceName}/${rpcName}`;
                const fetch = isbrowser_1.isBrowser()
                    ? window.fetch
                    : nodeFetch;
                fetch(url, {
                    headers,
                    method: 'post',
                    body: requestData,
                    signal: cancelSignal,
                })
                    .then((response) => {
                    return Promise.all([
                        Promise.resolve(response.ok),
                        response.arrayBuffer(),
                    ]);
                })
                    .then(([ok, buffer]) => {
                    if (!ok) {
                        const status = statusDecoder.decodeRpcStatus(buffer);
                        throw new Error(JSON.stringify(status));
                    }
                    serviceCallback(null, new Uint8Array(buffer));
                })
                    .catch((err) => {
                    if (!cancelRequested || err.name !== 'AbortError') {
                        serviceCallback(err);
                    }
                });
                return {
                    cancel: () => {
                        if (!cancelController) {
                            console.warn('AbortController not found: Cancellation is not supported in this environment');
                            return;
                        }
                        cancelRequested = true;
                        cancelController.abort();
                    },
                };
            };
        }
        return newServiceStub;
    }
}
exports.GrpcClient = GrpcClient;
/**
 * gRPC-fallback version of lro
 *
 * @param {Object=} options.auth - An instance of google-auth-library.
 * @param {Function=} options.promise - A constructor for a promise that
 * implements the ES6 specification of promise.
 * @return {Object} A OperationsClientBuilder that will return a OperationsClient
 */
function lro(options) {
    options = Object.assign({ scopes: [] }, options);
    const gaxGrpc = new GrpcClient(options);
    return new operationsClient_1.OperationsClientBuilder(gaxGrpc);
}
exports.lro = lro;
/**
 * gRPC-fallback version of createApiCall
 *
 * Converts an rpc call into an API call governed by the settings.
 *
 * In typical usage, `func` will be a promise to a callable used to make an rpc
 * request. This will mostly likely be a bound method from a request stub used
 * to make an rpc call. It is not a direct function but a Promise instance,
 * because of its asynchronism (typically, obtaining the auth information).
 *
 * The result is a function which manages the API call with the given settings
 * and the options on the invocation.
 *
 * Throws exception on unsupported streaming calls
 *
 * @param {Promise<GRPCCall>|GRPCCall} func - is either a promise to be used to make
 *   a bare RPC call, or just a bare RPC call.
 * @param {CallSettings} settings - provides the settings for this call
 * @param {Descriptor} descriptor - optionally specify the descriptor for
 *   the method call.
 * @return {GaxCall} func - a bound method on a request stub used
 *   to make an rpc call.
 */
function createApiCall(func, settings, descriptor) {
    if (descriptor && 'streaming' in descriptor) {
        return () => {
            throw new Error('The gRPC-fallback client library (e.g. browser version of the library) currently does not support streaming calls.');
        };
    }
    return createApiCall_1.createApiCall(func, settings, descriptor);
}
exports.createApiCall = createApiCall;
//# sourceMappingURL=fallback.js.map