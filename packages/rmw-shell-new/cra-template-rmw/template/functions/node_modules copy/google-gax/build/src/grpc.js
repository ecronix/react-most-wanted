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
const grpcProtoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const google_auth_library_1 = require("google-auth-library");
const grpc = require("@grpc/grpc-js");
const path = require("path");
const protobuf = require("protobufjs");
const semver = require("semver");
const walk = require("walkdir");
const gax = require("./gax");
const googleProtoFilesDir = path.join(__dirname, '..', '..', 'protos');
// INCLUDE_DIRS is passed to @grpc/proto-loader
const INCLUDE_DIRS = [];
INCLUDE_DIRS.push(googleProtoFilesDir);
// COMMON_PROTO_FILES logic is here for protobufjs loads (see
// GoogleProtoFilesRoot below)
const COMMON_PROTO_FILES = walk
    .sync(googleProtoFilesDir)
    .filter(f => path.extname(f) === '.proto')
    .map(f => path.normalize(f).substring(googleProtoFilesDir.length + 1));
class ClientStub extends grpc.Client {
}
exports.ClientStub = ClientStub;
class GrpcClient {
    /**
     * A class which keeps the context of gRPC and auth for the gRPC.
     *
     * @param {Object=} options - The optional parameters. It will be directly
     *   passed to google-auth-library library, so parameters like keyFile or
     *   credentials will be valid.
     * @param {Object=} options.auth - An instance of google-auth-library.
     *   When specified, this auth instance will be used instead of creating
     *   a new one.
     * @param {Object=} options.grpc - When specified, this will be used
     *   for the 'grpc' module in this context. By default, it will load the grpc
     *   module in the standard way.
     * @param {Function=} options.promise - A constructor for a promise that
     * implements the ES6 specification of promise. If not provided, native
     * promises will be used.
     * @constructor
     */
    constructor(options = {}) {
        this.auth = options.auth || new google_auth_library_1.GoogleAuth(options);
        this.promise = options.promise || Promise;
        this.fallback = false;
        if ('grpc' in options) {
            this.grpc = options.grpc;
            this.grpcVersion = '';
        }
        else {
            if (semver.gte(process.version, '8.13.0')) {
                this.grpc = grpc;
                this.grpcVersion = require('@grpc/grpc-js/package.json').version;
            }
            else {
                const errorMessage = 'To use @grpc/grpc-js you must run your code on Node.js v8.13.0 or newer. Please see README if you need to use an older version. ' +
                    'https://github.com/googleapis/gax-nodejs/blob/master/README.md';
                throw new Error(errorMessage);
            }
        }
    }
    /**
     * Creates a gRPC credentials. It asks the auth data if necessary.
     * @private
     * @param {Object} opts - options values for configuring credentials.
     * @param {Object=} opts.sslCreds - when specified, this is used instead
     *   of default channel credentials.
     * @return {Promise} The promise which will be resolved to the gRPC credential.
     */
    async _getCredentials(opts) {
        if (opts.sslCreds) {
            return opts.sslCreds;
        }
        const grpc = this.grpc;
        const sslCreds = grpc.credentials.createSsl();
        const client = await this.auth.getClient();
        const credentials = grpc.credentials.combineChannelCredentials(sslCreds, grpc.credentials.createFromGoogleCredential(client));
        return credentials;
    }
    /**
     * Loads the gRPC service from the proto file(s) at the given path and with the
     * given options.
     * @param filename The path to the proto file(s).
     * @param options Options for loading the proto file.
     */
    loadFromProto(filename, options) {
        const packageDef = grpcProtoLoader.loadSync(filename, options);
        return this.grpc.loadPackageDefinition(packageDef);
    }
    /**
     * Load grpc proto service from a filename hooking in googleapis common protos
     * when necessary.
     * @param {String} protoPath - The directory to search for the protofile.
     * @param {String|String[]} filename - The filename(s) of the proto(s) to be loaded.
     *   If omitted, protoPath will be treated as a file path to load.
     * @return {Object<string, *>} The gRPC loaded result (the toplevel namespace
     *   object).
     */
    loadProto(protoPath, filename) {
        if (!filename) {
            filename = path.basename(protoPath);
            protoPath = path.dirname(protoPath);
        }
        if (Array.isArray(filename) && filename.length === 0) {
            return {};
        }
        // This set of @grpc/proto-loader options
        // 'closely approximates the existing behavior of grpc.load'
        const includeDirs = INCLUDE_DIRS.slice();
        includeDirs.unshift(protoPath);
        const options = {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            includeDirs,
        };
        return this.loadFromProto(filename, options);
    }
    static _resolveFile(protoPath, filename) {
        if (fs.existsSync(path.join(protoPath, filename))) {
            return path.join(protoPath, filename);
        }
        else if (COMMON_PROTO_FILES.indexOf(filename) > -1) {
            return path.join(googleProtoFilesDir, filename);
        }
        throw new Error(filename + ' could not be found in ' + protoPath);
    }
    metadataBuilder(headers) {
        const Metadata = this.grpc.Metadata;
        const baseMetadata = new Metadata();
        // tslint:disable-next-line forin
        for (const key in headers) {
            const value = headers[key];
            if (Array.isArray(value)) {
                value.forEach(v => baseMetadata.add(key, v));
            }
            else {
                baseMetadata.set(key, `${value}`);
            }
        }
        return function buildMetadata(abTests, moreHeaders) {
            // TODO: bring the A/B testing info into the metadata.
            let copied = false;
            let metadata = baseMetadata;
            if (moreHeaders) {
                for (const key in moreHeaders) {
                    if (key.toLowerCase() !== 'x-goog-api-client' &&
                        moreHeaders.hasOwnProperty(key)) {
                        if (!copied) {
                            copied = true;
                            metadata = metadata.clone();
                        }
                        const value = moreHeaders[key];
                        if (Array.isArray(value)) {
                            value.forEach(v => metadata.add(key, v));
                        }
                        else {
                            metadata.set(key, `${value}`);
                        }
                    }
                }
            }
            return metadata;
        };
    }
    /**
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
    constructSettings(serviceName, clientConfig, configOverrides, headers) {
        return gax.constructSettings(serviceName, clientConfig, configOverrides, this.grpc.status, { metadataBuilder: this.metadataBuilder(headers) }, this.promise);
    }
    /**
     * Creates a gRPC stub with current gRPC and auth.
     * @param {function} CreateStub - The constructor function of the stub.
     * @param {Object} options - The optional arguments to customize
     *   gRPC connection. This options will be passed to the constructor of
     *   gRPC client too.
     * @param {string} options.servicePath - The name of the server of the service.
     * @param {number} options.port - The port of the service.
     * @param {grpcTypes.ClientCredentials=} options.sslCreds - The credentials to be used
     *   to set up gRPC connection.
     * @return {Promise} A promise which resolves to a gRPC stub instance.
     */
    // tslint:disable-next-line variable-name
    async createStub(CreateStub, options) {
        const serviceAddress = options.servicePath + ':' + options.port;
        const creds = await this._getCredentials(options);
        const grpcOptions = {};
        Object.keys(options).forEach(key => {
            if (key.startsWith('grpc.')) {
                grpcOptions[key.replace(/^grpc\./, '')] = options[key];
            }
        });
        const stub = new CreateStub(serviceAddress, creds, grpcOptions);
        return stub;
    }
    /**
     * Creates a 'bytelength' function for a given proto message class.
     *
     * See {@link BundleDescriptor} about the meaning of the return value.
     *
     * @param {function} message - a constructor function that is generated by
     *   protobuf.js. Assumes 'encoder' field in the message.
     * @return {function(Object):number} - a function to compute the byte length
     *   for an object.
     */
    static createByteLengthFunction(message) {
        return function getByteLength(obj) {
            return message.encode(obj).finish().length;
        };
    }
}
exports.GrpcClient = GrpcClient;
class GoogleProtoFilesRoot extends protobuf.Root {
    constructor(...args) {
        super(...args);
    }
    // Causes the loading of an included proto to check if it is a common
    // proto. If it is a common proto, use the bundled proto.
    resolvePath(originPath, includePath) {
        originPath = path.normalize(originPath);
        includePath = path.normalize(includePath);
        // Fully qualified paths don't need to be resolved.
        if (path.isAbsolute(includePath)) {
            if (!fs.existsSync(includePath)) {
                throw new Error('The include `' + includePath + '` was not found.');
            }
            return includePath;
        }
        if (COMMON_PROTO_FILES.indexOf(includePath) > -1) {
            return path.join(googleProtoFilesDir, includePath);
        }
        return GoogleProtoFilesRoot._findIncludePath(originPath, includePath);
    }
    static _findIncludePath(originPath, includePath) {
        originPath = path.normalize(originPath);
        includePath = path.normalize(includePath);
        let current = originPath;
        let found = fs.existsSync(path.join(current, includePath));
        while (!found && current.length > 0) {
            current = current.substring(0, current.lastIndexOf(path.sep));
            found = fs.existsSync(path.join(current, includePath));
        }
        if (!found) {
            throw new Error('The include `' + includePath + '` was not found.');
        }
        return path.join(current, includePath);
    }
}
exports.GoogleProtoFilesRoot = GoogleProtoFilesRoot;
//# sourceMappingURL=grpc.js.map