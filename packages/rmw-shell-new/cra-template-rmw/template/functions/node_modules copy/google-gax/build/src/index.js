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
const grpc_1 = require("./grpc");
const operationsClient = require("./operationsClient");
const routingHeader = require("./routingHeader");
exports.routingHeader = routingHeader;
var google_auth_library_1 = require("google-auth-library");
exports.GoogleAuth = google_auth_library_1.GoogleAuth;
var call_1 = require("./call");
exports.OngoingCall = call_1.OngoingCall;
var createApiCall_1 = require("./createApiCall");
exports.createApiCall = createApiCall_1.createApiCall;
var descriptor_1 = require("./descriptor");
exports.BundleDescriptor = descriptor_1.BundleDescriptor;
exports.LongrunningDescriptor = descriptor_1.LongrunningDescriptor;
exports.PageDescriptor = descriptor_1.PageDescriptor;
exports.StreamDescriptor = descriptor_1.StreamDescriptor;
var gax_1 = require("./gax");
exports.CallSettings = gax_1.CallSettings;
exports.constructSettings = gax_1.constructSettings;
exports.RetryOptions = gax_1.RetryOptions;
exports.createRetryOptions = gax_1.createRetryOptions;
exports.createBundleOptions = gax_1.createBundleOptions;
exports.createBackoffSettings = gax_1.createBackoffSettings;
exports.createDefaultBackoffSettings = gax_1.createDefaultBackoffSettings;
exports.createMaxRetriesBackoffSettings = gax_1.createMaxRetriesBackoffSettings;
var googleError_1 = require("./googleError");
exports.GoogleError = googleError_1.GoogleError;
var grpc_2 = require("./grpc");
exports.ClientStub = grpc_2.ClientStub;
exports.GoogleProtoFilesRoot = grpc_2.GoogleProtoFilesRoot;
exports.GrpcClient = grpc_2.GrpcClient;
var longrunning_1 = require("./longRunningCalls/longrunning");
exports.Operation = longrunning_1.Operation;
exports.operation = longrunning_1.operation;
var pathTemplate_1 = require("./pathTemplate");
exports.PathTemplate = pathTemplate_1.PathTemplate;
var status_1 = require("./status");
exports.Status = status_1.Status;
var streaming_1 = require("./streamingCalls/streaming");
exports.StreamType = streaming_1.StreamType;
function lro(options) {
    options = Object.assign({ scopes: lro.ALL_SCOPES }, options);
    const gaxGrpc = new grpc_1.GrpcClient(options);
    return new operationsClient.OperationsClientBuilder(gaxGrpc);
}
exports.lro = lro;
lro.SERVICE_ADDRESS = operationsClient.SERVICE_ADDRESS;
lro.ALL_SCOPES = operationsClient.ALL_SCOPES;
var operationsClient_1 = require("./operationsClient");
exports.OperationsClient = operationsClient_1.OperationsClient;
exports.createByteLengthFunction = grpc_1.GrpcClient.createByteLengthFunction;
exports.version = require('../../package.json').version;
const protobuf = require("protobufjs");
exports.protobuf = protobuf;
const fallback = require("./fallback");
exports.fallback = fallback;
//# sourceMappingURL=index.js.map