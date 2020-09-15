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
const path = require("path");
const createApiCall_1 = require("./createApiCall");
const descriptor_1 = require("./descriptor");
const configData = require('./operations_client_config');
exports.SERVICE_ADDRESS = 'longrunning.googleapis.com';
const version = require('../../package.json').version;
const DEFAULT_SERVICE_PORT = 443;
const CODE_GEN_NAME_VERSION = 'gapic/0.7.1';
const PAGE_DESCRIPTORS = {
    listOperations: new descriptor_1.PageDescriptor('pageToken', 'nextPageToken', 'operations'),
};
/**
 * The scopes needed to make gRPC calls to all of the methods defined in
 * this service.
 */
exports.ALL_SCOPES = [];
/**
 * Manages long-running operations with an API service.
 *
 * When an API method normally takes long time to complete, it can be designed
 * to return {@link Operation} to the client, and the client can use this
 * interface to receive the real response asynchronously by polling the
 * operation resource, or pass the operation resource to another API (such as
 * Google Cloud Pub/Sub API) to receive the response.  Any API service that
 * returns long-running operations should implement the `Operations` interface
 * so developers can have a consistent client experience.
 *
 * This will be created through a builder function which can be obtained by the
 * module. See the following example of how to initialize the module and how to
 * access to the builder.
 * @see {@link operationsClient}
 *
 * @class
 */
class OperationsClient {
    constructor(gaxGrpc, 
    // tslint:disable-next-line no-any
    operationsProtos, options) {
        const opts = Object.assign({
            servicePath: exports.SERVICE_ADDRESS,
            port: DEFAULT_SERVICE_PORT,
            clientConfig: {},
        }, options);
        const googleApiClient = ['gl-node/' + process.versions.node];
        if (opts.libName && opts.libVersion) {
            googleApiClient.push(opts.libName + '/' + opts.libVersion);
        }
        googleApiClient.push(CODE_GEN_NAME_VERSION, 'gax/' + version);
        if (opts.fallback) {
            googleApiClient.push('gl-web/' + version);
        }
        else {
            googleApiClient.push('grpc/' + gaxGrpc.grpcVersion);
        }
        const defaults = gaxGrpc.constructSettings('google.longrunning.Operations', configData, opts.clientConfig || {}, { 'x-goog-api-client': googleApiClient.join(' ') });
        this.auth = gaxGrpc.auth;
        // Set up a dictionary of "inner API calls"; the core implementation
        // of calling the API is handled in `google-gax`, with this code
        // merely providing the destination and request information.
        this._innerApiCalls = {};
        // Put together the "service stub" for
        // google.longrunning.Operations.
        const operationsStub = gaxGrpc.createStub(opts.fallback
            ? operationsProtos.lookupService('google.longrunning.Operations')
            : operationsProtos.google.longrunning.Operations, opts);
        const operationsStubMethods = [
            'getOperation',
            'listOperations',
            'cancelOperation',
            'deleteOperation',
        ];
        for (const methodName of operationsStubMethods) {
            const innerCallPromise = operationsStub.then(stub => (...args) => {
                return stub[methodName].apply(stub, args);
            }, err => () => {
                throw err;
            });
            this._innerApiCalls[methodName] = createApiCall_1.createApiCall(innerCallPromise, defaults[methodName], PAGE_DESCRIPTORS[methodName]);
        }
    }
    getProjectId(callback) {
        if (this.auth && 'getProjectId' in this.auth) {
            return this.auth.getProjectId(callback);
        }
        if (callback) {
            callback(new Error('Cannot determine project ID.'));
        }
        else {
            return Promise.reject('Cannot determine project ID.');
        }
    }
    // Service calls
    /**
     * Gets the latest state of a long-running operation.  Clients can use this
     * method to poll the operation result at intervals as recommended by the API
     * service.
     *
     * @param {Object} request - The request object that will be sent.
     * @param {string} request.name - The name of the operation resource.
     * @param {Object=} options
     *   Optional parameters. You can override the default settings for this call,
     *   e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
     *   https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
     *   details.
     * @param {function(?Error, ?Object)=} callback
     *   The function which will be called with the result of the API call.
     *
     *   The second parameter to the callback is an object representing
     * [google.longrunning.Operation]{@link
     * external:"google.longrunning.Operation"}.
     * @return {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     * [google.longrunning.Operation]{@link
     * external:"google.longrunning.Operation"}. The promise has a method named
     * "cancel" which cancels the ongoing API call.
     *
     * @example
     *
     * const client = longrunning.operationsClient();
     * const name = '';
     * const [response] = await client.getOperation({name});
     * // doThingsWith(response)
     */
    getOperation(request, options, callback) {
        if (options instanceof Function && callback === undefined) {
            return this._innerApiCalls.getOperation(request, {}, options);
        }
        options = options || {};
        return this._innerApiCalls.getOperation(request, options, callback);
    }
    /**
     * Lists operations that match the specified filter in the request. If the
     * server doesn't support this method, it returns `UNIMPLEMENTED`.
     *
     * NOTE: the `name` binding below allows API services to override the binding
     * to use different resource name schemes.
     *
     * @param {Object} request - The request object that will be sent.
     * @param {string} request.name - The name of the operation collection.
     * @param {string} request.filter - The standard list filter.
     * @param {number=} request.pageSize
     *   The maximum number of resources contained in the underlying API
     *   response. If page streaming is performed per-resource, this
     *   parameter does not affect the return value. If page streaming is
     *   performed per-page, this determines the maximum number of
     *   resources in a page.
     * @param {Object=} options
     *   Optional parameters. You can override the default settings for this call,
     * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
     * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
     * details.
     * @param {function(?Error, ?Array, ?Object, ?Object)=} callback
     *   The function which will be called with the result of the API call.
     *
     *   The second parameter to the callback is Array of
     * [google.longrunning.Operation]{@link
     * external:"google.longrunning.Operation"}.
     *
     *   When autoPaginate: false is specified through options, it contains the
     * result in a single response. If the response indicates the next page
     * exists, the third parameter is set to be used for the next request object.
     * The fourth parameter keeps the raw response object of an object
     * representing [google.longrunning.ListOperationsResponse]{@link
     * external:"google.longrunning.ListOperationsResponse"}.
     * @return {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of
     * [google.longrunning.Operation]{@link
     * external:"google.longrunning.Operation"}.
     *
     *   When autoPaginate: false is specified through options, the array has
     * three elements. The first element is Array of
     * [google.longrunning.Operation]{@link
     * external:"google.longrunning.Operation"} in a single response. The second
     * element is the next request object if the response indicates the next page
     * exists, or null. The third element is an object representing
     * [google.longrunning.ListOperationsResponse]{@link
     * external:"google.longrunning.ListOperationsResponse"}.
     *
     *   The promise has a method named "cancel" which cancels the ongoing API
     * call.
     *
     * @example
     *
     * const client = longrunning.operationsClient();
     * const request = {
     *     name: '',
     *     filter: ''
     * };
     * // Iterate over all elements.
     * const [resources] = await client.listOperations(request);
     * for (const resource of resources) {
     *   console.log(resources);
     * }
     *
     * // Or obtain the paged response.
     * const options = {autoPaginate: false};
     * let nextRequest = request;
     * while(nextRequest) {
     *   const response = await client.listOperations(nextRequest, options);
     *   const resources = response[0];
     *   nextRequest = response[1];
     *   const rawResponse = response[2];
     *   for (const resource of resources) {
     *     // doThingsWith(resource);
     *   }
     * };
     */
    listOperations(request, options, callback) {
        if (options instanceof Function && callback === undefined) {
            return this._innerApiCalls.listOperations(request, {}, options);
        }
        options = options || {};
        return this._innerApiCalls.listOperations(request, options, callback);
    }
    /**
     * Equivalent to {@link listOperations}, but returns a NodeJS Stream object.
     *
     * This fetches the paged responses for {@link listOperations} continuously
     * and invokes the callback registered for 'data' event for each element in
     * the responses.
     *
     * The returned object has 'end' method when no more elements are required.
     *
     * autoPaginate option will be ignored.
     *
     * @see {@link https://nodejs.org/api/stream.html}
     *
     * @param {Object} request - The request object that will be sent.
     * @param {string} request.name - The name of the operation collection.
     * @param {string} request.filter - The standard list filter.
     * @param {number=} request.pageSize -
     *   The maximum number of resources contained in the underlying API
     *   response. If page streaming is performed per-resource, this
     *   parameter does not affect the return value. If page streaming is
     *   performed per-page, this determines the maximum number of
     *   resources in a page.
     * @param {Object=} options
     *   Optional parameters. You can override the default settings for this call,
     *   e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
     *   https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
     *   details.
     * @return {Stream} - An object stream which emits an object representing [google.longrunning.Operation]{@link external:"google.longrunning.Operation"} on 'data' event.
     *
     * @example
     *
     * const client = longrunning.operationsClient();
     * const request = {
     *   name: '',
     *   filter: ''
     * };
     * client.listOperationsStream(request)
     *   .on('data', element => {
     *     // doThingsWith(element)
     *   })
     *   .on('error', err => {
     *     console.error(err);
     *   });
     */
    listOperationsStream(request, options) {
        return PAGE_DESCRIPTORS.listOperations.createStream(this._innerApiCalls.listOperations, request, options);
    }
    /**
     * Starts asynchronous cancellation on a long-running operation.  The server
     * makes a best effort to cancel the operation, but success is not
     * guaranteed.  If the server doesn't support this method, it returns
     * `google.rpc.Code.UNIMPLEMENTED`.  Clients can use
     * {@link Operations.GetOperation} or
     * other methods to check whether the cancellation succeeded or whether the
     * operation completed despite cancellation. On successful cancellation,
     * the operation is not deleted; instead, it becomes an operation with
     * an {@link Operation.error} value with a {@link google.rpc.Status.code} of
     * 1, corresponding to `Code.CANCELLED`.
     *
     * @param {Object} request - The request object that will be sent.
     * @param {string} request.name - The name of the operation resource to be cancelled.
     * @param {Object=} options
     *   Optional parameters. You can override the default settings for this call,
     * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
     * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
     * details.
     * @param {function(?Error)=} callback
     *   The function which will be called with the result of the API call.
     * @return {Promise} - The promise which resolves when API call finishes.
     *   The promise has a method named "cancel" which cancels the ongoing API
     * call.
     *
     * @example
     *
     * const client = longrunning.operationsClient();
     * await client.cancelOperation({name: ''});
     */
    cancelOperation(request, options, callback) {
        if (options instanceof Function && callback === undefined) {
            return this._innerApiCalls.cancelOperation(request, {}, options);
        }
        options = options || {};
        return this._innerApiCalls.cancelOperation(request, options, callback);
    }
    /**
     * Deletes a long-running operation. This method indicates that the client is
     * no longer interested in the operation result. It does not cancel the
     * operation. If the server doesn't support this method, it returns
     * `google.rpc.Code.UNIMPLEMENTED`.
     *
     * @param {Object} request - The request object that will be sent.
     * @param {string} request.name - The name of the operation resource to be deleted.
     * @param {Object=} options
     *   Optional parameters. You can override the default settings for this call,
     * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
     * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
     * details.
     * @param {function(?Error)=} callback
     *   The function which will be called with the result of the API call.
     * @return {Promise} - The promise which resolves when API call finishes.
     *   The promise has a method named "cancel" which cancels the ongoing API
     * call.
     *
     * @example
     *
     * const client = longrunning.operationsClient();
     * await client.deleteOperation({name: ''});
     */
    deleteOperation(request, options, callback) {
        if (options instanceof Function && callback === undefined) {
            return this._innerApiCalls.deleteOperation(request, {}, options);
        }
        options = options || {};
        return this._innerApiCalls.deleteOperation(request, options, callback);
    }
}
exports.OperationsClient = OperationsClient;
class OperationsClientBuilder {
    /**
     * Builds a new Operations Client
     * @param gaxGrpc {GrpcClient}
     */
    constructor(gaxGrpc) {
        // tslint:disable-next-line no-any
        let operationsProtos; // loaded protos have any type
        if (gaxGrpc.fallback) {
            const protoJson = require('../../protos/operations.json');
            operationsProtos = gaxGrpc.loadProto(protoJson);
        }
        else {
            operationsProtos = gaxGrpc.loadProto(path.join(__dirname, '..', '..', 'protos', 'operations.json'));
            Object.assign(this, operationsProtos.google.longrunning);
        }
        /**
         * Build a new instance of {@link OperationsClient}.
         *
         * @param {Object=} opts - The optional parameters.
         * @param {String=} opts.servicePath - Domain name of the API remote host.
         * @param {number=} opts.port - The port on which to connect to the remote host.
         * @param {grpc.ClientCredentials=} opts.sslCreds - A ClientCredentials for use with an SSL-enabled channel.
         * @param {Object=} opts.clientConfig - The customized config to build the call settings. See {@link gax.constructSettings} for the format.
         */
        this.operationsClient = opts => {
            if (gaxGrpc.fallback) {
                opts.fallback = true;
            }
            return new OperationsClient(gaxGrpc, operationsProtos, opts);
        };
        Object.assign(this.operationsClient, OperationsClient);
    }
}
exports.OperationsClientBuilder = OperationsClientBuilder;
//# sourceMappingURL=operationsClient.js.map