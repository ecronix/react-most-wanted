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
import { Duplex } from 'stream';
import { CancellablePromise } from './call';
import { CallOptions } from './gax';
import { GoogleError } from './googleError';
import { Operation } from './longRunningCalls/longrunning';
export interface GRPCCallResult {
    cancel(): void;
}
export interface RequestType {
    [index: string]: string | number | {};
}
export declare type ResponseType = {} | null;
export declare type NextPageRequestType = {
    [index: string]: string | number | {};
} | null;
export declare type RawResponseType = Operation | {} | null;
export declare type ResultTuple = [ResponseType, NextPageRequestType | undefined, RawResponseType | undefined];
export interface SimpleCallbackFunction {
    (request: RequestType, callback: APICallback): GRPCCallResult;
}
export declare type APICallback = (err: GoogleError | null, response?: ResponseType, next?: NextPageRequestType, rawResponse?: RawResponseType) => void;
export declare type UnaryCall = (argument: {}, metadata: {}, options: {}, callback: APICallback) => GRPCCallResult;
export declare type ServerStreamingCall = (argument: {}, metadata: {}, options: {}) => Duplex & GRPCCallResult;
export declare type ClientStreamingCall = (metadata: {}, options: {}, callback?: APICallback) => Duplex & GRPCCallResult;
export declare type BiDiStreamingCall = (metadata: {}, options: {}) => Duplex & GRPCCallResult;
export declare type GRPCCall = UnaryCall | ServerStreamingCall | ClientStreamingCall | BiDiStreamingCall;
export declare type CancellableStream = Duplex & GRPCCallResult;
export declare type GaxCallResult = CancellablePromise<ResultTuple> | CancellableStream;
export interface GaxCallPromise {
    (argument: {}, callOptions?: CallOptions, callback?: APICallback): CancellablePromise<ResultTuple>;
}
export interface GaxCallStream {
    (argument: {}, callOptions?: CallOptions, callback?: APICallback): CancellableStream;
}
export interface GaxCall {
    (argument: {}, callOptions?: CallOptions, callback?: APICallback): GaxCallResult;
}
export interface GRPCCallOtherArgs {
    options?: {
        deadline?: Date;
    };
    headers?: {};
    metadataBuilder: (abTests?: {}, headers?: {}) => {};
}
