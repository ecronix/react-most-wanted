"use strict";
/*!
 * Copyright 2018 Google LLC
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var stream_1 = require("stream");
var uuid = require("uuid");
var agents_1 = require("./agents");
var streamEvents = require('stream-events');
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestError;
}(Error));
exports.RequestError = RequestError;
/**
 * Convert options from Request to Fetch format
 * @private
 * @param reqOpts Request options
 */
function requestToFetchOptions(reqOpts) {
    var options = __assign(__assign({ method: reqOpts.method || 'GET' }, (reqOpts.timeout && { timeout: reqOpts.timeout })), (typeof reqOpts.gzip === 'boolean' && { compress: reqOpts.gzip }));
    if (typeof reqOpts.json === 'object') {
        // Add Content-type: application/json header
        reqOpts.headers = reqOpts.headers || {};
        reqOpts.headers['Content-Type'] = 'application/json';
        // Set body to JSON representation of value
        options.body = JSON.stringify(reqOpts.json);
    }
    else {
        if (typeof reqOpts.body !== 'string') {
            options.body = JSON.stringify(reqOpts.body);
        }
        else {
            options.body = reqOpts.body;
        }
    }
    // tslint:disable-next-line no-any
    options.headers = reqOpts.headers;
    var uri = (reqOpts.uri ||
        reqOpts.url);
    if (reqOpts.useQuerystring === true || typeof reqOpts.qs === 'object') {
        var qs = require('querystring');
        var params = qs.stringify(reqOpts.qs);
        uri = uri + '?' + params;
    }
    options.agent = agents_1.getAgent(uri, reqOpts);
    return { uri: uri, options: options };
}
/**
 * Convert a response from `fetch` to `request` format.
 * @private
 * @param opts The `request` options used to create the request.
 * @param res The Fetch response
 * @returns A `request` response object
 */
function fetchToRequestResponse(opts, res) {
    var request = {};
    request.agent = opts.agent || false;
    request.headers = (opts.headers || {});
    request.href = res.url;
    // headers need to be converted from a map to an obj
    var resHeaders = {};
    res.headers.forEach(function (value, key) { return (resHeaders[key] = value); });
    var response = Object.assign(res.body, {
        statusCode: res.status,
        statusMessage: res.statusText,
        request: request,
        body: res.body,
        headers: resHeaders,
        toJSON: function () { return ({ headers: resHeaders }); },
    });
    return response;
}
/**
 * Create POST body from two parts as multipart/related content-type
 * @private
 * @param boundary
 * @param multipart
 */
function createMultipartStream(boundary, multipart) {
    var finale = "--" + boundary + "--";
    var stream = new stream_1.PassThrough();
    for (var _i = 0, multipart_1 = multipart; _i < multipart_1.length; _i++) {
        var part = multipart_1[_i];
        var preamble = "--" + boundary + "\r\nContent-Type: " + part['Content-Type'] + "\r\n\r\n";
        stream.write(preamble);
        if (typeof part.body === 'string') {
            stream.write(part.body);
            stream.write('\r\n');
        }
        else {
            part.body.pipe(stream, { end: false });
            part.body.on('end', function () {
                stream.write('\r\n');
                stream.write(finale);
                stream.end();
            });
        }
    }
    return stream;
}
function teenyRequest(reqOpts, callback) {
    var _a = requestToFetchOptions(reqOpts), uri = _a.uri, options = _a.options;
    var multipart = reqOpts.multipart;
    if (reqOpts.multipart && multipart.length === 2) {
        if (!callback) {
            // TODO: add support for multipart uploads through streaming
            throw new Error('Multipart without callback is not implemented.');
        }
        var boundary = uuid.v4();
        options.headers['Content-Type'] = "multipart/related; boundary=" + boundary;
        options.body = createMultipartStream(boundary, multipart);
        // Multipart upload
        node_fetch_1.default(uri, options).then(function (res) {
            var header = res.headers.get('content-type');
            var response = fetchToRequestResponse(options, res);
            var body = response.body;
            if (header === 'application/json' ||
                header === 'application/json; charset=utf-8') {
                res.json().then(function (json) {
                    response.body = json;
                    callback(null, response, json);
                }, function (err) {
                    callback(err, response, body);
                });
                return;
            }
            res.text().then(function (text) {
                response.body = text;
                callback(null, response, text);
            }, function (err) {
                callback(err, response, body);
            });
        }, function (err) {
            callback(err, null, null);
        });
        return;
    }
    if (callback === undefined) {
        // Stream mode
        var requestStream_1 = streamEvents(new stream_1.PassThrough());
        // tslint:disable-next-line no-any
        var responseStream_1;
        requestStream_1.once('reading', function () {
            if (responseStream_1) {
                responseStream_1.pipe(requestStream_1);
            }
            else {
                requestStream_1.once('response', function () {
                    responseStream_1.pipe(requestStream_1);
                });
            }
        });
        options.compress = false;
        node_fetch_1.default(uri, options).then(function (res) {
            responseStream_1 = res.body;
            responseStream_1.on('error', function (err) {
                requestStream_1.emit('error', err);
            });
            var response = fetchToRequestResponse(options, res);
            requestStream_1.emit('response', response);
        }, function (err) {
            requestStream_1.emit('error', err);
        });
        // fetch doesn't supply the raw HTTP stream, instead it
        // returns a PassThrough piped from the HTTP response
        // stream.
        return requestStream_1;
    }
    // GET or POST with callback
    node_fetch_1.default(uri, options).then(function (res) {
        var header = res.headers.get('content-type');
        var response = fetchToRequestResponse(options, res);
        var body = response.body;
        if (header === 'application/json' ||
            header === 'application/json; charset=utf-8') {
            if (response.statusCode === 204) {
                // Probably a DELETE
                callback(null, response, body);
                return;
            }
            res.json().then(function (json) {
                response.body = json;
                callback(null, response, json);
            }, function (err) {
                callback(err, response, body);
            });
            return;
        }
        res.text().then(function (text) {
            var response = fetchToRequestResponse(options, res);
            response.body = text;
            callback(null, response, text);
        }, function (err) {
            callback(err, response, body);
        });
    }, function (err) {
        callback(err, null, null);
    });
    return;
}
exports.teenyRequest = teenyRequest;
teenyRequest.defaults = function (defaults) {
    return function (reqOpts, callback) {
        var opts = __assign(__assign({}, defaults), reqOpts);
        if (callback === undefined) {
            return teenyRequest(opts);
        }
        teenyRequest(opts, callback);
    };
};
//# sourceMappingURL=index.js.map