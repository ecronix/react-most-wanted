"use strict";
/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
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
const convert_1 = require("./convert");
const path_1 = require("./path");
/*!
 * The type order as defined by the backend.
 */
var TypeOrder;
(function (TypeOrder) {
    TypeOrder[TypeOrder["NULL"] = 0] = "NULL";
    TypeOrder[TypeOrder["BOOLEAN"] = 1] = "BOOLEAN";
    TypeOrder[TypeOrder["NUMBER"] = 2] = "NUMBER";
    TypeOrder[TypeOrder["TIMESTAMP"] = 3] = "TIMESTAMP";
    TypeOrder[TypeOrder["STRING"] = 4] = "STRING";
    TypeOrder[TypeOrder["BLOB"] = 5] = "BLOB";
    TypeOrder[TypeOrder["REF"] = 6] = "REF";
    TypeOrder[TypeOrder["GEO_POINT"] = 7] = "GEO_POINT";
    TypeOrder[TypeOrder["ARRAY"] = 8] = "ARRAY";
    TypeOrder[TypeOrder["OBJECT"] = 9] = "OBJECT";
})(TypeOrder || (TypeOrder = {}));
/*!
 * @private
 */
function typeOrder(val) {
    const valueType = convert_1.detectValueType(val);
    switch (valueType) {
        case 'nullValue':
            return TypeOrder.NULL;
        case 'integerValue':
            return TypeOrder.NUMBER;
        case 'doubleValue':
            return TypeOrder.NUMBER;
        case 'stringValue':
            return TypeOrder.STRING;
        case 'booleanValue':
            return TypeOrder.BOOLEAN;
        case 'arrayValue':
            return TypeOrder.ARRAY;
        case 'timestampValue':
            return TypeOrder.TIMESTAMP;
        case 'geoPointValue':
            return TypeOrder.GEO_POINT;
        case 'bytesValue':
            return TypeOrder.BLOB;
        case 'referenceValue':
            return TypeOrder.REF;
        case 'mapValue':
            return TypeOrder.OBJECT;
        default:
            throw new Error('Unexpected value type: ' + valueType);
    }
}
/*!
 * @private
 */
function primitiveComparator(left, right) {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
}
exports.primitiveComparator = primitiveComparator;
/*!
 * Utility function to compare doubles (using Firestore semantics for NaN).
 * @private
 */
function compareNumbers(left, right) {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    if (left === right) {
        return 0;
    }
    // one or both are NaN.
    if (isNaN(left)) {
        return isNaN(right) ? 0 : -1;
    }
    return 1;
}
/*!
 * @private
 */
function compareNumberProtos(left, right) {
    let leftValue, rightValue;
    if (left.integerValue !== undefined) {
        leftValue = Number(left.integerValue);
    }
    else {
        leftValue = Number(left.doubleValue);
    }
    if (right.integerValue !== undefined) {
        rightValue = Number(right.integerValue);
    }
    else {
        rightValue = Number(right.doubleValue);
    }
    return compareNumbers(leftValue, rightValue);
}
/*!
 * @private
 */
function compareTimestamps(left, right) {
    const seconds = primitiveComparator(left.seconds || 0, right.seconds || 0);
    if (seconds !== 0) {
        return seconds;
    }
    return primitiveComparator(left.nanos || 0, right.nanos || 0);
}
/*!
 * @private
 */
function compareBlobs(left, right) {
    if (!(left instanceof Buffer) || !(right instanceof Buffer)) {
        throw new Error('Blobs can only be compared if they are Buffers.');
    }
    return Buffer.compare(left, right);
}
/*!
 * @private
 */
function compareReferenceProtos(left, right) {
    const leftPath = path_1.QualifiedResourcePath.fromSlashSeparatedString(left.referenceValue);
    const rightPath = path_1.QualifiedResourcePath.fromSlashSeparatedString(right.referenceValue);
    return leftPath.compareTo(rightPath);
}
/*!
 * @private
 */
function compareGeoPoints(left, right) {
    return (primitiveComparator(left.latitude || 0, right.latitude || 0) ||
        primitiveComparator(left.longitude || 0, right.longitude || 0));
}
/*!
 * @private
 */
function compareArrays(left, right) {
    for (let i = 0; i < left.length && i < right.length; i++) {
        const valueComparison = compare(left[i], right[i]);
        if (valueComparison !== 0) {
            return valueComparison;
        }
    }
    // If all the values matched so far, just check the length.
    return primitiveComparator(left.length, right.length);
}
/*!
 * @private
 */
function compareObjects(left, right) {
    // This requires iterating over the keys in the object in order and doing a
    // deep comparison.
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    leftKeys.sort();
    rightKeys.sort();
    for (let i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
        const keyComparison = primitiveComparator(leftKeys[i], rightKeys[i]);
        if (keyComparison !== 0) {
            return keyComparison;
        }
        const key = leftKeys[i];
        const valueComparison = compare(left[key], right[key]);
        if (valueComparison !== 0) {
            return valueComparison;
        }
    }
    // If all the keys matched so far, just check the length.
    return primitiveComparator(leftKeys.length, rightKeys.length);
}
/*!
 * @private
 */
function compare(left, right) {
    // First compare the types.
    const leftType = typeOrder(left);
    const rightType = typeOrder(right);
    const typeComparison = primitiveComparator(leftType, rightType);
    if (typeComparison !== 0) {
        return typeComparison;
    }
    // So they are the same type.
    switch (leftType) {
        case TypeOrder.NULL:
            // Nulls are all equal.
            return 0;
        case TypeOrder.BOOLEAN:
            return primitiveComparator(left.booleanValue, right.booleanValue);
        case TypeOrder.STRING:
            return primitiveComparator(left.stringValue, right.stringValue);
        case TypeOrder.NUMBER:
            return compareNumberProtos(left, right);
        case TypeOrder.TIMESTAMP:
            return compareTimestamps(left.timestampValue, right.timestampValue);
        case TypeOrder.BLOB:
            return compareBlobs(left.bytesValue, right.bytesValue);
        case TypeOrder.REF:
            return compareReferenceProtos(left, right);
        case TypeOrder.GEO_POINT:
            return compareGeoPoints(left.geoPointValue, right.geoPointValue);
        case TypeOrder.ARRAY:
            return compareArrays(left.arrayValue.values || [], right.arrayValue.values || []);
        case TypeOrder.OBJECT:
            return compareObjects(left.mapValue.fields || {}, right.mapValue.fields || {});
        default:
            throw new Error(`Encountered unknown type order: ${leftType}`);
    }
}
exports.compare = compare;
//# sourceMappingURL=order.js.map