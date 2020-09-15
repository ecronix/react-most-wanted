"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const googleauth_1 = require("./auth/googleauth");
exports.GoogleAuth = googleauth_1.GoogleAuth;
var computeclient_1 = require("./auth/computeclient");
exports.Compute = computeclient_1.Compute;
var envDetect_1 = require("./auth/envDetect");
exports.GCPEnv = envDetect_1.GCPEnv;
var iam_1 = require("./auth/iam");
exports.IAMAuth = iam_1.IAMAuth;
var idtokenclient_1 = require("./auth/idtokenclient");
exports.IdTokenClient = idtokenclient_1.IdTokenClient;
var jwtaccess_1 = require("./auth/jwtaccess");
exports.JWTAccess = jwtaccess_1.JWTAccess;
var jwtclient_1 = require("./auth/jwtclient");
exports.JWT = jwtclient_1.JWT;
var oauth2client_1 = require("./auth/oauth2client");
exports.CodeChallengeMethod = oauth2client_1.CodeChallengeMethod;
exports.OAuth2Client = oauth2client_1.OAuth2Client;
var loginticket_1 = require("./auth/loginticket");
exports.LoginTicket = loginticket_1.LoginTicket;
var refreshclient_1 = require("./auth/refreshclient");
exports.UserRefreshClient = refreshclient_1.UserRefreshClient;
var transporters_1 = require("./transporters");
exports.DefaultTransporter = transporters_1.DefaultTransporter;
const auth = new googleauth_1.GoogleAuth();
exports.auth = auth;
//# sourceMappingURL=index.js.map