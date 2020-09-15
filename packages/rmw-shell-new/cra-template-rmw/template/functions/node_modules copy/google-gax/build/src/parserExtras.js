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
const util = require("util");
/* constants used in the pegjs parser */
exports.BINDING = 1;
exports.END_BINDING = 2;
exports.TERMINAL = 3;
/**
 * Checks that segments only has one terminal segment that is a path wildcard.
 *
 * @private
 *
 * @param {Segments[]} segments the parsed segments
 * @throws {TypeError} if there are too many
 */
function allowOnePathWildcard(segments) {
    let hasPathWildcard = false;
    for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        if (s.kind !== exports.TERMINAL || s.literal !== '**') {
            continue;
        }
        if (hasPathWildcard) {
            const tooManyWildcards = 'cannot contain more than one path wildcard';
            throw new TypeError(tooManyWildcards);
        }
        hasPathWildcard = true;
    }
}
/**
 * Counts the number of terminal segments.
 *
 * @private
 *
 * @param {Segments[]} segments the parsed segments
 * @return {number} the number of terminal segments in the template
 */
function countTerminals(segments) {
    return segments.filter(x => x.kind === exports.TERMINAL).length;
}
/**
 * Updates missing literals of each of the binding segments.
 *
 * @private
 *
 * @param {Segments[]} segments the parsed segments
 */
function updateBindingLiterals(segments) {
    let bindingIndex = 0;
    segments.forEach(s => {
        if (s.kind === exports.BINDING && !s.literal) {
            s.literal = util.format('$%d', bindingIndex);
            bindingIndex += 1;
        }
    });
}
/**
 * Completes the parsing of the segments
 *
 * Validates them, and transforms them into the object used by the
 * PathTemplate class.
 *
 * @private
 *
 * @param {Segments[]} segments the parsed segments
 * @param {Object} initializes the attributes of a PathTemplate
 * @return {Object} Returns segments and size
 * @throws {TypeError} if multiple path wildcards exist
 */
function finishParse(segments) {
    allowOnePathWildcard(segments);
    updateBindingLiterals(segments);
    return {
        segments,
        size: countTerminals(segments),
    };
}
exports.finishParse = finishParse;
//# sourceMappingURL=parserExtras.js.map