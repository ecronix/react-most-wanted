"use strict";
// Copyright 2018 Google LLC
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
Object.defineProperty(exports, "__esModule", { value: true });
var WarningTypes;
(function (WarningTypes) {
    WarningTypes["WARNING"] = "Warning";
    WarningTypes["DEPRECATION"] = "DeprecationWarning";
})(WarningTypes = exports.WarningTypes || (exports.WarningTypes = {}));
function warn(warning) {
    // Only show a given warning once
    if (warning.warned) {
        return;
    }
    warning.warned = true;
    if (typeof process !== 'undefined' && process.emitWarning) {
        // @types/node doesn't recognize the emitWarning syntax which
        // accepts a config object, so `as any` it is
        // https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_emitwarning_warning_options
        // tslint:disable-next-line no-any
        process.emitWarning(warning.message, warning);
    }
    else {
        console.warn(warning.message);
    }
}
exports.warn = warn;
exports.PROBLEMATIC_CREDENTIALS_WARNING = {
    code: 'google-auth-library:00001',
    type: WarningTypes.WARNING,
    message: [
        'Your application has authenticated using end user credentials from Google',
        'Cloud SDK. We recommend that most server applications use service accounts',
        'instead. If your application continues to use end user credentials from',
        'Cloud SDK, you might receive a "quota exceeded" or "API not enabled" error.',
        'For more information about service accounts, see',
        'https://cloud.google.com/docs/authentication/.',
    ].join(' '),
};
exports.DEFAULT_PROJECT_ID_DEPRECATED = {
    code: 'google-auth-library:DEP002',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `getDefaultProjectId` method has been deprecated, and will be removed',
        'in the 3.0 release of google-auth-library. Please use the `getProjectId`',
        'method instead.',
    ].join(' '),
};
exports.COMPUTE_CREATE_SCOPED_DEPRECATED = {
    code: 'google-auth-library:DEP003',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `createScopedRequired` method on the `Compute` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library.',
    ].join(' '),
};
exports.JWT_CREATE_SCOPED_DEPRECATED = {
    code: 'google-auth-library:DEP004',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `createScopedRequired` method on the `JWT` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library.',
    ].join(' '),
};
exports.IAM_CREATE_SCOPED_DEPRECATED = {
    code: 'google-auth-library:DEP005',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `createScopedRequired` method on the `IAM` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library.',
    ].join(' '),
};
exports.JWT_ACCESS_CREATE_SCOPED_DEPRECATED = {
    code: 'google-auth-library:DEP006',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `createScopedRequired` method on the `JWTAccess` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library.',
    ].join(' '),
};
exports.OAUTH_GET_REQUEST_METADATA_DEPRECATED = {
    code: 'google-auth-library:DEP004',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `getRequestMetadata` method on the `OAuth2` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library. Please use',
        'the `getRequestHeaders` method instead.',
    ].join(' '),
};
exports.IAM_GET_REQUEST_METADATA_DEPRECATED = {
    code: 'google-auth-library:DEP005',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `getRequestMetadata` method on the `IAM` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library. Please use',
        'the `getRequestHeaders` method instead.',
    ].join(' '),
};
exports.JWT_ACCESS_GET_REQUEST_METADATA_DEPRECATED = {
    code: 'google-auth-library:DEP006',
    type: WarningTypes.DEPRECATION,
    message: [
        'The `getRequestMetadata` method on the `JWTAccess` class has been deprecated,',
        'and will be removed in the 3.0 release of google-auth-library. Please use',
        'the `getRequestHeaders` method instead.',
    ].join(' '),
};
//# sourceMappingURL=messages.js.map