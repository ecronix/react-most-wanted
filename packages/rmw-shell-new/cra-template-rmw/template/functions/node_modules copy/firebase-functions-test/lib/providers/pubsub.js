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
const firebase_functions_1 = require("firebase-functions");
function makeMessage(jsonOrEncodedString, attributes) {
    let data = jsonOrEncodedString;
    if (typeof data !== 'string') {
        try {
            data = new Buffer(JSON.stringify(data)).toString('base64');
        }
        catch (e) {
            throw new Error('Please provide either a JSON object or a base 64 encoded string.');
        }
    }
    return new firebase_functions_1.pubsub.Message({
        data,
        attributes: attributes || {},
    });
}
exports.makeMessage = makeMessage;
/** Fetch an example Message already populated with data. */
function exampleMessage() {
    return makeMessage({ message: 'Hello World!' });
}
exports.exampleMessage = exampleMessage;
