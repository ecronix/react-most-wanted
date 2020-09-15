"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2018 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const lodash_2 = require("lodash");
const app_1 = require("./app");
class FirebaseFunctionsTest {
    constructor() {
        this._oldEnv = {};
    }
    /** Initialize the SDK. */
    init(
    /** Firebase config values for initializing a Firebase app for your test code to
     * interact with (e.g. making database writes). It is recommended that you use
     * a project that is specifically for testing. If omitted, mock config values will
     * be used and your tests will not interact with a real Firebase app, and all Firebase
     * methods need to be stubbed, otherwise they will fail.
     */
    firebaseConfig, 
    /** Path to a service account key file to be used when initializing the Firebase app. */
    pathToServiceAccountKey) {
        this._oldEnv = {
            FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
            GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
            CLOUD_RUNTIME_CONFIG: process.env.CLOUD_RUNTIME_CONFIG,
        };
        if (lodash_1.isEmpty(firebaseConfig)) {
            process.env.FIREBASE_CONFIG = JSON.stringify({
                databaseURL: 'https://not-a-project.firebaseio.com',
                storageBucket: 'not-a-project.appspot.com',
                projectId: 'not-a-project',
            });
        }
        else {
            process.env.FIREBASE_CONFIG = JSON.stringify(firebaseConfig);
            if (pathToServiceAccountKey) {
                process.env.GOOGLE_APPLICATION_CREDENTIALS = pathToServiceAccountKey;
            }
        }
        process.env.GCLOUD_PROJECT = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
    }
    /** Complete clean up tasks. */
    cleanup() {
        lodash_2.forEach(this._oldEnv, (val, varName) => {
            if (typeof val !== 'undefined') {
                process.env[varName] = val;
            }
            else {
                delete process.env[varName];
            }
        });
        app_1.testApp().deleteApp();
    }
}
exports.FirebaseFunctionsTest = FirebaseFunctionsTest;
