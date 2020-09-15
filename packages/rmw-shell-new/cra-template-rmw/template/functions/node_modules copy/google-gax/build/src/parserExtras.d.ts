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
import { Segment } from './pathTemplate';
export declare const BINDING = 1;
export declare const END_BINDING = 2;
export declare const TERMINAL = 3;
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
export declare function finishParse(segments: Segment[]): {
    segments: Segment[];
    size: number;
};
