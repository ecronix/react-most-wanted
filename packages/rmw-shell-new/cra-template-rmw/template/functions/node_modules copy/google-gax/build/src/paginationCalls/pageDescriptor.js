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
const ended = require("is-stream-ended");
const stream_1 = require("stream");
const normalApiCaller_1 = require("../normalCalls/normalApiCaller");
const pagedApiCaller_1 = require("./pagedApiCaller");
/**
 * A descriptor for methods that support pagination.
 */
class PageDescriptor {
    constructor(requestPageTokenField, responsePageTokenField, resourceField) {
        this.requestPageTokenField = requestPageTokenField;
        this.responsePageTokenField = responsePageTokenField;
        this.resourceField = resourceField;
    }
    /**
     * Creates a new object Stream which emits the resource on 'data' event.
     */
    createStream(apiCall, request, options) {
        const stream = new stream_1.PassThrough({ objectMode: true });
        options = Object.assign({}, options, { autoPaginate: false });
        const maxResults = 'maxResults' in options ? options.maxResults : -1;
        let pushCount = 0;
        let started = false;
        function callback(err, resources, next) {
            if (err) {
                stream.emit('error', err);
                return;
            }
            for (let i = 0; i < resources.length; ++i) {
                if (ended(stream)) {
                    return;
                }
                if (resources[i] === null) {
                    continue;
                }
                stream.push(resources[i]);
                pushCount++;
                if (pushCount === maxResults) {
                    stream.end();
                }
            }
            if (ended(stream)) {
                return;
            }
            if (!next) {
                stream.end();
                return;
            }
            // When pageToken is specified in the original options, it will overwrite
            // the page token field in the next request. Therefore it must be cleared.
            if ('pageToken' in options) {
                delete options.pageToken;
            }
            if (stream.isPaused()) {
                request = next;
                started = false;
            }
            else {
                setImmediate(apiCall, next, options, callback);
            }
        }
        stream.on('resume', () => {
            if (!started) {
                started = true;
                apiCall(request, options, callback);
            }
        });
        return stream;
    }
    getApiCaller(settings) {
        if (!settings.autoPaginate) {
            return new normalApiCaller_1.NormalApiCaller();
        }
        return new pagedApiCaller_1.PagedApiCaller(this);
    }
}
exports.PageDescriptor = PageDescriptor;
//# sourceMappingURL=pageDescriptor.js.map