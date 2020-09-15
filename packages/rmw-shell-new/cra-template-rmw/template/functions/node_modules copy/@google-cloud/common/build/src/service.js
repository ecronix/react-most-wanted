"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * @module common/service
 */
const arrify = require("arrify");
const extend = require("extend");
const util_1 = require("./util");
const PROJECT_ID_TOKEN = '{{projectId}}';
class Service {
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
    constructor(config, options = {}) {
        this.baseUrl = config.baseUrl;
        this.apiEndpoint = config.apiEndpoint;
        this.timeout = options.timeout;
        this.globalInterceptors = arrify(options.interceptors_);
        this.interceptors = [];
        this.packageJson = config.packageJson;
        this.projectId = options.projectId || PROJECT_ID_TOKEN;
        this.projectIdRequired = config.projectIdRequired !== false;
        this.Promise = options.promise || Promise;
        const reqCfg = extend({}, config, {
            projectIdRequired: this.projectIdRequired,
            projectId: this.projectId,
            credentials: options.credentials,
            keyFile: options.keyFilename,
            email: options.email,
            token: options.token,
        });
        this.makeAuthenticatedRequest = util_1.util.makeAuthenticatedRequestFactory(reqCfg);
        this.authClient = this.makeAuthenticatedRequest.authClient;
        this.getCredentials = this.makeAuthenticatedRequest.getCredentials;
        const isCloudFunctionEnv = !!process.env.FUNCTION_NAME;
        if (isCloudFunctionEnv) {
            this.interceptors.push({
                request(reqOpts) {
                    reqOpts.forever = false;
                    return reqOpts;
                },
            });
        }
    }
    getProjectId(callback) {
        if (!callback) {
            return this.getProjectIdAsync();
        }
        this.getProjectIdAsync().then(p => callback(null, p), callback);
    }
    async getProjectIdAsync() {
        const projectId = await this.authClient.getProjectId();
        if (this.projectId === PROJECT_ID_TOKEN && projectId) {
            this.projectId = projectId;
        }
        return this.projectId;
    }
    request_(reqOpts, callback) {
        reqOpts = extend(true, {}, reqOpts, { timeout: this.timeout });
        const isAbsoluteUrl = reqOpts.uri.indexOf('http') === 0;
        const uriComponents = [this.baseUrl];
        if (this.projectIdRequired) {
            uriComponents.push('projects');
            uriComponents.push(this.projectId);
        }
        uriComponents.push(reqOpts.uri);
        if (isAbsoluteUrl) {
            uriComponents.splice(0, uriComponents.indexOf(reqOpts.uri));
        }
        reqOpts.uri = uriComponents
            .map(uriComponent => {
            const trimSlashesRegex = /^\/*|\/*$/g;
            return uriComponent.replace(trimSlashesRegex, '');
        })
            .join('/')
            // Some URIs have colon separators.
            // Bad: https://.../projects/:list
            // Good: https://.../projects:list
            .replace(/\/:/g, ':');
        // Interceptors should be called in the order they were assigned.
        const combinedInterceptors = [].slice
            .call(this.globalInterceptors)
            .concat(this.interceptors)
            .concat(arrify(reqOpts.interceptors_));
        let interceptor;
        while (
        // tslint:disable-next-line:no-conditional-assignment
        (interceptor = combinedInterceptors.shift()) &&
            interceptor.request) {
            reqOpts = interceptor.request(reqOpts);
        }
        delete reqOpts.interceptors_;
        const pkg = this.packageJson;
        reqOpts.headers = extend({}, reqOpts.headers, {
            'User-Agent': util_1.util.getUserAgentFromPackageJson(pkg),
            'x-goog-api-client': `gl-node/${process.versions.node} gccl/${pkg.version}`,
        });
        if (reqOpts.shouldReturnStream) {
            return this.makeAuthenticatedRequest(reqOpts);
        }
        else {
            this.makeAuthenticatedRequest(reqOpts, callback);
        }
    }
    /**
     * Make an authenticated API request.
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     * @param {function} callback - The callback function passed to `request`.
     */
    request(reqOpts, callback) {
        Service.prototype.request_.call(this, reqOpts, callback);
    }
    /**
     * Make an authenticated API request.
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     */
    requestStream(reqOpts) {
        const opts = extend(true, reqOpts, { shouldReturnStream: true });
        return Service.prototype.request_.call(this, opts);
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map