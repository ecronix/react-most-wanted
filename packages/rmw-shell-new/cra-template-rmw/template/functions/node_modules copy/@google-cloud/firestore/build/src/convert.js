"use strict";
/*!
 * Copyright 2019 Google Inc. All Rights Reserved.
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
const validate_1 = require("./validate");
/*!
 * @module firestore/convert
 * @private
 *
 * This module contains utility functions to convert
 * `firestore.v1.Documents` from Proto3 JSON to their equivalent
 * representation in Protobuf JS. Protobuf JS is the only encoding supported by
 * this client, and dependencies that use Proto3 JSON (such as the Google Cloud
 * Functions SDK) are supported through this conversion and its usage in
 * {@see Firestore#snapshot_}.
 */
/**
 * Converts an ISO 8601 or google.protobuf.Timestamp proto into Protobuf JS.
 *
 * @private
 * @param timestampValue The value to convert.
 * @param argumentName The argument name to use in the error message if the
 * conversion fails. If omitted, 'timestampValue' is used.
 * @return The value as expected by Protobuf JS or undefined if no input was
 * provided.
 */
function timestampFromJson(timestampValue, argumentName) {
    let timestampProto;
    if (typeof timestampValue === 'string') {
        const date = new Date(timestampValue);
        const seconds = Math.floor(date.getTime() / 1000);
        let nanos = 0;
        if (timestampValue.length > 20) {
            const nanoString = timestampValue.substring(20, timestampValue.length - 1);
            const trailingZeroes = 9 - nanoString.length;
            nanos = Number(nanoString) * Math.pow(10, trailingZeroes);
        }
        if (isNaN(seconds) || isNaN(nanos)) {
            argumentName = argumentName || 'timestampValue';
            throw new Error(`Specify a valid ISO 8601 timestamp for "${argumentName}".`);
        }
        timestampProto = {
            seconds: seconds || undefined,
            nanos: nanos || undefined,
        };
    }
    else if (timestampValue !== undefined) {
        validate_1.validateObject('timestampValue', timestampValue);
        timestampProto = {
            seconds: timestampValue.seconds || undefined,
            nanos: timestampValue.nanos || undefined,
        };
    }
    return timestampProto;
}
exports.timestampFromJson = timestampFromJson;
/**
 * Converts a Proto3 JSON 'bytesValue' field into Protobuf JS.
 *
 * @private
 * @param bytesValue The value to convert.
 * @return The value as expected by Protobuf JS.
 */
function bytesFromJson(bytesValue) {
    if (typeof bytesValue === 'string') {
        return Buffer.from(bytesValue, 'base64');
    }
    else {
        return bytesValue;
    }
}
/**
 * Detects 'valueType' from a Proto3 JSON `firestore.v1.Value` proto.
 *
 * @private
 * @param proto The `firestore.v1.Value` proto.
 * @return The string value for 'valueType'.
 */
function detectValueType(proto) {
    if (proto.valueType) {
        return proto.valueType;
    }
    const detectedValues = [];
    if (proto.stringValue !== undefined) {
        detectedValues.push('stringValue');
    }
    if (proto.booleanValue !== undefined) {
        detectedValues.push('booleanValue');
    }
    if (proto.integerValue !== undefined) {
        detectedValues.push('integerValue');
    }
    if (proto.doubleValue !== undefined) {
        detectedValues.push('doubleValue');
    }
    if (proto.timestampValue !== undefined) {
        detectedValues.push('timestampValue');
    }
    if (proto.referenceValue !== undefined) {
        detectedValues.push('referenceValue');
    }
    if (proto.arrayValue !== undefined) {
        detectedValues.push('arrayValue');
    }
    if (proto.nullValue !== undefined) {
        detectedValues.push('nullValue');
    }
    if (proto.mapValue !== undefined) {
        detectedValues.push('mapValue');
    }
    if (proto.geoPointValue !== undefined) {
        detectedValues.push('geoPointValue');
    }
    if (proto.bytesValue !== undefined) {
        detectedValues.push('bytesValue');
    }
    if (detectedValues.length !== 1) {
        throw new Error(`Unable to infer type value fom '${JSON.stringify(proto)}'.`);
    }
    return detectedValues[0];
}
exports.detectValueType = detectValueType;
/**
 * Converts a `firestore.v1.Value` in Proto3 JSON encoding into the
 * Protobuf JS format expected by this client.
 *
 * @private
 * @param fieldValue The `firestore.v1.Value` in Proto3 JSON format.
 * @return The `firestore.v1.Value` in Protobuf JS format.
 */
function valueFromJson(fieldValue) {
    const valueType = detectValueType(fieldValue);
    switch (valueType) {
        case 'timestampValue':
            return {
                timestampValue: timestampFromJson(fieldValue.timestampValue),
            };
        case 'bytesValue':
            return {
                bytesValue: bytesFromJson(fieldValue.bytesValue),
            };
        case 'integerValue':
            return {
                integerValue: Number(fieldValue.integerValue),
            };
        case 'doubleValue':
            return {
                doubleValue: Number(fieldValue.doubleValue),
            };
        case 'arrayValue': {
            const arrayValue = [];
            if (Array.isArray(fieldValue.arrayValue.values)) {
                for (const value of fieldValue.arrayValue.values) {
                    arrayValue.push(valueFromJson(value));
                }
            }
            return {
                arrayValue: {
                    values: arrayValue,
                },
            };
        }
        case 'mapValue': {
            const mapValue = {};
            const fields = fieldValue.mapValue.fields;
            if (fields) {
                for (const prop of Object.keys(fields)) {
                    mapValue[prop] = valueFromJson(fieldValue.mapValue.fields[prop]);
                }
            }
            return {
                mapValue: {
                    fields: mapValue,
                },
            };
        }
        default:
            return fieldValue;
    }
}
exports.valueFromJson = valueFromJson;
/**
 * Converts a map of IValues in Proto3 JSON encoding into the Protobuf JS format
 * expected by this client. This conversion creates a copy of the underlying
 * fields.
 *
 * @private
 * @param document An object with IValues in Proto3 JSON format.
 * @return The object in Protobuf JS format.
 */
function fieldsFromJson(document) {
    const result = {};
    for (const prop of Object.keys(document)) {
        result[prop] = valueFromJson(document[prop]);
    }
    return result;
}
exports.fieldsFromJson = fieldsFromJson;
//# sourceMappingURL=convert.js.map