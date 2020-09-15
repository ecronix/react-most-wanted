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
const duplexify = require('duplexify');
const retryRequest = require('retry-request');
/**
 * The type of gRPC streaming.
 * @enum {number}
 */
var StreamType;
(function (StreamType) {
    /** Client sends a single request, server streams responses. */
    StreamType[StreamType["SERVER_STREAMING"] = 1] = "SERVER_STREAMING";
    /** Client streams requests, server returns a single response. */
    StreamType[StreamType["CLIENT_STREAMING"] = 2] = "CLIENT_STREAMING";
    /** Both client and server stream objects. */
    StreamType[StreamType["BIDI_STREAMING"] = 3] = "BIDI_STREAMING";
})(StreamType = exports.StreamType || (exports.StreamType = {}));
class StreamProxy extends duplexify {
    /**
     * StreamProxy is a proxy to gRPC-streaming method.
     *
     * @private
     * @constructor
     * @param {StreamType} type - the type of gRPC stream.
     * @param {ApiCallback} callback - the callback for further API call.
     */
    constructor(type, callback) {
        super(undefined, undefined, {
            objectMode: true,
            readable: type !== StreamType.CLIENT_STREAMING,
            writable: type !== StreamType.SERVER_STREAMING,
        });
        this.type = type;
        this._callback = callback;
        this._isCancelCalled = false;
    }
    cancel() {
        if (this.stream) {
            this.stream.cancel();
        }
        else {
            this._isCancelCalled = true;
        }
    }
    /**
     * Forward events from an API request stream to the user's stream.
     * @param {Stream} stream - The API request stream.
     */
    forwardEvents(stream) {
        const eventsToForward = ['metadata', 'response', 'status'];
        eventsToForward.forEach(event => {
            stream.on(event, this.emit.bind(this, event));
        });
        // We also want to supply the status data as 'response' event to support
        // the behavior of google-cloud-node expects.
        // see:
        // https://github.com/GoogleCloudPlatform/google-cloud-node/pull/1775#issuecomment-259141029
        // https://github.com/GoogleCloudPlatform/google-cloud-node/blob/116436fa789d8b0f7fc5100b19b424e3ec63e6bf/packages/common/src/grpc-service.js#L355
        stream.on('metadata', metadata => {
            // Create a response object with succeeds.
            // TODO: unify this logic with the decoration of gRPC response when it's
            // added. see: https://github.com/googleapis/gax-nodejs/issues/65
            stream.emit('response', {
                code: 200,
                details: '',
                message: 'OK',
                metadata,
            });
        });
    }
    /**
     * Specifies the target stream.
     * @param {ApiCall} apiCall - the API function to be called.
     * @param {Object} argument - the argument to be passed to the apiCall.
     */
    setStream(apiCall, argument) {
        if (this.type === StreamType.SERVER_STREAMING) {
            const retryStream = retryRequest(null, {
                objectMode: true,
                request: () => {
                    if (this._isCancelCalled) {
                        if (this.stream) {
                            this.stream.cancel();
                        }
                        return;
                    }
                    const stream = apiCall(argument, this._callback);
                    this.stream = stream;
                    this.forwardEvents(stream);
                    return stream;
                },
            });
            this.setReadable(retryStream);
            return;
        }
        const stream = apiCall(argument, this._callback);
        this.stream = stream;
        this.forwardEvents(stream);
        if (this.type === StreamType.CLIENT_STREAMING) {
            this.setWritable(stream);
        }
        if (this.type === StreamType.BIDI_STREAMING) {
            this.setReadable(stream);
            this.setWritable(stream);
        }
        if (this._isCancelCalled && this.stream) {
            this.stream.cancel();
        }
    }
}
exports.StreamProxy = StreamProxy;
//# sourceMappingURL=streaming.js.map