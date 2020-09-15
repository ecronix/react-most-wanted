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
/// <reference types="node" />
import { Duplex, DuplexOptions, Readable, Stream, Writable } from 'stream';
import { APICallback, CancellableStream, GRPCCallResult, SimpleCallbackFunction } from '../apitypes';
declare const duplexify: DuplexifyConstructor;
export interface DuplexifyOptions extends DuplexOptions {
    autoDestroy?: boolean;
    end?: boolean;
}
export interface Duplexify extends Duplex {
    readonly destroyed: boolean;
    setWritable(writable: Writable | false | null): void;
    setReadable(readable: Readable | false | null): void;
}
export interface DuplexifyConstructor {
    obj(writable?: Writable | false | null, readable?: Readable | false | null, options?: DuplexifyOptions): Duplexify;
    new (writable?: Writable | false | null, readable?: Readable | false | null, options?: DuplexifyOptions): Duplexify;
    (writable?: Writable | false | null, readable?: Readable | false | null, options?: DuplexifyOptions): Duplexify;
}
/**
 * The type of gRPC streaming.
 * @enum {number}
 */
export declare enum StreamType {
    /** Client sends a single request, server streams responses. */
    SERVER_STREAMING = 1,
    /** Client streams requests, server returns a single response. */
    CLIENT_STREAMING = 2,
    /** Both client and server stream objects. */
    BIDI_STREAMING = 3
}
export declare class StreamProxy extends duplexify implements GRPCCallResult {
    type: StreamType;
    private _callback;
    private _isCancelCalled;
    stream?: CancellableStream;
    /**
     * StreamProxy is a proxy to gRPC-streaming method.
     *
     * @private
     * @constructor
     * @param {StreamType} type - the type of gRPC stream.
     * @param {ApiCallback} callback - the callback for further API call.
     */
    constructor(type: StreamType, callback: APICallback);
    cancel(): void;
    /**
     * Forward events from an API request stream to the user's stream.
     * @param {Stream} stream - The API request stream.
     */
    forwardEvents(stream: Stream): void;
    /**
     * Specifies the target stream.
     * @param {ApiCall} apiCall - the API function to be called.
     * @param {Object} argument - the argument to be passed to the apiCall.
     */
    setStream(apiCall: SimpleCallbackFunction, argument: {}): void;
}
export {};
