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
import { GrpcClient, GrpcClientOptions, ClientStubOptions } from './grpc';
import { GoogleAuthOptions } from 'google-auth-library';
import { LongrunningDescriptor, PageDescriptor, StreamDescriptor, BundleDescriptor } from './descriptor';
import * as longrunning from './longRunningCalls/longrunning';
import * as operationProtos from '../protos/operations';
import * as operationsClient from './operationsClient';
import * as routingHeader from './routingHeader';
import * as gax from './gax';
export { GoogleAuth, GoogleAuthOptions } from 'google-auth-library';
export { CancellablePromise, OngoingCall } from './call';
export { createApiCall } from './createApiCall';
export { BundleDescriptor, LongrunningDescriptor, PageDescriptor, StreamDescriptor, } from './descriptor';
export { CallOptions, CallSettings, ClientConfig, constructSettings, RetryOptions, ServiceConfig, createRetryOptions, createBundleOptions, createBackoffSettings, createDefaultBackoffSettings, createMaxRetriesBackoffSettings, } from './gax';
export { GoogleError } from './googleError';
export { ClientStub, ClientStubOptions, GoogleProtoFilesRoot, GrpcClient, GrpcClientOptions, GrpcModule, Metadata, MetadataValue, } from './grpc';
export { Operation, operation } from './longRunningCalls/longrunning';
export { PathTemplate } from './pathTemplate';
export { Status } from './status';
export { StreamType } from './streamingCalls/streaming';
export { routingHeader };
declare function lro(options: GrpcClientOptions): operationsClient.OperationsClientBuilder;
declare namespace lro {
    var SERVICE_ADDRESS: string;
    var ALL_SCOPES: string[];
}
export { lro };
export { OperationsClient } from './operationsClient';
export declare const createByteLengthFunction: typeof GrpcClient.createByteLengthFunction;
export declare const version: any;
import * as protobuf from 'protobufjs';
export { protobuf };
import * as fallback from './fallback';
export { fallback };
export { APICallback, GRPCCallResult, ServerStreamingCall, ClientStreamingCall, BiDiStreamingCall, UnaryCall, GRPCCall, GaxCall, CancellableStream, } from './apitypes';
export interface ClientOptions extends GrpcClientOptions, GoogleAuthOptions, ClientStubOptions {
    libName?: string;
    libVersion?: string;
    clientConfig?: gax.ClientConfig;
    fallback?: boolean;
    apiEndpoint?: string;
}
export interface Descriptors {
    page: {
        [name: string]: PageDescriptor;
    };
    stream: {
        [name: string]: StreamDescriptor;
    };
    longrunning: {
        [name: string]: LongrunningDescriptor;
    };
    batching?: {
        [name: string]: BundleDescriptor;
    };
}
export interface Callback<ResponseObject, NextRequestObject, RawResponseObject> {
    (err: Error | null | undefined, value?: ResponseObject | null, nextRequest?: NextRequestObject, rawResponse?: RawResponseObject): void;
}
export interface LROperation<ResultType, MetadataType> extends longrunning.Operation {
    promise(): Promise<[ResultType, MetadataType, operationProtos.google.longrunning.Operation]>;
}
export interface PaginationCallback<RequestObject, ResponseObject, ResponseType> {
    (err: Error | null, values?: ResponseType[], nextPageRequest?: RequestObject, rawResponse?: ResponseObject): void;
}
export interface PaginationResponse<RequestObject, ResponseObject, ResponseType> {
    values?: ResponseType[];
    nextPageRequest?: RequestObject;
    rawResponse?: ResponseObject;
}
