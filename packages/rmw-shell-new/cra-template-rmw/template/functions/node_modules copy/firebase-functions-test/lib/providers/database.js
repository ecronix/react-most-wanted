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
const app_1 = require("../app");
/** Create a DataSnapshot. */
function makeDataSnapshot(
/** Value of data for the snapshot. */
val, 
/** Full path of the reference (e.g. 'users/alovelace'). */
refPath, 
/** The Firebase app that the database belongs to.
 * The databaseURL supplied when initializing the app will be used for creating this snapshot.
 * You do not need to supply this parameter if you supplied Firebase config values when initializing
 * firebase-functions-test.
 */
firebaseApp) {
    return new firebase_functions_1.database.DataSnapshot(val, refPath, firebaseApp || app_1.testApp().getApp());
}
exports.makeDataSnapshot = makeDataSnapshot;
/** Fetch an example data snapshot already populated with data. Can be passed into a wrapped
 * database onCreate or onDelete function.
 */
function exampleDataSnapshot() {
    return makeDataSnapshot({ foo: 'bar ' }, 'messages/1234');
}
exports.exampleDataSnapshot = exampleDataSnapshot;
/** Fetch an example Change object of data snapshots already populated with data.
 * Can be passed into a wrapped database onUpdate or onWrite function.
 */
function exampleDataSnapshotChange() {
    return firebase_functions_1.Change.fromObjects(makeDataSnapshot({ foo: 'faz' }, 'messages/1234'), makeDataSnapshot({ foo: 'bar' }, 'messages/1234'));
}
exports.exampleDataSnapshotChange = exampleDataSnapshotChange;
