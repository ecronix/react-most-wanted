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
import * as protobuf from 'protobufjs';
interface ProtobufAny {
    type_url: string;
    value: Uint8Array;
}
interface DecodedRpcStatus {
    code: number;
    message: string;
    details: Array<{}>;
}
export declare class FallbackErrorDecoder {
    root: protobuf.Root;
    anyType: protobuf.Type;
    statusType: protobuf.Type;
    constructor();
    decodeProtobufAny(anyValue: ProtobufAny): protobuf.Message<{}>;
    decodeRpcStatus(buffer: Buffer | ArrayBuffer): DecodedRpcStatus;
}
export {};
