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
import * as protobuf from 'protobufjs';
import * as gax from './gax';
import * as routingHeader from './routingHeader';
import { OutgoingHttpHeaders } from 'http';
import { GoogleAuth, OAuth2Client, Compute, JWT, UserRefreshClient } from 'google-auth-library';
import { OperationsClientBuilder } from './operationsClient';
import { GrpcClientOptions, ClientStubOptions } from './grpc';
import { GaxCall, GRPCCall } from './apitypes';
import { Descriptor } from './descriptor';
export { PathTemplate } from './pathTemplate';
export { routingHeader };
export { CallSettings, constructSettings, RetryOptions } from './gax';
export declare const version: string;
export { BundleDescriptor, LongrunningDescriptor, PageDescriptor, StreamDescriptor, } from './descriptor';
export { StreamType } from './streamingCalls/streaming';
interface FallbackServiceStub {
    [method: string]: Function;
}
export declare class GrpcClient {
    auth?: OAuth2Client | GoogleAuth;
    authClient?: OAuth2Client | Compute | JWT | UserRefreshClient;
    promise?: PromiseConstructor;
    fallback: boolean;
    grpcVersion: string;
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
    constructor(options?: GrpcClientOptions | {
        auth: OAuth2Client;
    });
    /**
     * gRPC-fallback version of loadProto
     * Loads the protobuf root object from a JSON object created from a proto file
     * @param {Object} jsonObject - A JSON version of a protofile created usin protobuf.js
     * @returns {Object} Root namespace of proto JSON
     */
    loadProto(jsonObject: {}): protobuf.Root;
    private getServiceMethods;
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
    constructSettings(serviceName: string, clientConfig: gax.ClientConfig, configOverrides: gax.ClientConfig, headers: OutgoingHttpHeaders): any;
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
    createStub(service: protobuf.Service, opts: ClientStubOptions): Promise<FallbackServiceStub>;
}
/**
 * gRPC-fallback version of lro
 *
 * @param {Object=} options.auth - An instance of google-auth-library.
 * @param {Function=} options.promise - A constructor for a promise that
 * implements the ES6 specification of promise.
 * @return {Object} A OperationsClientBuilder that will return a OperationsClient
 */
export declare function lro(options: GrpcClientOptions): OperationsClientBuilder;
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
export declare function createApiCall(func: Promise<GRPCCall> | GRPCCall, settings: gax.CallSettings, descriptor?: Descriptor): GaxCall;
export { protobuf };
