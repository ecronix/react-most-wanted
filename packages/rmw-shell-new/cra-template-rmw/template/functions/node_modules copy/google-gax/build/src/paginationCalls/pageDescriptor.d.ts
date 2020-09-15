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
/// <reference types="node" />
import { Transform } from 'stream';
import { APICaller } from '../apiCaller';
import { GaxCall } from '../apitypes';
import { Descriptor } from '../descriptor';
import { CallSettings } from '../gax';
/**
 * A descriptor for methods that support pagination.
 */
export declare class PageDescriptor implements Descriptor {
    requestPageTokenField: string;
    responsePageTokenField: string;
    requestPageSizeField?: string;
    resourceField: string;
    constructor(requestPageTokenField: string, responsePageTokenField: string, resourceField: string);
    /**
     * Creates a new object Stream which emits the resource on 'data' event.
     */
    createStream(apiCall: GaxCall, request: {}, options: CallSettings): Transform;
    getApiCaller(settings: CallSettings): APICaller;
}
