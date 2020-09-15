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
/**
 * Provides behavior that supports request bundling.
 */
const at = require("lodash.at");
/**
 * Compute the identifier of the `obj`. The objects of the same ID
 * will be bundled together.
 *
 * @param {RequestType} obj - The request object.
 * @param {String[]} discriminatorFields - The array of field names.
 *   A field name may include '.' as a separator, which is used to
 *   indicate object traversal.
 * @return {String|undefined} - the identifier string, or undefined if any
 *   discriminator fields do not exist.
 */
function computeBundleId(obj, discriminatorFields) {
    const ids = [];
    let hasIds = false;
    for (let i = 0; i < discriminatorFields.length; ++i) {
        const id = at(obj, discriminatorFields[i])[0];
        if (id === undefined) {
            ids.push(null);
        }
        else {
            hasIds = true;
            ids.push(id);
        }
    }
    if (!hasIds) {
        return undefined;
    }
    return JSON.stringify(ids);
}
exports.computeBundleId = computeBundleId;
//# sourceMappingURL=bundlingUtils.js.map