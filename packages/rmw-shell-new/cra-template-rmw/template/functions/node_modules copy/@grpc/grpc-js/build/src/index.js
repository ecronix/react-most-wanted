"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const semver = require("semver");
const call_credentials_1 = require("./call-credentials");
exports.CallCredentials = call_credentials_1.CallCredentials;
const channel_1 = require("./channel");
exports.connectivityState = channel_1.ConnectivityState;
exports.Channel = channel_1.ChannelImplementation;
const channel_credentials_1 = require("./channel-credentials");
exports.ChannelCredentials = channel_credentials_1.ChannelCredentials;
const client_1 = require("./client");
exports.Client = client_1.Client;
const constants_1 = require("./constants");
exports.logVerbosity = constants_1.LogVerbosity;
exports.status = constants_1.Status;
const logging = require("./logging");
const make_client_1 = require("./make-client");
exports.loadPackageDefinition = make_client_1.loadPackageDefinition;
exports.makeClientConstructor = make_client_1.makeClientConstructor;
exports.makeGenericClientConstructor = make_client_1.makeClientConstructor;
const metadata_1 = require("./metadata");
exports.Metadata = metadata_1.Metadata;
const server_1 = require("./server");
exports.Server = server_1.Server;
const server_credentials_1 = require("./server-credentials");
exports.ServerCredentials = server_credentials_1.ServerCredentials;
const status_builder_1 = require("./status-builder");
exports.StatusBuilder = status_builder_1.StatusBuilder;
const supportedNodeVersions = require('../../package.json').engines.node;
if (!semver.satisfies(process.version, supportedNodeVersions)) {
    throw new Error(`@grpc/grpc-js only works on Node ${supportedNodeVersions}`);
}
function mixin(...sources) {
    const result = {};
    for (const source of sources) {
        for (const propName of Object.getOwnPropertyNames(source)) {
            const property = source[propName]; // eslint-disable-line @typescript-eslint/no-explicit-any
            if (typeof property === 'function') {
                result[propName] = property;
            }
        }
    }
    return result;
}
/**** Client Credentials ****/
// Using assign only copies enumerable properties, which is what we want
exports.credentials = mixin({
    /**
     * Create a gRPC credential from a Google credential object.
     * @param googleCredentials The authentication client to use.
     * @return The resulting CallCredentials object.
     */
    createFromGoogleCredential: (googleCredentials) => {
        return call_credentials_1.CallCredentials.createFromMetadataGenerator((options, callback) => {
            // google-auth-library pre-v2.0.0 does not have getRequestHeaders
            // but has getRequestMetadata, which is deprecated in v2.0.0
            let getHeaders;
            if (typeof googleCredentials.getRequestHeaders === 'function') {
                getHeaders = googleCredentials.getRequestHeaders(options.service_url);
            }
            else {
                getHeaders = new Promise((resolve, reject) => {
                    googleCredentials.getRequestMetadata(options.service_url, (err, headers) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(headers);
                    });
                });
            }
            getHeaders.then((headers) => {
                const metadata = new metadata_1.Metadata();
                for (const key of Object.keys(headers)) {
                    metadata.add(key, headers[key]);
                }
                callback(null, metadata);
            }, (err) => {
                callback(err);
            });
        });
    },
    /**
     * Combine a ChannelCredentials with any number of CallCredentials into a
     * single ChannelCredentials object.
     * @param channelCredentials The ChannelCredentials object.
     * @param callCredentials Any number of CallCredentials objects.
     * @return The resulting ChannelCredentials object.
     */
    combineChannelCredentials: (channelCredentials, ...callCredentials) => {
        return callCredentials.reduce((acc, other) => acc.compose(other), channelCredentials);
    },
    /**
     * Combine any number of CallCredentials into a single CallCredentials
     * object.
     * @param first The first CallCredentials object.
     * @param additional Any number of additional CallCredentials objects.
     * @return The resulting CallCredentials object.
     */
    combineCallCredentials: (first, ...additional) => {
        return additional.reduce((acc, other) => acc.compose(other), first);
    },
}, channel_credentials_1.ChannelCredentials, call_credentials_1.CallCredentials);
/**
 * Close a Client object.
 * @param client The client to close.
 */
exports.closeClient = (client) => client.close();
exports.waitForClientReady = (client, deadline, callback) => client.waitForReady(deadline, callback);
/* eslint-enable @typescript-eslint/no-explicit-any */
/**** Unimplemented function stubs ****/
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.loadObject = (value, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.load = (filename, format, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.setLogger = (logger) => {
    logging.setLogger(logger);
};
exports.setLogVerbosity = (verbosity) => {
    logging.setLoggerVerbosity(verbosity);
};
exports.getClientChannel = (client) => {
    return client_1.Client.prototype.getChannel.call(client);
};
var client_interceptors_1 = require("./client-interceptors");
exports.ListenerBuilder = client_interceptors_1.ListenerBuilder;
exports.RequesterBuilder = client_interceptors_1.RequesterBuilder;
exports.InterceptingCall = client_interceptors_1.InterceptingCall;
exports.InterceptorConfigurationError = client_interceptors_1.InterceptorConfigurationError;
const resolver = require("./resolver");
const load_balancer = require("./load-balancer");
(() => {
    resolver.registerAll();
    load_balancer.registerAll();
})();
//# sourceMappingURL=index.js.map