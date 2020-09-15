/*!
 * Copyright 2015 Google Inc. All Rights Reserved.
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
import { GoogleAuth, GoogleAuthOptions } from 'google-auth-library';
import * as r from 'teeny-request';
import { Interceptor } from './service-object';
import { BodyResponseCallback, DecorateRequestOptions, MakeAuthenticatedRequest, PackageJson } from './util';
export interface StreamRequestOptions extends DecorateRequestOptions {
    shouldReturnStream: true;
}
export interface ServiceConfig {
    /**
     * The base URL to make API requests to.
     */
    baseUrl: string;
    /**
     * The API Endpoint to use when connecting to the service.
     * Example:  storage.googleapis.com
     */
    apiEndpoint: string;
    /**
     * The scopes required for the request.
     */
    scopes: string[];
    projectIdRequired?: boolean;
    packageJson: PackageJson;
    /**
     * Reuse an existing GoogleAuth client instead of creating a new one.
     */
    authClient?: GoogleAuth;
}
export interface ServiceOptions extends GoogleAuthOptions {
    interceptors_?: Interceptor[];
    promise?: PromiseConstructor;
    email?: string;
    token?: string;
    timeout?: number;
}
export declare class Service {
    baseUrl: string;
    private globalInterceptors;
    private interceptors;
    private packageJson;
    projectId: string;
    private projectIdRequired;
    Promise: PromiseConstructor;
    makeAuthenticatedRequest: MakeAuthenticatedRequest;
    authClient: GoogleAuth;
    private getCredentials;
    readonly apiEndpoint: string;
    timeout?: number;
    /**
     * Service is a base class, meant to be inherited from by a "service," like
     * BigQuery or Storage.
     *
     * This handles making authenticated requests by exposing a `makeReq_`
     * function.
     *
     * @constructor
     * @alias module:common/service
     *
     * @param {object} config - Configuration object.
     * @param {string} config.baseUrl - The base URL to make API requests to.
     * @param {string[]} config.scopes - The scopes required for the request.
     * @param {object=} options - [Configuration object](#/docs).
     */
    constructor(config: ServiceConfig, options?: ServiceOptions);
    /**
     * Get and update the Service's project ID.
     *
     * @param {function} callback - The callback function.
     */
    getProjectId(): Promise<string>;
    getProjectId(callback: (err: Error | null, projectId?: string) => void): void;
    protected getProjectIdAsync(): Promise<string>;
    /**
     * Make an authenticated API request.
     *
     * @private
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     * @param {function} callback - The callback function passed to `request`.
     */
    private request_;
    /**
     * Make an authenticated API request.
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     * @param {function} callback - The callback function passed to `request`.
     */
    request(reqOpts: DecorateRequestOptions, callback: BodyResponseCallback): void;
    /**
     * Make an authenticated API request.
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     */
    requestStream(reqOpts: DecorateRequestOptions): r.Request;
}
