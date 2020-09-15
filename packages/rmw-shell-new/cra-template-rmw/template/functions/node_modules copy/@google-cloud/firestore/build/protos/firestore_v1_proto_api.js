/*!
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

// Common aliases
var $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            return Timestamp;
        })();

        protobuf.FileDescriptorSet = (function() {

            /**
             * Properties of a FileDescriptorSet.
             * @memberof google.protobuf
             * @interface IFileDescriptorSet
             * @property {Array.<google.protobuf.IFileDescriptorProto>|null} [file] FileDescriptorSet file
             */

            /**
             * Constructs a new FileDescriptorSet.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorSet.
             * @implements IFileDescriptorSet
             * @constructor
             * @param {google.protobuf.IFileDescriptorSet=} [properties] Properties to set
             */
            function FileDescriptorSet(properties) {
                this.file = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileDescriptorSet file.
             * @member {Array.<google.protobuf.IFileDescriptorProto>} file
             * @memberof google.protobuf.FileDescriptorSet
             * @instance
             */
            FileDescriptorSet.prototype.file = $util.emptyArray;

            return FileDescriptorSet;
        })();

        protobuf.FileDescriptorProto = (function() {

            /**
             * Properties of a FileDescriptorProto.
             * @memberof google.protobuf
             * @interface IFileDescriptorProto
             * @property {string|null} [name] FileDescriptorProto name
             * @property {string|null} ["package"] FileDescriptorProto package
             * @property {Array.<string>|null} [dependency] FileDescriptorProto dependency
             * @property {Array.<number>|null} [publicDependency] FileDescriptorProto publicDependency
             * @property {Array.<number>|null} [weakDependency] FileDescriptorProto weakDependency
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [messageType] FileDescriptorProto messageType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] FileDescriptorProto enumType
             * @property {Array.<google.protobuf.IServiceDescriptorProto>|null} [service] FileDescriptorProto service
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] FileDescriptorProto extension
             * @property {google.protobuf.IFileOptions|null} [options] FileDescriptorProto options
             * @property {google.protobuf.ISourceCodeInfo|null} [sourceCodeInfo] FileDescriptorProto sourceCodeInfo
             * @property {string|null} [syntax] FileDescriptorProto syntax
             */

            /**
             * Constructs a new FileDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorProto.
             * @implements IFileDescriptorProto
             * @constructor
             * @param {google.protobuf.IFileDescriptorProto=} [properties] Properties to set
             */
            function FileDescriptorProto(properties) {
                this.dependency = [];
                this.publicDependency = [];
                this.weakDependency = [];
                this.messageType = [];
                this.enumType = [];
                this.service = [];
                this.extension = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.name = "";

            /**
             * FileDescriptorProto package.
             * @member {string} package
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype["package"] = "";

            /**
             * FileDescriptorProto dependency.
             * @member {Array.<string>} dependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.dependency = $util.emptyArray;

            /**
             * FileDescriptorProto publicDependency.
             * @member {Array.<number>} publicDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.publicDependency = $util.emptyArray;

            /**
             * FileDescriptorProto weakDependency.
             * @member {Array.<number>} weakDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.weakDependency = $util.emptyArray;

            /**
             * FileDescriptorProto messageType.
             * @member {Array.<google.protobuf.IDescriptorProto>} messageType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.messageType = $util.emptyArray;

            /**
             * FileDescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.enumType = $util.emptyArray;

            /**
             * FileDescriptorProto service.
             * @member {Array.<google.protobuf.IServiceDescriptorProto>} service
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.service = $util.emptyArray;

            /**
             * FileDescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.extension = $util.emptyArray;

            /**
             * FileDescriptorProto options.
             * @member {google.protobuf.IFileOptions|null|undefined} options
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.options = null;

            /**
             * FileDescriptorProto sourceCodeInfo.
             * @member {google.protobuf.ISourceCodeInfo|null|undefined} sourceCodeInfo
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.sourceCodeInfo = null;

            /**
             * FileDescriptorProto syntax.
             * @member {string} syntax
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.syntax = "";

            return FileDescriptorProto;
        })();

        protobuf.DescriptorProto = (function() {

            /**
             * Properties of a DescriptorProto.
             * @memberof google.protobuf
             * @interface IDescriptorProto
             * @property {string|null} [name] DescriptorProto name
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [field] DescriptorProto field
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] DescriptorProto extension
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [nestedType] DescriptorProto nestedType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] DescriptorProto enumType
             * @property {Array.<google.protobuf.DescriptorProto.IExtensionRange>|null} [extensionRange] DescriptorProto extensionRange
             * @property {Array.<google.protobuf.IOneofDescriptorProto>|null} [oneofDecl] DescriptorProto oneofDecl
             * @property {google.protobuf.IMessageOptions|null} [options] DescriptorProto options
             * @property {Array.<google.protobuf.DescriptorProto.IReservedRange>|null} [reservedRange] DescriptorProto reservedRange
             * @property {Array.<string>|null} [reservedName] DescriptorProto reservedName
             */

            /**
             * Constructs a new DescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a DescriptorProto.
             * @implements IDescriptorProto
             * @constructor
             * @param {google.protobuf.IDescriptorProto=} [properties] Properties to set
             */
            function DescriptorProto(properties) {
                this.field = [];
                this.extension = [];
                this.nestedType = [];
                this.enumType = [];
                this.extensionRange = [];
                this.oneofDecl = [];
                this.reservedRange = [];
                this.reservedName = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.name = "";

            /**
             * DescriptorProto field.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} field
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.field = $util.emptyArray;

            /**
             * DescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.extension = $util.emptyArray;

            /**
             * DescriptorProto nestedType.
             * @member {Array.<google.protobuf.IDescriptorProto>} nestedType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.nestedType = $util.emptyArray;

            /**
             * DescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.enumType = $util.emptyArray;

            /**
             * DescriptorProto extensionRange.
             * @member {Array.<google.protobuf.DescriptorProto.IExtensionRange>} extensionRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.extensionRange = $util.emptyArray;

            /**
             * DescriptorProto oneofDecl.
             * @member {Array.<google.protobuf.IOneofDescriptorProto>} oneofDecl
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.oneofDecl = $util.emptyArray;

            /**
             * DescriptorProto options.
             * @member {google.protobuf.IMessageOptions|null|undefined} options
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.options = null;

            /**
             * DescriptorProto reservedRange.
             * @member {Array.<google.protobuf.DescriptorProto.IReservedRange>} reservedRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.reservedRange = $util.emptyArray;

            /**
             * DescriptorProto reservedName.
             * @member {Array.<string>} reservedName
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.reservedName = $util.emptyArray;

            DescriptorProto.ExtensionRange = (function() {

                /**
                 * Properties of an ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IExtensionRange
                 * @property {number|null} [start] ExtensionRange start
                 * @property {number|null} [end] ExtensionRange end
                 */

                /**
                 * Constructs a new ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents an ExtensionRange.
                 * @implements IExtensionRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IExtensionRange=} [properties] Properties to set
                 */
                function ExtensionRange(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ExtensionRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */
                ExtensionRange.prototype.start = 0;

                /**
                 * ExtensionRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */
                ExtensionRange.prototype.end = 0;

                return ExtensionRange;
            })();

            DescriptorProto.ReservedRange = (function() {

                /**
                 * Properties of a ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IReservedRange
                 * @property {number|null} [start] ReservedRange start
                 * @property {number|null} [end] ReservedRange end
                 */

                /**
                 * Constructs a new ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents a ReservedRange.
                 * @implements IReservedRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IReservedRange=} [properties] Properties to set
                 */
                function ReservedRange(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ReservedRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */
                ReservedRange.prototype.start = 0;

                /**
                 * ReservedRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */
                ReservedRange.prototype.end = 0;

                return ReservedRange;
            })();

            return DescriptorProto;
        })();

        protobuf.FieldDescriptorProto = (function() {

            /**
             * Properties of a FieldDescriptorProto.
             * @memberof google.protobuf
             * @interface IFieldDescriptorProto
             * @property {string|null} [name] FieldDescriptorProto name
             * @property {number|null} [number] FieldDescriptorProto number
             * @property {google.protobuf.FieldDescriptorProto.Label|null} [label] FieldDescriptorProto label
             * @property {google.protobuf.FieldDescriptorProto.Type|null} [type] FieldDescriptorProto type
             * @property {string|null} [typeName] FieldDescriptorProto typeName
             * @property {string|null} [extendee] FieldDescriptorProto extendee
             * @property {string|null} [defaultValue] FieldDescriptorProto defaultValue
             * @property {number|null} [oneofIndex] FieldDescriptorProto oneofIndex
             * @property {string|null} [jsonName] FieldDescriptorProto jsonName
             * @property {google.protobuf.IFieldOptions|null} [options] FieldDescriptorProto options
             */

            /**
             * Constructs a new FieldDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FieldDescriptorProto.
             * @implements IFieldDescriptorProto
             * @constructor
             * @param {google.protobuf.IFieldDescriptorProto=} [properties] Properties to set
             */
            function FieldDescriptorProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FieldDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.name = "";

            /**
             * FieldDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.number = 0;

            /**
             * FieldDescriptorProto label.
             * @member {google.protobuf.FieldDescriptorProto.Label} label
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.label = 1;

            /**
             * FieldDescriptorProto type.
             * @member {google.protobuf.FieldDescriptorProto.Type} type
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.type = 1;

            /**
             * FieldDescriptorProto typeName.
             * @member {string} typeName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.typeName = "";

            /**
             * FieldDescriptorProto extendee.
             * @member {string} extendee
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.extendee = "";

            /**
             * FieldDescriptorProto defaultValue.
             * @member {string} defaultValue
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.defaultValue = "";

            /**
             * FieldDescriptorProto oneofIndex.
             * @member {number} oneofIndex
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.oneofIndex = 0;

            /**
             * FieldDescriptorProto jsonName.
             * @member {string} jsonName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.jsonName = "";

            /**
             * FieldDescriptorProto options.
             * @member {google.protobuf.IFieldOptions|null|undefined} options
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.options = null;

            /**
             * Type enum.
             * @name google.protobuf.FieldDescriptorProto.Type
             * @enum {number}
             * @property {string} TYPE_DOUBLE=TYPE_DOUBLE TYPE_DOUBLE value
             * @property {string} TYPE_FLOAT=TYPE_FLOAT TYPE_FLOAT value
             * @property {string} TYPE_INT64=TYPE_INT64 TYPE_INT64 value
             * @property {string} TYPE_UINT64=TYPE_UINT64 TYPE_UINT64 value
             * @property {string} TYPE_INT32=TYPE_INT32 TYPE_INT32 value
             * @property {string} TYPE_FIXED64=TYPE_FIXED64 TYPE_FIXED64 value
             * @property {string} TYPE_FIXED32=TYPE_FIXED32 TYPE_FIXED32 value
             * @property {string} TYPE_BOOL=TYPE_BOOL TYPE_BOOL value
             * @property {string} TYPE_STRING=TYPE_STRING TYPE_STRING value
             * @property {string} TYPE_GROUP=TYPE_GROUP TYPE_GROUP value
             * @property {string} TYPE_MESSAGE=TYPE_MESSAGE TYPE_MESSAGE value
             * @property {string} TYPE_BYTES=TYPE_BYTES TYPE_BYTES value
             * @property {string} TYPE_UINT32=TYPE_UINT32 TYPE_UINT32 value
             * @property {string} TYPE_ENUM=TYPE_ENUM TYPE_ENUM value
             * @property {string} TYPE_SFIXED32=TYPE_SFIXED32 TYPE_SFIXED32 value
             * @property {string} TYPE_SFIXED64=TYPE_SFIXED64 TYPE_SFIXED64 value
             * @property {string} TYPE_SINT32=TYPE_SINT32 TYPE_SINT32 value
             * @property {string} TYPE_SINT64=TYPE_SINT64 TYPE_SINT64 value
             */
            FieldDescriptorProto.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "TYPE_DOUBLE"] = "TYPE_DOUBLE";
                values[valuesById[2] = "TYPE_FLOAT"] = "TYPE_FLOAT";
                values[valuesById[3] = "TYPE_INT64"] = "TYPE_INT64";
                values[valuesById[4] = "TYPE_UINT64"] = "TYPE_UINT64";
                values[valuesById[5] = "TYPE_INT32"] = "TYPE_INT32";
                values[valuesById[6] = "TYPE_FIXED64"] = "TYPE_FIXED64";
                values[valuesById[7] = "TYPE_FIXED32"] = "TYPE_FIXED32";
                values[valuesById[8] = "TYPE_BOOL"] = "TYPE_BOOL";
                values[valuesById[9] = "TYPE_STRING"] = "TYPE_STRING";
                values[valuesById[10] = "TYPE_GROUP"] = "TYPE_GROUP";
                values[valuesById[11] = "TYPE_MESSAGE"] = "TYPE_MESSAGE";
                values[valuesById[12] = "TYPE_BYTES"] = "TYPE_BYTES";
                values[valuesById[13] = "TYPE_UINT32"] = "TYPE_UINT32";
                values[valuesById[14] = "TYPE_ENUM"] = "TYPE_ENUM";
                values[valuesById[15] = "TYPE_SFIXED32"] = "TYPE_SFIXED32";
                values[valuesById[16] = "TYPE_SFIXED64"] = "TYPE_SFIXED64";
                values[valuesById[17] = "TYPE_SINT32"] = "TYPE_SINT32";
                values[valuesById[18] = "TYPE_SINT64"] = "TYPE_SINT64";
                return values;
            })();

            /**
             * Label enum.
             * @name google.protobuf.FieldDescriptorProto.Label
             * @enum {number}
             * @property {string} LABEL_OPTIONAL=LABEL_OPTIONAL LABEL_OPTIONAL value
             * @property {string} LABEL_REQUIRED=LABEL_REQUIRED LABEL_REQUIRED value
             * @property {string} LABEL_REPEATED=LABEL_REPEATED LABEL_REPEATED value
             */
            FieldDescriptorProto.Label = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "LABEL_OPTIONAL"] = "LABEL_OPTIONAL";
                values[valuesById[2] = "LABEL_REQUIRED"] = "LABEL_REQUIRED";
                values[valuesById[3] = "LABEL_REPEATED"] = "LABEL_REPEATED";
                return values;
            })();

            return FieldDescriptorProto;
        })();

        protobuf.OneofDescriptorProto = (function() {

            /**
             * Properties of an OneofDescriptorProto.
             * @memberof google.protobuf
             * @interface IOneofDescriptorProto
             * @property {string|null} [name] OneofDescriptorProto name
             * @property {google.protobuf.IOneofOptions|null} [options] OneofDescriptorProto options
             */

            /**
             * Constructs a new OneofDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an OneofDescriptorProto.
             * @implements IOneofDescriptorProto
             * @constructor
             * @param {google.protobuf.IOneofDescriptorProto=} [properties] Properties to set
             */
            function OneofDescriptorProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OneofDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */
            OneofDescriptorProto.prototype.name = "";

            /**
             * OneofDescriptorProto options.
             * @member {google.protobuf.IOneofOptions|null|undefined} options
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */
            OneofDescriptorProto.prototype.options = null;

            return OneofDescriptorProto;
        })();

        protobuf.EnumDescriptorProto = (function() {

            /**
             * Properties of an EnumDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumDescriptorProto
             * @property {string|null} [name] EnumDescriptorProto name
             * @property {Array.<google.protobuf.IEnumValueDescriptorProto>|null} [value] EnumDescriptorProto value
             * @property {google.protobuf.IEnumOptions|null} [options] EnumDescriptorProto options
             */

            /**
             * Constructs a new EnumDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumDescriptorProto.
             * @implements IEnumDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumDescriptorProto=} [properties] Properties to set
             */
            function EnumDescriptorProto(properties) {
                this.value = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.name = "";

            /**
             * EnumDescriptorProto value.
             * @member {Array.<google.protobuf.IEnumValueDescriptorProto>} value
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.value = $util.emptyArray;

            /**
             * EnumDescriptorProto options.
             * @member {google.protobuf.IEnumOptions|null|undefined} options
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.options = null;

            return EnumDescriptorProto;
        })();

        protobuf.EnumValueDescriptorProto = (function() {

            /**
             * Properties of an EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumValueDescriptorProto
             * @property {string|null} [name] EnumValueDescriptorProto name
             * @property {number|null} [number] EnumValueDescriptorProto number
             * @property {google.protobuf.IEnumValueOptions|null} [options] EnumValueDescriptorProto options
             */

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueDescriptorProto.
             * @implements IEnumValueDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumValueDescriptorProto=} [properties] Properties to set
             */
            function EnumValueDescriptorProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumValueDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.name = "";

            /**
             * EnumValueDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.number = 0;

            /**
             * EnumValueDescriptorProto options.
             * @member {google.protobuf.IEnumValueOptions|null|undefined} options
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.options = null;

            return EnumValueDescriptorProto;
        })();

        protobuf.ServiceDescriptorProto = (function() {

            /**
             * Properties of a ServiceDescriptorProto.
             * @memberof google.protobuf
             * @interface IServiceDescriptorProto
             * @property {string|null} [name] ServiceDescriptorProto name
             * @property {Array.<google.protobuf.IMethodDescriptorProto>|null} [method] ServiceDescriptorProto method
             * @property {google.protobuf.IServiceOptions|null} [options] ServiceDescriptorProto options
             */

            /**
             * Constructs a new ServiceDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceDescriptorProto.
             * @implements IServiceDescriptorProto
             * @constructor
             * @param {google.protobuf.IServiceDescriptorProto=} [properties] Properties to set
             */
            function ServiceDescriptorProto(properties) {
                this.method = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.name = "";

            /**
             * ServiceDescriptorProto method.
             * @member {Array.<google.protobuf.IMethodDescriptorProto>} method
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.method = $util.emptyArray;

            /**
             * ServiceDescriptorProto options.
             * @member {google.protobuf.IServiceOptions|null|undefined} options
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.options = null;

            return ServiceDescriptorProto;
        })();

        protobuf.MethodDescriptorProto = (function() {

            /**
             * Properties of a MethodDescriptorProto.
             * @memberof google.protobuf
             * @interface IMethodDescriptorProto
             * @property {string|null} [name] MethodDescriptorProto name
             * @property {string|null} [inputType] MethodDescriptorProto inputType
             * @property {string|null} [outputType] MethodDescriptorProto outputType
             * @property {google.protobuf.IMethodOptions|null} [options] MethodDescriptorProto options
             * @property {boolean|null} [clientStreaming] MethodDescriptorProto clientStreaming
             * @property {boolean|null} [serverStreaming] MethodDescriptorProto serverStreaming
             */

            /**
             * Constructs a new MethodDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a MethodDescriptorProto.
             * @implements IMethodDescriptorProto
             * @constructor
             * @param {google.protobuf.IMethodDescriptorProto=} [properties] Properties to set
             */
            function MethodDescriptorProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MethodDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.name = "";

            /**
             * MethodDescriptorProto inputType.
             * @member {string} inputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.inputType = "";

            /**
             * MethodDescriptorProto outputType.
             * @member {string} outputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.outputType = "";

            /**
             * MethodDescriptorProto options.
             * @member {google.protobuf.IMethodOptions|null|undefined} options
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.options = null;

            /**
             * MethodDescriptorProto clientStreaming.
             * @member {boolean} clientStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.clientStreaming = false;

            /**
             * MethodDescriptorProto serverStreaming.
             * @member {boolean} serverStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.serverStreaming = false;

            return MethodDescriptorProto;
        })();

        protobuf.FileOptions = (function() {

            /**
             * Properties of a FileOptions.
             * @memberof google.protobuf
             * @interface IFileOptions
             * @property {string|null} [javaPackage] FileOptions javaPackage
             * @property {string|null} [javaOuterClassname] FileOptions javaOuterClassname
             * @property {boolean|null} [javaMultipleFiles] FileOptions javaMultipleFiles
             * @property {boolean|null} [javaGenerateEqualsAndHash] FileOptions javaGenerateEqualsAndHash
             * @property {boolean|null} [javaStringCheckUtf8] FileOptions javaStringCheckUtf8
             * @property {google.protobuf.FileOptions.OptimizeMode|null} [optimizeFor] FileOptions optimizeFor
             * @property {string|null} [goPackage] FileOptions goPackage
             * @property {boolean|null} [ccGenericServices] FileOptions ccGenericServices
             * @property {boolean|null} [javaGenericServices] FileOptions javaGenericServices
             * @property {boolean|null} [pyGenericServices] FileOptions pyGenericServices
             * @property {boolean|null} [deprecated] FileOptions deprecated
             * @property {boolean|null} [ccEnableArenas] FileOptions ccEnableArenas
             * @property {string|null} [objcClassPrefix] FileOptions objcClassPrefix
             * @property {string|null} [csharpNamespace] FileOptions csharpNamespace
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FileOptions uninterpretedOption
             * @property {Array.<google.api.IResourceDescriptor>|null} [".google.api.resourceDefinition"] FileOptions .google.api.resourceDefinition
             */

            /**
             * Constructs a new FileOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FileOptions.
             * @implements IFileOptions
             * @constructor
             * @param {google.protobuf.IFileOptions=} [properties] Properties to set
             */
            function FileOptions(properties) {
                this.uninterpretedOption = [];
                this[".google.api.resourceDefinition"] = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileOptions javaPackage.
             * @member {string} javaPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaPackage = "";

            /**
             * FileOptions javaOuterClassname.
             * @member {string} javaOuterClassname
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaOuterClassname = "";

            /**
             * FileOptions javaMultipleFiles.
             * @member {boolean} javaMultipleFiles
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaMultipleFiles = false;

            /**
             * FileOptions javaGenerateEqualsAndHash.
             * @member {boolean} javaGenerateEqualsAndHash
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaGenerateEqualsAndHash = false;

            /**
             * FileOptions javaStringCheckUtf8.
             * @member {boolean} javaStringCheckUtf8
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaStringCheckUtf8 = false;

            /**
             * FileOptions optimizeFor.
             * @member {google.protobuf.FileOptions.OptimizeMode} optimizeFor
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.optimizeFor = 1;

            /**
             * FileOptions goPackage.
             * @member {string} goPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.goPackage = "";

            /**
             * FileOptions ccGenericServices.
             * @member {boolean} ccGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.ccGenericServices = false;

            /**
             * FileOptions javaGenericServices.
             * @member {boolean} javaGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaGenericServices = false;

            /**
             * FileOptions pyGenericServices.
             * @member {boolean} pyGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.pyGenericServices = false;

            /**
             * FileOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.deprecated = false;

            /**
             * FileOptions ccEnableArenas.
             * @member {boolean} ccEnableArenas
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.ccEnableArenas = false;

            /**
             * FileOptions objcClassPrefix.
             * @member {string} objcClassPrefix
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.objcClassPrefix = "";

            /**
             * FileOptions csharpNamespace.
             * @member {string} csharpNamespace
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.csharpNamespace = "";

            /**
             * FileOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * FileOptions .google.api.resourceDefinition.
             * @member {Array.<google.api.IResourceDescriptor>} .google.api.resourceDefinition
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype[".google.api.resourceDefinition"] = $util.emptyArray;

            /**
             * OptimizeMode enum.
             * @name google.protobuf.FileOptions.OptimizeMode
             * @enum {number}
             * @property {string} SPEED=SPEED SPEED value
             * @property {string} CODE_SIZE=CODE_SIZE CODE_SIZE value
             * @property {string} LITE_RUNTIME=LITE_RUNTIME LITE_RUNTIME value
             */
            FileOptions.OptimizeMode = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "SPEED"] = "SPEED";
                values[valuesById[2] = "CODE_SIZE"] = "CODE_SIZE";
                values[valuesById[3] = "LITE_RUNTIME"] = "LITE_RUNTIME";
                return values;
            })();

            return FileOptions;
        })();

        protobuf.MessageOptions = (function() {

            /**
             * Properties of a MessageOptions.
             * @memberof google.protobuf
             * @interface IMessageOptions
             * @property {boolean|null} [messageSetWireFormat] MessageOptions messageSetWireFormat
             * @property {boolean|null} [noStandardDescriptorAccessor] MessageOptions noStandardDescriptorAccessor
             * @property {boolean|null} [deprecated] MessageOptions deprecated
             * @property {boolean|null} [mapEntry] MessageOptions mapEntry
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MessageOptions uninterpretedOption
             * @property {google.api.IResourceDescriptor|null} [".google.api.resource"] MessageOptions .google.api.resource
             */

            /**
             * Constructs a new MessageOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MessageOptions.
             * @implements IMessageOptions
             * @constructor
             * @param {google.protobuf.IMessageOptions=} [properties] Properties to set
             */
            function MessageOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MessageOptions messageSetWireFormat.
             * @member {boolean} messageSetWireFormat
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.messageSetWireFormat = false;

            /**
             * MessageOptions noStandardDescriptorAccessor.
             * @member {boolean} noStandardDescriptorAccessor
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.noStandardDescriptorAccessor = false;

            /**
             * MessageOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.deprecated = false;

            /**
             * MessageOptions mapEntry.
             * @member {boolean} mapEntry
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.mapEntry = false;

            /**
             * MessageOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * MessageOptions .google.api.resource.
             * @member {google.api.IResourceDescriptor|null|undefined} .google.api.resource
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype[".google.api.resource"] = null;

            return MessageOptions;
        })();

        protobuf.FieldOptions = (function() {

            /**
             * Properties of a FieldOptions.
             * @memberof google.protobuf
             * @interface IFieldOptions
             * @property {google.protobuf.FieldOptions.CType|null} [ctype] FieldOptions ctype
             * @property {boolean|null} [packed] FieldOptions packed
             * @property {google.protobuf.FieldOptions.JSType|null} [jstype] FieldOptions jstype
             * @property {boolean|null} [lazy] FieldOptions lazy
             * @property {boolean|null} [deprecated] FieldOptions deprecated
             * @property {boolean|null} [weak] FieldOptions weak
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FieldOptions uninterpretedOption
             * @property {Array.<google.api.FieldBehavior>|null} [".google.api.fieldBehavior"] FieldOptions .google.api.fieldBehavior
             * @property {google.api.IResourceReference|null} [".google.api.resourceReference"] FieldOptions .google.api.resourceReference
             */

            /**
             * Constructs a new FieldOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FieldOptions.
             * @implements IFieldOptions
             * @constructor
             * @param {google.protobuf.IFieldOptions=} [properties] Properties to set
             */
            function FieldOptions(properties) {
                this.uninterpretedOption = [];
                this[".google.api.fieldBehavior"] = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FieldOptions ctype.
             * @member {google.protobuf.FieldOptions.CType} ctype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.ctype = 0;

            /**
             * FieldOptions packed.
             * @member {boolean} packed
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.packed = false;

            /**
             * FieldOptions jstype.
             * @member {google.protobuf.FieldOptions.JSType} jstype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.jstype = 0;

            /**
             * FieldOptions lazy.
             * @member {boolean} lazy
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.lazy = false;

            /**
             * FieldOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.deprecated = false;

            /**
             * FieldOptions weak.
             * @member {boolean} weak
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.weak = false;

            /**
             * FieldOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * FieldOptions .google.api.fieldBehavior.
             * @member {Array.<google.api.FieldBehavior>} .google.api.fieldBehavior
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".google.api.fieldBehavior"] = $util.emptyArray;

            /**
             * FieldOptions .google.api.resourceReference.
             * @member {google.api.IResourceReference|null|undefined} .google.api.resourceReference
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".google.api.resourceReference"] = null;

            /**
             * CType enum.
             * @name google.protobuf.FieldOptions.CType
             * @enum {number}
             * @property {string} STRING=STRING STRING value
             * @property {string} CORD=CORD CORD value
             * @property {string} STRING_PIECE=STRING_PIECE STRING_PIECE value
             */
            FieldOptions.CType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STRING"] = "STRING";
                values[valuesById[1] = "CORD"] = "CORD";
                values[valuesById[2] = "STRING_PIECE"] = "STRING_PIECE";
                return values;
            })();

            /**
             * JSType enum.
             * @name google.protobuf.FieldOptions.JSType
             * @enum {number}
             * @property {string} JS_NORMAL=JS_NORMAL JS_NORMAL value
             * @property {string} JS_STRING=JS_STRING JS_STRING value
             * @property {string} JS_NUMBER=JS_NUMBER JS_NUMBER value
             */
            FieldOptions.JSType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "JS_NORMAL"] = "JS_NORMAL";
                values[valuesById[1] = "JS_STRING"] = "JS_STRING";
                values[valuesById[2] = "JS_NUMBER"] = "JS_NUMBER";
                return values;
            })();

            return FieldOptions;
        })();

        protobuf.OneofOptions = (function() {

            /**
             * Properties of an OneofOptions.
             * @memberof google.protobuf
             * @interface IOneofOptions
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] OneofOptions uninterpretedOption
             */

            /**
             * Constructs a new OneofOptions.
             * @memberof google.protobuf
             * @classdesc Represents an OneofOptions.
             * @implements IOneofOptions
             * @constructor
             * @param {google.protobuf.IOneofOptions=} [properties] Properties to set
             */
            function OneofOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OneofOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.OneofOptions
             * @instance
             */
            OneofOptions.prototype.uninterpretedOption = $util.emptyArray;

            return OneofOptions;
        })();

        protobuf.EnumOptions = (function() {

            /**
             * Properties of an EnumOptions.
             * @memberof google.protobuf
             * @interface IEnumOptions
             * @property {boolean|null} [allowAlias] EnumOptions allowAlias
             * @property {boolean|null} [deprecated] EnumOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumOptions uninterpretedOption
             */

            /**
             * Constructs a new EnumOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumOptions.
             * @implements IEnumOptions
             * @constructor
             * @param {google.protobuf.IEnumOptions=} [properties] Properties to set
             */
            function EnumOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumOptions allowAlias.
             * @member {boolean} allowAlias
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.allowAlias = false;

            /**
             * EnumOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.deprecated = false;

            /**
             * EnumOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.uninterpretedOption = $util.emptyArray;

            return EnumOptions;
        })();

        protobuf.EnumValueOptions = (function() {

            /**
             * Properties of an EnumValueOptions.
             * @memberof google.protobuf
             * @interface IEnumValueOptions
             * @property {boolean|null} [deprecated] EnumValueOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumValueOptions uninterpretedOption
             */

            /**
             * Constructs a new EnumValueOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueOptions.
             * @implements IEnumValueOptions
             * @constructor
             * @param {google.protobuf.IEnumValueOptions=} [properties] Properties to set
             */
            function EnumValueOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumValueOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */
            EnumValueOptions.prototype.deprecated = false;

            /**
             * EnumValueOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */
            EnumValueOptions.prototype.uninterpretedOption = $util.emptyArray;

            return EnumValueOptions;
        })();

        protobuf.ServiceOptions = (function() {

            /**
             * Properties of a ServiceOptions.
             * @memberof google.protobuf
             * @interface IServiceOptions
             * @property {boolean|null} [deprecated] ServiceOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] ServiceOptions uninterpretedOption
             * @property {string|null} [".google.api.defaultHost"] ServiceOptions .google.api.defaultHost
             * @property {string|null} [".google.api.oauthScopes"] ServiceOptions .google.api.oauthScopes
             */

            /**
             * Constructs a new ServiceOptions.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceOptions.
             * @implements IServiceOptions
             * @constructor
             * @param {google.protobuf.IServiceOptions=} [properties] Properties to set
             */
            function ServiceOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype.deprecated = false;

            /**
             * ServiceOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * ServiceOptions .google.api.defaultHost.
             * @member {string} .google.api.defaultHost
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype[".google.api.defaultHost"] = "";

            /**
             * ServiceOptions .google.api.oauthScopes.
             * @member {string} .google.api.oauthScopes
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype[".google.api.oauthScopes"] = "";

            return ServiceOptions;
        })();

        protobuf.MethodOptions = (function() {

            /**
             * Properties of a MethodOptions.
             * @memberof google.protobuf
             * @interface IMethodOptions
             * @property {boolean|null} [deprecated] MethodOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MethodOptions uninterpretedOption
             * @property {google.api.IHttpRule|null} [".google.api.http"] MethodOptions .google.api.http
             * @property {Array.<string>|null} [".google.api.methodSignature"] MethodOptions .google.api.methodSignature
             * @property {google.longrunning.IOperationInfo|null} [".google.longrunning.operationInfo"] MethodOptions .google.longrunning.operationInfo
             */

            /**
             * Constructs a new MethodOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MethodOptions.
             * @implements IMethodOptions
             * @constructor
             * @param {google.protobuf.IMethodOptions=} [properties] Properties to set
             */
            function MethodOptions(properties) {
                this.uninterpretedOption = [];
                this[".google.api.methodSignature"] = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MethodOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype.deprecated = false;

            /**
             * MethodOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * MethodOptions .google.api.http.
             * @member {google.api.IHttpRule|null|undefined} .google.api.http
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".google.api.http"] = null;

            /**
             * MethodOptions .google.api.methodSignature.
             * @member {Array.<string>} .google.api.methodSignature
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".google.api.methodSignature"] = $util.emptyArray;

            /**
             * MethodOptions .google.longrunning.operationInfo.
             * @member {google.longrunning.IOperationInfo|null|undefined} .google.longrunning.operationInfo
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".google.longrunning.operationInfo"] = null;

            return MethodOptions;
        })();

        protobuf.UninterpretedOption = (function() {

            /**
             * Properties of an UninterpretedOption.
             * @memberof google.protobuf
             * @interface IUninterpretedOption
             * @property {Array.<google.protobuf.UninterpretedOption.INamePart>|null} [name] UninterpretedOption name
             * @property {string|null} [identifierValue] UninterpretedOption identifierValue
             * @property {number|null} [positiveIntValue] UninterpretedOption positiveIntValue
             * @property {number|null} [negativeIntValue] UninterpretedOption negativeIntValue
             * @property {number|null} [doubleValue] UninterpretedOption doubleValue
             * @property {Uint8Array|null} [stringValue] UninterpretedOption stringValue
             * @property {string|null} [aggregateValue] UninterpretedOption aggregateValue
             */

            /**
             * Constructs a new UninterpretedOption.
             * @memberof google.protobuf
             * @classdesc Represents an UninterpretedOption.
             * @implements IUninterpretedOption
             * @constructor
             * @param {google.protobuf.IUninterpretedOption=} [properties] Properties to set
             */
            function UninterpretedOption(properties) {
                this.name = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UninterpretedOption name.
             * @member {Array.<google.protobuf.UninterpretedOption.INamePart>} name
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.name = $util.emptyArray;

            /**
             * UninterpretedOption identifierValue.
             * @member {string} identifierValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.identifierValue = "";

            /**
             * UninterpretedOption positiveIntValue.
             * @member {number} positiveIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.positiveIntValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * UninterpretedOption negativeIntValue.
             * @member {number} negativeIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.negativeIntValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UninterpretedOption doubleValue.
             * @member {number} doubleValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.doubleValue = 0;

            /**
             * UninterpretedOption stringValue.
             * @member {Uint8Array} stringValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.stringValue = $util.newBuffer([]);

            /**
             * UninterpretedOption aggregateValue.
             * @member {string} aggregateValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.aggregateValue = "";

            UninterpretedOption.NamePart = (function() {

                /**
                 * Properties of a NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @interface INamePart
                 * @property {string} namePart NamePart namePart
                 * @property {boolean} isExtension NamePart isExtension
                 */

                /**
                 * Constructs a new NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @classdesc Represents a NamePart.
                 * @implements INamePart
                 * @constructor
                 * @param {google.protobuf.UninterpretedOption.INamePart=} [properties] Properties to set
                 */
                function NamePart(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * NamePart namePart.
                 * @member {string} namePart
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */
                NamePart.prototype.namePart = "";

                /**
                 * NamePart isExtension.
                 * @member {boolean} isExtension
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */
                NamePart.prototype.isExtension = false;

                return NamePart;
            })();

            return UninterpretedOption;
        })();

        protobuf.SourceCodeInfo = (function() {

            /**
             * Properties of a SourceCodeInfo.
             * @memberof google.protobuf
             * @interface ISourceCodeInfo
             * @property {Array.<google.protobuf.SourceCodeInfo.ILocation>|null} [location] SourceCodeInfo location
             */

            /**
             * Constructs a new SourceCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a SourceCodeInfo.
             * @implements ISourceCodeInfo
             * @constructor
             * @param {google.protobuf.ISourceCodeInfo=} [properties] Properties to set
             */
            function SourceCodeInfo(properties) {
                this.location = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SourceCodeInfo location.
             * @member {Array.<google.protobuf.SourceCodeInfo.ILocation>} location
             * @memberof google.protobuf.SourceCodeInfo
             * @instance
             */
            SourceCodeInfo.prototype.location = $util.emptyArray;

            SourceCodeInfo.Location = (function() {

                /**
                 * Properties of a Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @interface ILocation
                 * @property {Array.<number>|null} [path] Location path
                 * @property {Array.<number>|null} [span] Location span
                 * @property {string|null} [leadingComments] Location leadingComments
                 * @property {string|null} [trailingComments] Location trailingComments
                 * @property {Array.<string>|null} [leadingDetachedComments] Location leadingDetachedComments
                 */

                /**
                 * Constructs a new Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @classdesc Represents a Location.
                 * @implements ILocation
                 * @constructor
                 * @param {google.protobuf.SourceCodeInfo.ILocation=} [properties] Properties to set
                 */
                function Location(properties) {
                    this.path = [];
                    this.span = [];
                    this.leadingDetachedComments = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Location path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.path = $util.emptyArray;

                /**
                 * Location span.
                 * @member {Array.<number>} span
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.span = $util.emptyArray;

                /**
                 * Location leadingComments.
                 * @member {string} leadingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.leadingComments = "";

                /**
                 * Location trailingComments.
                 * @member {string} trailingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.trailingComments = "";

                /**
                 * Location leadingDetachedComments.
                 * @member {Array.<string>} leadingDetachedComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.leadingDetachedComments = $util.emptyArray;

                return Location;
            })();

            return SourceCodeInfo;
        })();

        protobuf.GeneratedCodeInfo = (function() {

            /**
             * Properties of a GeneratedCodeInfo.
             * @memberof google.protobuf
             * @interface IGeneratedCodeInfo
             * @property {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>|null} [annotation] GeneratedCodeInfo annotation
             */

            /**
             * Constructs a new GeneratedCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a GeneratedCodeInfo.
             * @implements IGeneratedCodeInfo
             * @constructor
             * @param {google.protobuf.IGeneratedCodeInfo=} [properties] Properties to set
             */
            function GeneratedCodeInfo(properties) {
                this.annotation = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GeneratedCodeInfo annotation.
             * @member {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>} annotation
             * @memberof google.protobuf.GeneratedCodeInfo
             * @instance
             */
            GeneratedCodeInfo.prototype.annotation = $util.emptyArray;

            GeneratedCodeInfo.Annotation = (function() {

                /**
                 * Properties of an Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @interface IAnnotation
                 * @property {Array.<number>|null} [path] Annotation path
                 * @property {string|null} [sourceFile] Annotation sourceFile
                 * @property {number|null} [begin] Annotation begin
                 * @property {number|null} [end] Annotation end
                 */

                /**
                 * Constructs a new Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @classdesc Represents an Annotation.
                 * @implements IAnnotation
                 * @constructor
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation=} [properties] Properties to set
                 */
                function Annotation(properties) {
                    this.path = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Annotation path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.path = $util.emptyArray;

                /**
                 * Annotation sourceFile.
                 * @member {string} sourceFile
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.sourceFile = "";

                /**
                 * Annotation begin.
                 * @member {number} begin
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.begin = 0;

                /**
                 * Annotation end.
                 * @member {number} end
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.end = 0;

                return Annotation;
            })();

            return GeneratedCodeInfo;
        })();

        protobuf.Struct = (function() {

            /**
             * Properties of a Struct.
             * @memberof google.protobuf
             * @interface IStruct
             * @property {Object.<string,google.protobuf.IValue>|null} [fields] Struct fields
             */

            /**
             * Constructs a new Struct.
             * @memberof google.protobuf
             * @classdesc Represents a Struct.
             * @implements IStruct
             * @constructor
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             */
            function Struct(properties) {
                this.fields = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Struct fields.
             * @member {Object.<string,google.protobuf.IValue>} fields
             * @memberof google.protobuf.Struct
             * @instance
             */
            Struct.prototype.fields = $util.emptyObject;

            return Struct;
        })();

        protobuf.Value = (function() {

            /**
             * Properties of a Value.
             * @memberof google.protobuf
             * @interface IValue
             * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
             * @property {number|null} [numberValue] Value numberValue
             * @property {string|null} [stringValue] Value stringValue
             * @property {boolean|null} [boolValue] Value boolValue
             * @property {google.protobuf.IStruct|null} [structValue] Value structValue
             * @property {google.protobuf.IListValue|null} [listValue] Value listValue
             */

            /**
             * Constructs a new Value.
             * @memberof google.protobuf
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {google.protobuf.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value nullValue.
             * @member {google.protobuf.NullValue} nullValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.nullValue = 0;

            /**
             * Value numberValue.
             * @member {number} numberValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.numberValue = 0;

            /**
             * Value stringValue.
             * @member {string} stringValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.stringValue = "";

            /**
             * Value boolValue.
             * @member {boolean} boolValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.boolValue = false;

            /**
             * Value structValue.
             * @member {google.protobuf.IStruct|null|undefined} structValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.structValue = null;

            /**
             * Value listValue.
             * @member {google.protobuf.IListValue|null|undefined} listValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.listValue = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Value kind.
             * @member {"nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue"|undefined} kind
             * @memberof google.protobuf.Value
             * @instance
             */
            Object.defineProperty(Value.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            return Value;
        })();

        /**
         * NullValue enum.
         * @name google.protobuf.NullValue
         * @enum {number}
         * @property {string} NULL_VALUE=NULL_VALUE NULL_VALUE value
         */
        protobuf.NullValue = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NULL_VALUE"] = "NULL_VALUE";
            return values;
        })();

        protobuf.ListValue = (function() {

            /**
             * Properties of a ListValue.
             * @memberof google.protobuf
             * @interface IListValue
             * @property {Array.<google.protobuf.IValue>|null} [values] ListValue values
             */

            /**
             * Constructs a new ListValue.
             * @memberof google.protobuf
             * @classdesc Represents a ListValue.
             * @implements IListValue
             * @constructor
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             */
            function ListValue(properties) {
                this.values = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListValue values.
             * @member {Array.<google.protobuf.IValue>} values
             * @memberof google.protobuf.ListValue
             * @instance
             */
            ListValue.prototype.values = $util.emptyArray;

            return ListValue;
        })();

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            return Empty;
        })();

        protobuf.DoubleValue = (function() {

            /**
             * Properties of a DoubleValue.
             * @memberof google.protobuf
             * @interface IDoubleValue
             * @property {number|null} [value] DoubleValue value
             */

            /**
             * Constructs a new DoubleValue.
             * @memberof google.protobuf
             * @classdesc Represents a DoubleValue.
             * @implements IDoubleValue
             * @constructor
             * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
             */
            function DoubleValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DoubleValue value.
             * @member {number} value
             * @memberof google.protobuf.DoubleValue
             * @instance
             */
            DoubleValue.prototype.value = 0;

            return DoubleValue;
        })();

        protobuf.FloatValue = (function() {

            /**
             * Properties of a FloatValue.
             * @memberof google.protobuf
             * @interface IFloatValue
             * @property {number|null} [value] FloatValue value
             */

            /**
             * Constructs a new FloatValue.
             * @memberof google.protobuf
             * @classdesc Represents a FloatValue.
             * @implements IFloatValue
             * @constructor
             * @param {google.protobuf.IFloatValue=} [properties] Properties to set
             */
            function FloatValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FloatValue value.
             * @member {number} value
             * @memberof google.protobuf.FloatValue
             * @instance
             */
            FloatValue.prototype.value = 0;

            return FloatValue;
        })();

        protobuf.Int64Value = (function() {

            /**
             * Properties of an Int64Value.
             * @memberof google.protobuf
             * @interface IInt64Value
             * @property {number|null} [value] Int64Value value
             */

            /**
             * Constructs a new Int64Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int64Value.
             * @implements IInt64Value
             * @constructor
             * @param {google.protobuf.IInt64Value=} [properties] Properties to set
             */
            function Int64Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int64Value value.
             * @member {number} value
             * @memberof google.protobuf.Int64Value
             * @instance
             */
            Int64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            return Int64Value;
        })();

        protobuf.UInt64Value = (function() {

            /**
             * Properties of a UInt64Value.
             * @memberof google.protobuf
             * @interface IUInt64Value
             * @property {number|null} [value] UInt64Value value
             */

            /**
             * Constructs a new UInt64Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt64Value.
             * @implements IUInt64Value
             * @constructor
             * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
             */
            function UInt64Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt64Value value.
             * @member {number} value
             * @memberof google.protobuf.UInt64Value
             * @instance
             */
            UInt64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            return UInt64Value;
        })();

        protobuf.Int32Value = (function() {

            /**
             * Properties of an Int32Value.
             * @memberof google.protobuf
             * @interface IInt32Value
             * @property {number|null} [value] Int32Value value
             */

            /**
             * Constructs a new Int32Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int32Value.
             * @implements IInt32Value
             * @constructor
             * @param {google.protobuf.IInt32Value=} [properties] Properties to set
             */
            function Int32Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int32Value value.
             * @member {number} value
             * @memberof google.protobuf.Int32Value
             * @instance
             */
            Int32Value.prototype.value = 0;

            return Int32Value;
        })();

        protobuf.UInt32Value = (function() {

            /**
             * Properties of a UInt32Value.
             * @memberof google.protobuf
             * @interface IUInt32Value
             * @property {number|null} [value] UInt32Value value
             */

            /**
             * Constructs a new UInt32Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt32Value.
             * @implements IUInt32Value
             * @constructor
             * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
             */
            function UInt32Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt32Value value.
             * @member {number} value
             * @memberof google.protobuf.UInt32Value
             * @instance
             */
            UInt32Value.prototype.value = 0;

            return UInt32Value;
        })();

        protobuf.BoolValue = (function() {

            /**
             * Properties of a BoolValue.
             * @memberof google.protobuf
             * @interface IBoolValue
             * @property {boolean|null} [value] BoolValue value
             */

            /**
             * Constructs a new BoolValue.
             * @memberof google.protobuf
             * @classdesc Represents a BoolValue.
             * @implements IBoolValue
             * @constructor
             * @param {google.protobuf.IBoolValue=} [properties] Properties to set
             */
            function BoolValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BoolValue value.
             * @member {boolean} value
             * @memberof google.protobuf.BoolValue
             * @instance
             */
            BoolValue.prototype.value = false;

            return BoolValue;
        })();

        protobuf.StringValue = (function() {

            /**
             * Properties of a StringValue.
             * @memberof google.protobuf
             * @interface IStringValue
             * @property {string|null} [value] StringValue value
             */

            /**
             * Constructs a new StringValue.
             * @memberof google.protobuf
             * @classdesc Represents a StringValue.
             * @implements IStringValue
             * @constructor
             * @param {google.protobuf.IStringValue=} [properties] Properties to set
             */
            function StringValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StringValue value.
             * @member {string} value
             * @memberof google.protobuf.StringValue
             * @instance
             */
            StringValue.prototype.value = "";

            return StringValue;
        })();

        protobuf.BytesValue = (function() {

            /**
             * Properties of a BytesValue.
             * @memberof google.protobuf
             * @interface IBytesValue
             * @property {Uint8Array|null} [value] BytesValue value
             */

            /**
             * Constructs a new BytesValue.
             * @memberof google.protobuf
             * @classdesc Represents a BytesValue.
             * @implements IBytesValue
             * @constructor
             * @param {google.protobuf.IBytesValue=} [properties] Properties to set
             */
            function BytesValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BytesValue value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.BytesValue
             * @instance
             */
            BytesValue.prototype.value = $util.newBuffer([]);

            return BytesValue;
        })();

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            return Any;
        })();

        protobuf.FieldMask = (function() {

            /**
             * Properties of a FieldMask.
             * @memberof google.protobuf
             * @interface IFieldMask
             * @property {Array.<string>|null} [paths] FieldMask paths
             */

            /**
             * Constructs a new FieldMask.
             * @memberof google.protobuf
             * @classdesc Represents a FieldMask.
             * @implements IFieldMask
             * @constructor
             * @param {google.protobuf.IFieldMask=} [properties] Properties to set
             */
            function FieldMask(properties) {
                this.paths = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FieldMask paths.
             * @member {Array.<string>} paths
             * @memberof google.protobuf.FieldMask
             * @instance
             */
            FieldMask.prototype.paths = $util.emptyArray;

            return FieldMask;
        })();

        protobuf.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof google.protobuf
             * @interface IDuration
             * @property {number|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof google.protobuf
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             */
            function Duration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Duration seconds.
             * @member {number} seconds
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            return Duration;
        })();

        return protobuf;
    })();

    google.firestore = (function() {

        /**
         * Namespace firestore.
         * @memberof google
         * @namespace
         */
        var firestore = {};

        firestore.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof google.firestore
             * @namespace
             */
            var v1 = {};

            v1.DocumentMask = (function() {

                /**
                 * Properties of a DocumentMask.
                 * @memberof google.firestore.v1
                 * @interface IDocumentMask
                 * @property {Array.<string>|null} [fieldPaths] DocumentMask fieldPaths
                 */

                /**
                 * Constructs a new DocumentMask.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DocumentMask.
                 * @implements IDocumentMask
                 * @constructor
                 * @param {google.firestore.v1.IDocumentMask=} [properties] Properties to set
                 */
                function DocumentMask(properties) {
                    this.fieldPaths = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DocumentMask fieldPaths.
                 * @member {Array.<string>} fieldPaths
                 * @memberof google.firestore.v1.DocumentMask
                 * @instance
                 */
                DocumentMask.prototype.fieldPaths = $util.emptyArray;

                return DocumentMask;
            })();

            v1.Precondition = (function() {

                /**
                 * Properties of a Precondition.
                 * @memberof google.firestore.v1
                 * @interface IPrecondition
                 * @property {boolean|null} [exists] Precondition exists
                 * @property {google.protobuf.ITimestamp|null} [updateTime] Precondition updateTime
                 */

                /**
                 * Constructs a new Precondition.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Precondition.
                 * @implements IPrecondition
                 * @constructor
                 * @param {google.firestore.v1.IPrecondition=} [properties] Properties to set
                 */
                function Precondition(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Precondition exists.
                 * @member {boolean} exists
                 * @memberof google.firestore.v1.Precondition
                 * @instance
                 */
                Precondition.prototype.exists = false;

                /**
                 * Precondition updateTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} updateTime
                 * @memberof google.firestore.v1.Precondition
                 * @instance
                 */
                Precondition.prototype.updateTime = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Precondition conditionType.
                 * @member {"exists"|"updateTime"|undefined} conditionType
                 * @memberof google.firestore.v1.Precondition
                 * @instance
                 */
                Object.defineProperty(Precondition.prototype, "conditionType", {
                    get: $util.oneOfGetter($oneOfFields = ["exists", "updateTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return Precondition;
            })();

            v1.TransactionOptions = (function() {

                /**
                 * Properties of a TransactionOptions.
                 * @memberof google.firestore.v1
                 * @interface ITransactionOptions
                 * @property {google.firestore.v1.TransactionOptions.IReadOnly|null} [readOnly] TransactionOptions readOnly
                 * @property {google.firestore.v1.TransactionOptions.IReadWrite|null} [readWrite] TransactionOptions readWrite
                 */

                /**
                 * Constructs a new TransactionOptions.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a TransactionOptions.
                 * @implements ITransactionOptions
                 * @constructor
                 * @param {google.firestore.v1.ITransactionOptions=} [properties] Properties to set
                 */
                function TransactionOptions(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TransactionOptions readOnly.
                 * @member {google.firestore.v1.TransactionOptions.IReadOnly|null|undefined} readOnly
                 * @memberof google.firestore.v1.TransactionOptions
                 * @instance
                 */
                TransactionOptions.prototype.readOnly = null;

                /**
                 * TransactionOptions readWrite.
                 * @member {google.firestore.v1.TransactionOptions.IReadWrite|null|undefined} readWrite
                 * @memberof google.firestore.v1.TransactionOptions
                 * @instance
                 */
                TransactionOptions.prototype.readWrite = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * TransactionOptions mode.
                 * @member {"readOnly"|"readWrite"|undefined} mode
                 * @memberof google.firestore.v1.TransactionOptions
                 * @instance
                 */
                Object.defineProperty(TransactionOptions.prototype, "mode", {
                    get: $util.oneOfGetter($oneOfFields = ["readOnly", "readWrite"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                TransactionOptions.ReadWrite = (function() {

                    /**
                     * Properties of a ReadWrite.
                     * @memberof google.firestore.v1.TransactionOptions
                     * @interface IReadWrite
                     * @property {Uint8Array|null} [retryTransaction] ReadWrite retryTransaction
                     */

                    /**
                     * Constructs a new ReadWrite.
                     * @memberof google.firestore.v1.TransactionOptions
                     * @classdesc Represents a ReadWrite.
                     * @implements IReadWrite
                     * @constructor
                     * @param {google.firestore.v1.TransactionOptions.IReadWrite=} [properties] Properties to set
                     */
                    function ReadWrite(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ReadWrite retryTransaction.
                     * @member {Uint8Array} retryTransaction
                     * @memberof google.firestore.v1.TransactionOptions.ReadWrite
                     * @instance
                     */
                    ReadWrite.prototype.retryTransaction = $util.newBuffer([]);

                    return ReadWrite;
                })();

                TransactionOptions.ReadOnly = (function() {

                    /**
                     * Properties of a ReadOnly.
                     * @memberof google.firestore.v1.TransactionOptions
                     * @interface IReadOnly
                     * @property {google.protobuf.ITimestamp|null} [readTime] ReadOnly readTime
                     */

                    /**
                     * Constructs a new ReadOnly.
                     * @memberof google.firestore.v1.TransactionOptions
                     * @classdesc Represents a ReadOnly.
                     * @implements IReadOnly
                     * @constructor
                     * @param {google.firestore.v1.TransactionOptions.IReadOnly=} [properties] Properties to set
                     */
                    function ReadOnly(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ReadOnly readTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} readTime
                     * @memberof google.firestore.v1.TransactionOptions.ReadOnly
                     * @instance
                     */
                    ReadOnly.prototype.readTime = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * ReadOnly consistencySelector.
                     * @member {"readTime"|undefined} consistencySelector
                     * @memberof google.firestore.v1.TransactionOptions.ReadOnly
                     * @instance
                     */
                    Object.defineProperty(ReadOnly.prototype, "consistencySelector", {
                        get: $util.oneOfGetter($oneOfFields = ["readTime"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    return ReadOnly;
                })();

                return TransactionOptions;
            })();

            v1.Document = (function() {

                /**
                 * Properties of a Document.
                 * @memberof google.firestore.v1
                 * @interface IDocument
                 * @property {string|null} [name] Document name
                 * @property {Object.<string,google.firestore.v1.IValue>|null} [fields] Document fields
                 * @property {google.protobuf.ITimestamp|null} [createTime] Document createTime
                 * @property {google.protobuf.ITimestamp|null} [updateTime] Document updateTime
                 */

                /**
                 * Constructs a new Document.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Document.
                 * @implements IDocument
                 * @constructor
                 * @param {google.firestore.v1.IDocument=} [properties] Properties to set
                 */
                function Document(properties) {
                    this.fields = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Document name.
                 * @member {string} name
                 * @memberof google.firestore.v1.Document
                 * @instance
                 */
                Document.prototype.name = "";

                /**
                 * Document fields.
                 * @member {Object.<string,google.firestore.v1.IValue>} fields
                 * @memberof google.firestore.v1.Document
                 * @instance
                 */
                Document.prototype.fields = $util.emptyObject;

                /**
                 * Document createTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} createTime
                 * @memberof google.firestore.v1.Document
                 * @instance
                 */
                Document.prototype.createTime = null;

                /**
                 * Document updateTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} updateTime
                 * @memberof google.firestore.v1.Document
                 * @instance
                 */
                Document.prototype.updateTime = null;

                return Document;
            })();

            v1.Value = (function() {

                /**
                 * Properties of a Value.
                 * @memberof google.firestore.v1
                 * @interface IValue
                 * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
                 * @property {boolean|null} [booleanValue] Value booleanValue
                 * @property {number|null} [integerValue] Value integerValue
                 * @property {number|null} [doubleValue] Value doubleValue
                 * @property {google.protobuf.ITimestamp|null} [timestampValue] Value timestampValue
                 * @property {string|null} [stringValue] Value stringValue
                 * @property {Uint8Array|null} [bytesValue] Value bytesValue
                 * @property {string|null} [referenceValue] Value referenceValue
                 * @property {google.type.ILatLng|null} [geoPointValue] Value geoPointValue
                 * @property {google.firestore.v1.IArrayValue|null} [arrayValue] Value arrayValue
                 * @property {google.firestore.v1.IMapValue|null} [mapValue] Value mapValue
                 */

                /**
                 * Constructs a new Value.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Value.
                 * @implements IValue
                 * @constructor
                 * @param {google.firestore.v1.IValue=} [properties] Properties to set
                 */
                function Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Value nullValue.
                 * @member {google.protobuf.NullValue} nullValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.nullValue = 0;

                /**
                 * Value booleanValue.
                 * @member {boolean} booleanValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.booleanValue = false;

                /**
                 * Value integerValue.
                 * @member {number} integerValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.integerValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Value doubleValue.
                 * @member {number} doubleValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.doubleValue = 0;

                /**
                 * Value timestampValue.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestampValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.timestampValue = null;

                /**
                 * Value stringValue.
                 * @member {string} stringValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.stringValue = "";

                /**
                 * Value bytesValue.
                 * @member {Uint8Array} bytesValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.bytesValue = $util.newBuffer([]);

                /**
                 * Value referenceValue.
                 * @member {string} referenceValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.referenceValue = "";

                /**
                 * Value geoPointValue.
                 * @member {google.type.ILatLng|null|undefined} geoPointValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.geoPointValue = null;

                /**
                 * Value arrayValue.
                 * @member {google.firestore.v1.IArrayValue|null|undefined} arrayValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.arrayValue = null;

                /**
                 * Value mapValue.
                 * @member {google.firestore.v1.IMapValue|null|undefined} mapValue
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Value.prototype.mapValue = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Value valueType.
                 * @member {"nullValue"|"booleanValue"|"integerValue"|"doubleValue"|"timestampValue"|"stringValue"|"bytesValue"|"referenceValue"|"geoPointValue"|"arrayValue"|"mapValue"|undefined} valueType
                 * @memberof google.firestore.v1.Value
                 * @instance
                 */
                Object.defineProperty(Value.prototype, "valueType", {
                    get: $util.oneOfGetter($oneOfFields = ["nullValue", "booleanValue", "integerValue", "doubleValue", "timestampValue", "stringValue", "bytesValue", "referenceValue", "geoPointValue", "arrayValue", "mapValue"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return Value;
            })();

            v1.ArrayValue = (function() {

                /**
                 * Properties of an ArrayValue.
                 * @memberof google.firestore.v1
                 * @interface IArrayValue
                 * @property {Array.<google.firestore.v1.IValue>|null} [values] ArrayValue values
                 */

                /**
                 * Constructs a new ArrayValue.
                 * @memberof google.firestore.v1
                 * @classdesc Represents an ArrayValue.
                 * @implements IArrayValue
                 * @constructor
                 * @param {google.firestore.v1.IArrayValue=} [properties] Properties to set
                 */
                function ArrayValue(properties) {
                    this.values = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ArrayValue values.
                 * @member {Array.<google.firestore.v1.IValue>} values
                 * @memberof google.firestore.v1.ArrayValue
                 * @instance
                 */
                ArrayValue.prototype.values = $util.emptyArray;

                return ArrayValue;
            })();

            v1.MapValue = (function() {

                /**
                 * Properties of a MapValue.
                 * @memberof google.firestore.v1
                 * @interface IMapValue
                 * @property {Object.<string,google.firestore.v1.IValue>|null} [fields] MapValue fields
                 */

                /**
                 * Constructs a new MapValue.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a MapValue.
                 * @implements IMapValue
                 * @constructor
                 * @param {google.firestore.v1.IMapValue=} [properties] Properties to set
                 */
                function MapValue(properties) {
                    this.fields = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MapValue fields.
                 * @member {Object.<string,google.firestore.v1.IValue>} fields
                 * @memberof google.firestore.v1.MapValue
                 * @instance
                 */
                MapValue.prototype.fields = $util.emptyObject;

                return MapValue;
            })();

            v1.Firestore = (function() {

                /**
                 * Constructs a new Firestore service.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Firestore
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function Firestore(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (Firestore.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Firestore;

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#getDocument}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef GetDocumentCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.Document} [response] Document
                 */

                /**
                 * Calls GetDocument.
                 * @function getDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IGetDocumentRequest} request GetDocumentRequest message or plain object
                 * @param {google.firestore.v1.Firestore.GetDocumentCallback} callback Node-style callback called with the error, if any, and Document
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.getDocument = function getDocument(request, callback) {
                    return this.rpcCall(getDocument, $root.google.firestore.v1.GetDocumentRequest, $root.google.firestore.v1.Document, request, callback);
                }, "name", { value: "GetDocument" });

                /**
                 * Calls GetDocument.
                 * @function getDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IGetDocumentRequest} request GetDocumentRequest message or plain object
                 * @returns {Promise<google.firestore.v1.Document>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#listDocuments}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef ListDocumentsCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.ListDocumentsResponse} [response] ListDocumentsResponse
                 */

                /**
                 * Calls ListDocuments.
                 * @function listDocuments
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListDocumentsRequest} request ListDocumentsRequest message or plain object
                 * @param {google.firestore.v1.Firestore.ListDocumentsCallback} callback Node-style callback called with the error, if any, and ListDocumentsResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.listDocuments = function listDocuments(request, callback) {
                    return this.rpcCall(listDocuments, $root.google.firestore.v1.ListDocumentsRequest, $root.google.firestore.v1.ListDocumentsResponse, request, callback);
                }, "name", { value: "ListDocuments" });

                /**
                 * Calls ListDocuments.
                 * @function listDocuments
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListDocumentsRequest} request ListDocumentsRequest message or plain object
                 * @returns {Promise<google.firestore.v1.ListDocumentsResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#updateDocument}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef UpdateDocumentCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.Document} [response] Document
                 */

                /**
                 * Calls UpdateDocument.
                 * @function updateDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IUpdateDocumentRequest} request UpdateDocumentRequest message or plain object
                 * @param {google.firestore.v1.Firestore.UpdateDocumentCallback} callback Node-style callback called with the error, if any, and Document
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.updateDocument = function updateDocument(request, callback) {
                    return this.rpcCall(updateDocument, $root.google.firestore.v1.UpdateDocumentRequest, $root.google.firestore.v1.Document, request, callback);
                }, "name", { value: "UpdateDocument" });

                /**
                 * Calls UpdateDocument.
                 * @function updateDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IUpdateDocumentRequest} request UpdateDocumentRequest message or plain object
                 * @returns {Promise<google.firestore.v1.Document>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#deleteDocument}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef DeleteDocumentCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.protobuf.Empty} [response] Empty
                 */

                /**
                 * Calls DeleteDocument.
                 * @function deleteDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IDeleteDocumentRequest} request DeleteDocumentRequest message or plain object
                 * @param {google.firestore.v1.Firestore.DeleteDocumentCallback} callback Node-style callback called with the error, if any, and Empty
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.deleteDocument = function deleteDocument(request, callback) {
                    return this.rpcCall(deleteDocument, $root.google.firestore.v1.DeleteDocumentRequest, $root.google.protobuf.Empty, request, callback);
                }, "name", { value: "DeleteDocument" });

                /**
                 * Calls DeleteDocument.
                 * @function deleteDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IDeleteDocumentRequest} request DeleteDocumentRequest message or plain object
                 * @returns {Promise<google.protobuf.Empty>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#batchGetDocuments}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef BatchGetDocumentsCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.BatchGetDocumentsResponse} [response] BatchGetDocumentsResponse
                 */

                /**
                 * Calls BatchGetDocuments.
                 * @function batchGetDocuments
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBatchGetDocumentsRequest} request BatchGetDocumentsRequest message or plain object
                 * @param {google.firestore.v1.Firestore.BatchGetDocumentsCallback} callback Node-style callback called with the error, if any, and BatchGetDocumentsResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.batchGetDocuments = function batchGetDocuments(request, callback) {
                    return this.rpcCall(batchGetDocuments, $root.google.firestore.v1.BatchGetDocumentsRequest, $root.google.firestore.v1.BatchGetDocumentsResponse, request, callback);
                }, "name", { value: "BatchGetDocuments" });

                /**
                 * Calls BatchGetDocuments.
                 * @function batchGetDocuments
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBatchGetDocumentsRequest} request BatchGetDocumentsRequest message or plain object
                 * @returns {Promise<google.firestore.v1.BatchGetDocumentsResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#beginTransaction}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef BeginTransactionCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.BeginTransactionResponse} [response] BeginTransactionResponse
                 */

                /**
                 * Calls BeginTransaction.
                 * @function beginTransaction
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBeginTransactionRequest} request BeginTransactionRequest message or plain object
                 * @param {google.firestore.v1.Firestore.BeginTransactionCallback} callback Node-style callback called with the error, if any, and BeginTransactionResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.beginTransaction = function beginTransaction(request, callback) {
                    return this.rpcCall(beginTransaction, $root.google.firestore.v1.BeginTransactionRequest, $root.google.firestore.v1.BeginTransactionResponse, request, callback);
                }, "name", { value: "BeginTransaction" });

                /**
                 * Calls BeginTransaction.
                 * @function beginTransaction
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBeginTransactionRequest} request BeginTransactionRequest message or plain object
                 * @returns {Promise<google.firestore.v1.BeginTransactionResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#commit}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef CommitCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.CommitResponse} [response] CommitResponse
                 */

                /**
                 * Calls Commit.
                 * @function commit
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.ICommitRequest} request CommitRequest message or plain object
                 * @param {google.firestore.v1.Firestore.CommitCallback} callback Node-style callback called with the error, if any, and CommitResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.commit = function commit(request, callback) {
                    return this.rpcCall(commit, $root.google.firestore.v1.CommitRequest, $root.google.firestore.v1.CommitResponse, request, callback);
                }, "name", { value: "Commit" });

                /**
                 * Calls Commit.
                 * @function commit
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.ICommitRequest} request CommitRequest message or plain object
                 * @returns {Promise<google.firestore.v1.CommitResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#rollback}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef RollbackCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.protobuf.Empty} [response] Empty
                 */

                /**
                 * Calls Rollback.
                 * @function rollback
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IRollbackRequest} request RollbackRequest message or plain object
                 * @param {google.firestore.v1.Firestore.RollbackCallback} callback Node-style callback called with the error, if any, and Empty
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.rollback = function rollback(request, callback) {
                    return this.rpcCall(rollback, $root.google.firestore.v1.RollbackRequest, $root.google.protobuf.Empty, request, callback);
                }, "name", { value: "Rollback" });

                /**
                 * Calls Rollback.
                 * @function rollback
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IRollbackRequest} request RollbackRequest message or plain object
                 * @returns {Promise<google.protobuf.Empty>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#runQuery}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef RunQueryCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.RunQueryResponse} [response] RunQueryResponse
                 */

                /**
                 * Calls RunQuery.
                 * @function runQuery
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IRunQueryRequest} request RunQueryRequest message or plain object
                 * @param {google.firestore.v1.Firestore.RunQueryCallback} callback Node-style callback called with the error, if any, and RunQueryResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.runQuery = function runQuery(request, callback) {
                    return this.rpcCall(runQuery, $root.google.firestore.v1.RunQueryRequest, $root.google.firestore.v1.RunQueryResponse, request, callback);
                }, "name", { value: "RunQuery" });

                /**
                 * Calls RunQuery.
                 * @function runQuery
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IRunQueryRequest} request RunQueryRequest message or plain object
                 * @returns {Promise<google.firestore.v1.RunQueryResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#write}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef WriteCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.WriteResponse} [response] WriteResponse
                 */

                /**
                 * Calls Write.
                 * @function write
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IWriteRequest} request WriteRequest message or plain object
                 * @param {google.firestore.v1.Firestore.WriteCallback} callback Node-style callback called with the error, if any, and WriteResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.write = function write(request, callback) {
                    return this.rpcCall(write, $root.google.firestore.v1.WriteRequest, $root.google.firestore.v1.WriteResponse, request, callback);
                }, "name", { value: "Write" });

                /**
                 * Calls Write.
                 * @function write
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IWriteRequest} request WriteRequest message or plain object
                 * @returns {Promise<google.firestore.v1.WriteResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#listen}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef ListenCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.ListenResponse} [response] ListenResponse
                 */

                /**
                 * Calls Listen.
                 * @function listen
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListenRequest} request ListenRequest message or plain object
                 * @param {google.firestore.v1.Firestore.ListenCallback} callback Node-style callback called with the error, if any, and ListenResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.listen = function listen(request, callback) {
                    return this.rpcCall(listen, $root.google.firestore.v1.ListenRequest, $root.google.firestore.v1.ListenResponse, request, callback);
                }, "name", { value: "Listen" });

                /**
                 * Calls Listen.
                 * @function listen
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListenRequest} request ListenRequest message or plain object
                 * @returns {Promise<google.firestore.v1.ListenResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#listCollectionIds}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef ListCollectionIdsCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.ListCollectionIdsResponse} [response] ListCollectionIdsResponse
                 */

                /**
                 * Calls ListCollectionIds.
                 * @function listCollectionIds
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListCollectionIdsRequest} request ListCollectionIdsRequest message or plain object
                 * @param {google.firestore.v1.Firestore.ListCollectionIdsCallback} callback Node-style callback called with the error, if any, and ListCollectionIdsResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.listCollectionIds = function listCollectionIds(request, callback) {
                    return this.rpcCall(listCollectionIds, $root.google.firestore.v1.ListCollectionIdsRequest, $root.google.firestore.v1.ListCollectionIdsResponse, request, callback);
                }, "name", { value: "ListCollectionIds" });

                /**
                 * Calls ListCollectionIds.
                 * @function listCollectionIds
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IListCollectionIdsRequest} request ListCollectionIdsRequest message or plain object
                 * @returns {Promise<google.firestore.v1.ListCollectionIdsResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link google.firestore.v1.Firestore#batchWrite}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef BatchWriteCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.BatchWriteResponse} [response] BatchWriteResponse
                 */

                /**
                 * Calls BatchWrite.
                 * @function batchWrite
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBatchWriteRequest} request BatchWriteRequest message or plain object
                 * @param {google.firestore.v1.Firestore.BatchWriteCallback} callback Node-style callback called with the error, if any, and BatchWriteResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.batchWrite = function batchWrite(request, callback) {
                    return this.rpcCall(batchWrite, $root.google.firestore.v1.BatchWriteRequest, $root.google.firestore.v1.BatchWriteResponse, request, callback);
                }, "name", { value: "BatchWrite" });

                /**
                 * Calls BatchWrite.
                 * @function batchWrite
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.IBatchWriteRequest} request BatchWriteRequest message or plain object
                 * @returns {Promise<google.firestore.v1.BatchWriteResponse>} Promise
                 * @variation 2
                 */
                
                /*
                 * Callback as used by {@link google.firestore.v1.Firestore#createDocument}.
                 * @memberof google.firestore.v1.Firestore
                 * @typedef CreateDocumentCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.firestore.v1.Document} [response] Document
                 */

                /**
                 * Calls CreateDocument.
                 * @function createDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.ICreateDocumentRequest} request CreateDocumentRequest message or plain object
                 * @param {google.firestore.v1.Firestore.CreateDocumentCallback} callback Node-style callback called with the error, if any, and Document
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Firestore.prototype.createDocument = function createDocument(request, callback) {
                    return this.rpcCall(createDocument, $root.google.firestore.v1.CreateDocumentRequest, $root.google.firestore.v1.Document, request, callback);
                }, "name", { value: "CreateDocument" });

                /**
                 * Calls CreateDocument.
                 * @function createDocument
                 * @memberof google.firestore.v1.Firestore
                 * @instance
                 * @param {google.firestore.v1.ICreateDocumentRequest} request CreateDocumentRequest message or plain object
                 * @returns {Promise<google.firestore.v1.Document>} Promise
                 * @variation 2
                 */

                return Firestore;
            })();

            v1.GetDocumentRequest = (function() {

                /**
                 * Properties of a GetDocumentRequest.
                 * @memberof google.firestore.v1
                 * @interface IGetDocumentRequest
                 * @property {string|null} [name] GetDocumentRequest name
                 * @property {google.firestore.v1.IDocumentMask|null} [mask] GetDocumentRequest mask
                 * @property {Uint8Array|null} [transaction] GetDocumentRequest transaction
                 * @property {google.protobuf.ITimestamp|null} [readTime] GetDocumentRequest readTime
                 */

                /**
                 * Constructs a new GetDocumentRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a GetDocumentRequest.
                 * @implements IGetDocumentRequest
                 * @constructor
                 * @param {google.firestore.v1.IGetDocumentRequest=} [properties] Properties to set
                 */
                function GetDocumentRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetDocumentRequest name.
                 * @member {string} name
                 * @memberof google.firestore.v1.GetDocumentRequest
                 * @instance
                 */
                GetDocumentRequest.prototype.name = "";

                /**
                 * GetDocumentRequest mask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} mask
                 * @memberof google.firestore.v1.GetDocumentRequest
                 * @instance
                 */
                GetDocumentRequest.prototype.mask = null;

                /**
                 * GetDocumentRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.GetDocumentRequest
                 * @instance
                 */
                GetDocumentRequest.prototype.transaction = $util.newBuffer([]);

                /**
                 * GetDocumentRequest readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.GetDocumentRequest
                 * @instance
                 */
                GetDocumentRequest.prototype.readTime = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * GetDocumentRequest consistencySelector.
                 * @member {"transaction"|"readTime"|undefined} consistencySelector
                 * @memberof google.firestore.v1.GetDocumentRequest
                 * @instance
                 */
                Object.defineProperty(GetDocumentRequest.prototype, "consistencySelector", {
                    get: $util.oneOfGetter($oneOfFields = ["transaction", "readTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return GetDocumentRequest;
            })();

            v1.ListDocumentsRequest = (function() {

                /**
                 * Properties of a ListDocumentsRequest.
                 * @memberof google.firestore.v1
                 * @interface IListDocumentsRequest
                 * @property {string|null} [parent] ListDocumentsRequest parent
                 * @property {string|null} [collectionId] ListDocumentsRequest collectionId
                 * @property {number|null} [pageSize] ListDocumentsRequest pageSize
                 * @property {string|null} [pageToken] ListDocumentsRequest pageToken
                 * @property {string|null} [orderBy] ListDocumentsRequest orderBy
                 * @property {google.firestore.v1.IDocumentMask|null} [mask] ListDocumentsRequest mask
                 * @property {Uint8Array|null} [transaction] ListDocumentsRequest transaction
                 * @property {google.protobuf.ITimestamp|null} [readTime] ListDocumentsRequest readTime
                 * @property {boolean|null} [showMissing] ListDocumentsRequest showMissing
                 */

                /**
                 * Constructs a new ListDocumentsRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListDocumentsRequest.
                 * @implements IListDocumentsRequest
                 * @constructor
                 * @param {google.firestore.v1.IListDocumentsRequest=} [properties] Properties to set
                 */
                function ListDocumentsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListDocumentsRequest parent.
                 * @member {string} parent
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.parent = "";

                /**
                 * ListDocumentsRequest collectionId.
                 * @member {string} collectionId
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.collectionId = "";

                /**
                 * ListDocumentsRequest pageSize.
                 * @member {number} pageSize
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.pageSize = 0;

                /**
                 * ListDocumentsRequest pageToken.
                 * @member {string} pageToken
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.pageToken = "";

                /**
                 * ListDocumentsRequest orderBy.
                 * @member {string} orderBy
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.orderBy = "";

                /**
                 * ListDocumentsRequest mask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} mask
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.mask = null;

                /**
                 * ListDocumentsRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.transaction = $util.newBuffer([]);

                /**
                 * ListDocumentsRequest readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.readTime = null;

                /**
                 * ListDocumentsRequest showMissing.
                 * @member {boolean} showMissing
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                ListDocumentsRequest.prototype.showMissing = false;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * ListDocumentsRequest consistencySelector.
                 * @member {"transaction"|"readTime"|undefined} consistencySelector
                 * @memberof google.firestore.v1.ListDocumentsRequest
                 * @instance
                 */
                Object.defineProperty(ListDocumentsRequest.prototype, "consistencySelector", {
                    get: $util.oneOfGetter($oneOfFields = ["transaction", "readTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return ListDocumentsRequest;
            })();

            v1.ListDocumentsResponse = (function() {

                /**
                 * Properties of a ListDocumentsResponse.
                 * @memberof google.firestore.v1
                 * @interface IListDocumentsResponse
                 * @property {Array.<google.firestore.v1.IDocument>|null} [documents] ListDocumentsResponse documents
                 * @property {string|null} [nextPageToken] ListDocumentsResponse nextPageToken
                 */

                /**
                 * Constructs a new ListDocumentsResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListDocumentsResponse.
                 * @implements IListDocumentsResponse
                 * @constructor
                 * @param {google.firestore.v1.IListDocumentsResponse=} [properties] Properties to set
                 */
                function ListDocumentsResponse(properties) {
                    this.documents = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListDocumentsResponse documents.
                 * @member {Array.<google.firestore.v1.IDocument>} documents
                 * @memberof google.firestore.v1.ListDocumentsResponse
                 * @instance
                 */
                ListDocumentsResponse.prototype.documents = $util.emptyArray;

                /**
                 * ListDocumentsResponse nextPageToken.
                 * @member {string} nextPageToken
                 * @memberof google.firestore.v1.ListDocumentsResponse
                 * @instance
                 */
                ListDocumentsResponse.prototype.nextPageToken = "";

                return ListDocumentsResponse;
            })();

            v1.CreateDocumentRequest = (function() {

                /**
                 * Properties of a CreateDocumentRequest.
                 * @memberof google.firestore.v1
                 * @interface ICreateDocumentRequest
                 * @property {string|null} [parent] CreateDocumentRequest parent
                 * @property {string|null} [collectionId] CreateDocumentRequest collectionId
                 * @property {string|null} [documentId] CreateDocumentRequest documentId
                 * @property {google.firestore.v1.IDocument|null} [document] CreateDocumentRequest document
                 * @property {google.firestore.v1.IDocumentMask|null} [mask] CreateDocumentRequest mask
                 */

                /**
                 * Constructs a new CreateDocumentRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a CreateDocumentRequest.
                 * @implements ICreateDocumentRequest
                 * @constructor
                 * @param {google.firestore.v1.ICreateDocumentRequest=} [properties] Properties to set
                 */
                function CreateDocumentRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CreateDocumentRequest parent.
                 * @member {string} parent
                 * @memberof google.firestore.v1.CreateDocumentRequest
                 * @instance
                 */
                CreateDocumentRequest.prototype.parent = "";

                /**
                 * CreateDocumentRequest collectionId.
                 * @member {string} collectionId
                 * @memberof google.firestore.v1.CreateDocumentRequest
                 * @instance
                 */
                CreateDocumentRequest.prototype.collectionId = "";

                /**
                 * CreateDocumentRequest documentId.
                 * @member {string} documentId
                 * @memberof google.firestore.v1.CreateDocumentRequest
                 * @instance
                 */
                CreateDocumentRequest.prototype.documentId = "";

                /**
                 * CreateDocumentRequest document.
                 * @member {google.firestore.v1.IDocument|null|undefined} document
                 * @memberof google.firestore.v1.CreateDocumentRequest
                 * @instance
                 */
                CreateDocumentRequest.prototype.document = null;

                /**
                 * CreateDocumentRequest mask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} mask
                 * @memberof google.firestore.v1.CreateDocumentRequest
                 * @instance
                 */
                CreateDocumentRequest.prototype.mask = null;

                return CreateDocumentRequest;
            })();

            v1.UpdateDocumentRequest = (function() {

                /**
                 * Properties of an UpdateDocumentRequest.
                 * @memberof google.firestore.v1
                 * @interface IUpdateDocumentRequest
                 * @property {google.firestore.v1.IDocument|null} [document] UpdateDocumentRequest document
                 * @property {google.firestore.v1.IDocumentMask|null} [updateMask] UpdateDocumentRequest updateMask
                 * @property {google.firestore.v1.IDocumentMask|null} [mask] UpdateDocumentRequest mask
                 * @property {google.firestore.v1.IPrecondition|null} [currentDocument] UpdateDocumentRequest currentDocument
                 */

                /**
                 * Constructs a new UpdateDocumentRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents an UpdateDocumentRequest.
                 * @implements IUpdateDocumentRequest
                 * @constructor
                 * @param {google.firestore.v1.IUpdateDocumentRequest=} [properties] Properties to set
                 */
                function UpdateDocumentRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * UpdateDocumentRequest document.
                 * @member {google.firestore.v1.IDocument|null|undefined} document
                 * @memberof google.firestore.v1.UpdateDocumentRequest
                 * @instance
                 */
                UpdateDocumentRequest.prototype.document = null;

                /**
                 * UpdateDocumentRequest updateMask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} updateMask
                 * @memberof google.firestore.v1.UpdateDocumentRequest
                 * @instance
                 */
                UpdateDocumentRequest.prototype.updateMask = null;

                /**
                 * UpdateDocumentRequest mask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} mask
                 * @memberof google.firestore.v1.UpdateDocumentRequest
                 * @instance
                 */
                UpdateDocumentRequest.prototype.mask = null;

                /**
                 * UpdateDocumentRequest currentDocument.
                 * @member {google.firestore.v1.IPrecondition|null|undefined} currentDocument
                 * @memberof google.firestore.v1.UpdateDocumentRequest
                 * @instance
                 */
                UpdateDocumentRequest.prototype.currentDocument = null;

                return UpdateDocumentRequest;
            })();

            v1.DeleteDocumentRequest = (function() {

                /**
                 * Properties of a DeleteDocumentRequest.
                 * @memberof google.firestore.v1
                 * @interface IDeleteDocumentRequest
                 * @property {string|null} [name] DeleteDocumentRequest name
                 * @property {google.firestore.v1.IPrecondition|null} [currentDocument] DeleteDocumentRequest currentDocument
                 */

                /**
                 * Constructs a new DeleteDocumentRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DeleteDocumentRequest.
                 * @implements IDeleteDocumentRequest
                 * @constructor
                 * @param {google.firestore.v1.IDeleteDocumentRequest=} [properties] Properties to set
                 */
                function DeleteDocumentRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeleteDocumentRequest name.
                 * @member {string} name
                 * @memberof google.firestore.v1.DeleteDocumentRequest
                 * @instance
                 */
                DeleteDocumentRequest.prototype.name = "";

                /**
                 * DeleteDocumentRequest currentDocument.
                 * @member {google.firestore.v1.IPrecondition|null|undefined} currentDocument
                 * @memberof google.firestore.v1.DeleteDocumentRequest
                 * @instance
                 */
                DeleteDocumentRequest.prototype.currentDocument = null;

                return DeleteDocumentRequest;
            })();

            v1.BatchGetDocumentsRequest = (function() {

                /**
                 * Properties of a BatchGetDocumentsRequest.
                 * @memberof google.firestore.v1
                 * @interface IBatchGetDocumentsRequest
                 * @property {string|null} [database] BatchGetDocumentsRequest database
                 * @property {Array.<string>|null} [documents] BatchGetDocumentsRequest documents
                 * @property {google.firestore.v1.IDocumentMask|null} [mask] BatchGetDocumentsRequest mask
                 * @property {Uint8Array|null} [transaction] BatchGetDocumentsRequest transaction
                 * @property {google.firestore.v1.ITransactionOptions|null} [newTransaction] BatchGetDocumentsRequest newTransaction
                 * @property {google.protobuf.ITimestamp|null} [readTime] BatchGetDocumentsRequest readTime
                 */

                /**
                 * Constructs a new BatchGetDocumentsRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BatchGetDocumentsRequest.
                 * @implements IBatchGetDocumentsRequest
                 * @constructor
                 * @param {google.firestore.v1.IBatchGetDocumentsRequest=} [properties] Properties to set
                 */
                function BatchGetDocumentsRequest(properties) {
                    this.documents = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BatchGetDocumentsRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.database = "";

                /**
                 * BatchGetDocumentsRequest documents.
                 * @member {Array.<string>} documents
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.documents = $util.emptyArray;

                /**
                 * BatchGetDocumentsRequest mask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} mask
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.mask = null;

                /**
                 * BatchGetDocumentsRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.transaction = $util.newBuffer([]);

                /**
                 * BatchGetDocumentsRequest newTransaction.
                 * @member {google.firestore.v1.ITransactionOptions|null|undefined} newTransaction
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.newTransaction = null;

                /**
                 * BatchGetDocumentsRequest readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                BatchGetDocumentsRequest.prototype.readTime = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * BatchGetDocumentsRequest consistencySelector.
                 * @member {"transaction"|"newTransaction"|"readTime"|undefined} consistencySelector
                 * @memberof google.firestore.v1.BatchGetDocumentsRequest
                 * @instance
                 */
                Object.defineProperty(BatchGetDocumentsRequest.prototype, "consistencySelector", {
                    get: $util.oneOfGetter($oneOfFields = ["transaction", "newTransaction", "readTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return BatchGetDocumentsRequest;
            })();

            v1.BatchGetDocumentsResponse = (function() {

                /**
                 * Properties of a BatchGetDocumentsResponse.
                 * @memberof google.firestore.v1
                 * @interface IBatchGetDocumentsResponse
                 * @property {google.firestore.v1.IDocument|null} [found] BatchGetDocumentsResponse found
                 * @property {string|null} [missing] BatchGetDocumentsResponse missing
                 * @property {Uint8Array|null} [transaction] BatchGetDocumentsResponse transaction
                 * @property {google.protobuf.ITimestamp|null} [readTime] BatchGetDocumentsResponse readTime
                 */

                /**
                 * Constructs a new BatchGetDocumentsResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BatchGetDocumentsResponse.
                 * @implements IBatchGetDocumentsResponse
                 * @constructor
                 * @param {google.firestore.v1.IBatchGetDocumentsResponse=} [properties] Properties to set
                 */
                function BatchGetDocumentsResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BatchGetDocumentsResponse found.
                 * @member {google.firestore.v1.IDocument|null|undefined} found
                 * @memberof google.firestore.v1.BatchGetDocumentsResponse
                 * @instance
                 */
                BatchGetDocumentsResponse.prototype.found = null;

                /**
                 * BatchGetDocumentsResponse missing.
                 * @member {string} missing
                 * @memberof google.firestore.v1.BatchGetDocumentsResponse
                 * @instance
                 */
                BatchGetDocumentsResponse.prototype.missing = "";

                /**
                 * BatchGetDocumentsResponse transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.BatchGetDocumentsResponse
                 * @instance
                 */
                BatchGetDocumentsResponse.prototype.transaction = $util.newBuffer([]);

                /**
                 * BatchGetDocumentsResponse readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.BatchGetDocumentsResponse
                 * @instance
                 */
                BatchGetDocumentsResponse.prototype.readTime = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * BatchGetDocumentsResponse result.
                 * @member {"found"|"missing"|undefined} result
                 * @memberof google.firestore.v1.BatchGetDocumentsResponse
                 * @instance
                 */
                Object.defineProperty(BatchGetDocumentsResponse.prototype, "result", {
                    get: $util.oneOfGetter($oneOfFields = ["found", "missing"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return BatchGetDocumentsResponse;
            })();

            v1.BeginTransactionRequest = (function() {

                /**
                 * Properties of a BeginTransactionRequest.
                 * @memberof google.firestore.v1
                 * @interface IBeginTransactionRequest
                 * @property {string|null} [database] BeginTransactionRequest database
                 * @property {google.firestore.v1.ITransactionOptions|null} [options] BeginTransactionRequest options
                 */

                /**
                 * Constructs a new BeginTransactionRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BeginTransactionRequest.
                 * @implements IBeginTransactionRequest
                 * @constructor
                 * @param {google.firestore.v1.IBeginTransactionRequest=} [properties] Properties to set
                 */
                function BeginTransactionRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BeginTransactionRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.BeginTransactionRequest
                 * @instance
                 */
                BeginTransactionRequest.prototype.database = "";

                /**
                 * BeginTransactionRequest options.
                 * @member {google.firestore.v1.ITransactionOptions|null|undefined} options
                 * @memberof google.firestore.v1.BeginTransactionRequest
                 * @instance
                 */
                BeginTransactionRequest.prototype.options = null;

                return BeginTransactionRequest;
            })();

            v1.BeginTransactionResponse = (function() {

                /**
                 * Properties of a BeginTransactionResponse.
                 * @memberof google.firestore.v1
                 * @interface IBeginTransactionResponse
                 * @property {Uint8Array|null} [transaction] BeginTransactionResponse transaction
                 */

                /**
                 * Constructs a new BeginTransactionResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BeginTransactionResponse.
                 * @implements IBeginTransactionResponse
                 * @constructor
                 * @param {google.firestore.v1.IBeginTransactionResponse=} [properties] Properties to set
                 */
                function BeginTransactionResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BeginTransactionResponse transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.BeginTransactionResponse
                 * @instance
                 */
                BeginTransactionResponse.prototype.transaction = $util.newBuffer([]);

                return BeginTransactionResponse;
            })();

            v1.CommitRequest = (function() {

                /**
                 * Properties of a CommitRequest.
                 * @memberof google.firestore.v1
                 * @interface ICommitRequest
                 * @property {string|null} [database] CommitRequest database
                 * @property {Array.<google.firestore.v1.IWrite>|null} [writes] CommitRequest writes
                 * @property {Uint8Array|null} [transaction] CommitRequest transaction
                 */

                /**
                 * Constructs a new CommitRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a CommitRequest.
                 * @implements ICommitRequest
                 * @constructor
                 * @param {google.firestore.v1.ICommitRequest=} [properties] Properties to set
                 */
                function CommitRequest(properties) {
                    this.writes = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommitRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.CommitRequest
                 * @instance
                 */
                CommitRequest.prototype.database = "";

                /**
                 * CommitRequest writes.
                 * @member {Array.<google.firestore.v1.IWrite>} writes
                 * @memberof google.firestore.v1.CommitRequest
                 * @instance
                 */
                CommitRequest.prototype.writes = $util.emptyArray;

                /**
                 * CommitRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.CommitRequest
                 * @instance
                 */
                CommitRequest.prototype.transaction = $util.newBuffer([]);

                return CommitRequest;
            })();

            v1.CommitResponse = (function() {

                /**
                 * Properties of a CommitResponse.
                 * @memberof google.firestore.v1
                 * @interface ICommitResponse
                 * @property {Array.<google.firestore.v1.IWriteResult>|null} [writeResults] CommitResponse writeResults
                 * @property {google.protobuf.ITimestamp|null} [commitTime] CommitResponse commitTime
                 */

                /**
                 * Constructs a new CommitResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a CommitResponse.
                 * @implements ICommitResponse
                 * @constructor
                 * @param {google.firestore.v1.ICommitResponse=} [properties] Properties to set
                 */
                function CommitResponse(properties) {
                    this.writeResults = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommitResponse writeResults.
                 * @member {Array.<google.firestore.v1.IWriteResult>} writeResults
                 * @memberof google.firestore.v1.CommitResponse
                 * @instance
                 */
                CommitResponse.prototype.writeResults = $util.emptyArray;

                /**
                 * CommitResponse commitTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} commitTime
                 * @memberof google.firestore.v1.CommitResponse
                 * @instance
                 */
                CommitResponse.prototype.commitTime = null;

                return CommitResponse;
            })();

            v1.RollbackRequest = (function() {

                /**
                 * Properties of a RollbackRequest.
                 * @memberof google.firestore.v1
                 * @interface IRollbackRequest
                 * @property {string|null} [database] RollbackRequest database
                 * @property {Uint8Array|null} [transaction] RollbackRequest transaction
                 */

                /**
                 * Constructs a new RollbackRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a RollbackRequest.
                 * @implements IRollbackRequest
                 * @constructor
                 * @param {google.firestore.v1.IRollbackRequest=} [properties] Properties to set
                 */
                function RollbackRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RollbackRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.RollbackRequest
                 * @instance
                 */
                RollbackRequest.prototype.database = "";

                /**
                 * RollbackRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.RollbackRequest
                 * @instance
                 */
                RollbackRequest.prototype.transaction = $util.newBuffer([]);

                return RollbackRequest;
            })();

            v1.RunQueryRequest = (function() {

                /**
                 * Properties of a RunQueryRequest.
                 * @memberof google.firestore.v1
                 * @interface IRunQueryRequest
                 * @property {string|null} [parent] RunQueryRequest parent
                 * @property {google.firestore.v1.IStructuredQuery|null} [structuredQuery] RunQueryRequest structuredQuery
                 * @property {Uint8Array|null} [transaction] RunQueryRequest transaction
                 * @property {google.firestore.v1.ITransactionOptions|null} [newTransaction] RunQueryRequest newTransaction
                 * @property {google.protobuf.ITimestamp|null} [readTime] RunQueryRequest readTime
                 */

                /**
                 * Constructs a new RunQueryRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a RunQueryRequest.
                 * @implements IRunQueryRequest
                 * @constructor
                 * @param {google.firestore.v1.IRunQueryRequest=} [properties] Properties to set
                 */
                function RunQueryRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RunQueryRequest parent.
                 * @member {string} parent
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                RunQueryRequest.prototype.parent = "";

                /**
                 * RunQueryRequest structuredQuery.
                 * @member {google.firestore.v1.IStructuredQuery|null|undefined} structuredQuery
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                RunQueryRequest.prototype.structuredQuery = null;

                /**
                 * RunQueryRequest transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                RunQueryRequest.prototype.transaction = $util.newBuffer([]);

                /**
                 * RunQueryRequest newTransaction.
                 * @member {google.firestore.v1.ITransactionOptions|null|undefined} newTransaction
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                RunQueryRequest.prototype.newTransaction = null;

                /**
                 * RunQueryRequest readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                RunQueryRequest.prototype.readTime = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * RunQueryRequest queryType.
                 * @member {"structuredQuery"|undefined} queryType
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                Object.defineProperty(RunQueryRequest.prototype, "queryType", {
                    get: $util.oneOfGetter($oneOfFields = ["structuredQuery"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * RunQueryRequest consistencySelector.
                 * @member {"transaction"|"newTransaction"|"readTime"|undefined} consistencySelector
                 * @memberof google.firestore.v1.RunQueryRequest
                 * @instance
                 */
                Object.defineProperty(RunQueryRequest.prototype, "consistencySelector", {
                    get: $util.oneOfGetter($oneOfFields = ["transaction", "newTransaction", "readTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return RunQueryRequest;
            })();

            v1.RunQueryResponse = (function() {

                /**
                 * Properties of a RunQueryResponse.
                 * @memberof google.firestore.v1
                 * @interface IRunQueryResponse
                 * @property {Uint8Array|null} [transaction] RunQueryResponse transaction
                 * @property {google.firestore.v1.IDocument|null} [document] RunQueryResponse document
                 * @property {google.protobuf.ITimestamp|null} [readTime] RunQueryResponse readTime
                 * @property {number|null} [skippedResults] RunQueryResponse skippedResults
                 */

                /**
                 * Constructs a new RunQueryResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a RunQueryResponse.
                 * @implements IRunQueryResponse
                 * @constructor
                 * @param {google.firestore.v1.IRunQueryResponse=} [properties] Properties to set
                 */
                function RunQueryResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RunQueryResponse transaction.
                 * @member {Uint8Array} transaction
                 * @memberof google.firestore.v1.RunQueryResponse
                 * @instance
                 */
                RunQueryResponse.prototype.transaction = $util.newBuffer([]);

                /**
                 * RunQueryResponse document.
                 * @member {google.firestore.v1.IDocument|null|undefined} document
                 * @memberof google.firestore.v1.RunQueryResponse
                 * @instance
                 */
                RunQueryResponse.prototype.document = null;

                /**
                 * RunQueryResponse readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.RunQueryResponse
                 * @instance
                 */
                RunQueryResponse.prototype.readTime = null;

                /**
                 * RunQueryResponse skippedResults.
                 * @member {number} skippedResults
                 * @memberof google.firestore.v1.RunQueryResponse
                 * @instance
                 */
                RunQueryResponse.prototype.skippedResults = 0;

                return RunQueryResponse;
            })();

            v1.WriteRequest = (function() {

                /**
                 * Properties of a WriteRequest.
                 * @memberof google.firestore.v1
                 * @interface IWriteRequest
                 * @property {string|null} [database] WriteRequest database
                 * @property {string|null} [streamId] WriteRequest streamId
                 * @property {Array.<google.firestore.v1.IWrite>|null} [writes] WriteRequest writes
                 * @property {Uint8Array|null} [streamToken] WriteRequest streamToken
                 * @property {Object.<string,string>|null} [labels] WriteRequest labels
                 */

                /**
                 * Constructs a new WriteRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a WriteRequest.
                 * @implements IWriteRequest
                 * @constructor
                 * @param {google.firestore.v1.IWriteRequest=} [properties] Properties to set
                 */
                function WriteRequest(properties) {
                    this.writes = [];
                    this.labels = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WriteRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.WriteRequest
                 * @instance
                 */
                WriteRequest.prototype.database = "";

                /**
                 * WriteRequest streamId.
                 * @member {string} streamId
                 * @memberof google.firestore.v1.WriteRequest
                 * @instance
                 */
                WriteRequest.prototype.streamId = "";

                /**
                 * WriteRequest writes.
                 * @member {Array.<google.firestore.v1.IWrite>} writes
                 * @memberof google.firestore.v1.WriteRequest
                 * @instance
                 */
                WriteRequest.prototype.writes = $util.emptyArray;

                /**
                 * WriteRequest streamToken.
                 * @member {Uint8Array} streamToken
                 * @memberof google.firestore.v1.WriteRequest
                 * @instance
                 */
                WriteRequest.prototype.streamToken = $util.newBuffer([]);

                /**
                 * WriteRequest labels.
                 * @member {Object.<string,string>} labels
                 * @memberof google.firestore.v1.WriteRequest
                 * @instance
                 */
                WriteRequest.prototype.labels = $util.emptyObject;

                return WriteRequest;
            })();

            v1.WriteResponse = (function() {

                /**
                 * Properties of a WriteResponse.
                 * @memberof google.firestore.v1
                 * @interface IWriteResponse
                 * @property {string|null} [streamId] WriteResponse streamId
                 * @property {Uint8Array|null} [streamToken] WriteResponse streamToken
                 * @property {Array.<google.firestore.v1.IWriteResult>|null} [writeResults] WriteResponse writeResults
                 * @property {google.protobuf.ITimestamp|null} [commitTime] WriteResponse commitTime
                 */

                /**
                 * Constructs a new WriteResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a WriteResponse.
                 * @implements IWriteResponse
                 * @constructor
                 * @param {google.firestore.v1.IWriteResponse=} [properties] Properties to set
                 */
                function WriteResponse(properties) {
                    this.writeResults = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WriteResponse streamId.
                 * @member {string} streamId
                 * @memberof google.firestore.v1.WriteResponse
                 * @instance
                 */
                WriteResponse.prototype.streamId = "";

                /**
                 * WriteResponse streamToken.
                 * @member {Uint8Array} streamToken
                 * @memberof google.firestore.v1.WriteResponse
                 * @instance
                 */
                WriteResponse.prototype.streamToken = $util.newBuffer([]);

                /**
                 * WriteResponse writeResults.
                 * @member {Array.<google.firestore.v1.IWriteResult>} writeResults
                 * @memberof google.firestore.v1.WriteResponse
                 * @instance
                 */
                WriteResponse.prototype.writeResults = $util.emptyArray;

                /**
                 * WriteResponse commitTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} commitTime
                 * @memberof google.firestore.v1.WriteResponse
                 * @instance
                 */
                WriteResponse.prototype.commitTime = null;

                return WriteResponse;
            })();

            v1.ListenRequest = (function() {

                /**
                 * Properties of a ListenRequest.
                 * @memberof google.firestore.v1
                 * @interface IListenRequest
                 * @property {string|null} [database] ListenRequest database
                 * @property {google.firestore.v1.ITarget|null} [addTarget] ListenRequest addTarget
                 * @property {number|null} [removeTarget] ListenRequest removeTarget
                 * @property {Object.<string,string>|null} [labels] ListenRequest labels
                 */

                /**
                 * Constructs a new ListenRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListenRequest.
                 * @implements IListenRequest
                 * @constructor
                 * @param {google.firestore.v1.IListenRequest=} [properties] Properties to set
                 */
                function ListenRequest(properties) {
                    this.labels = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListenRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.ListenRequest
                 * @instance
                 */
                ListenRequest.prototype.database = "";

                /**
                 * ListenRequest addTarget.
                 * @member {google.firestore.v1.ITarget|null|undefined} addTarget
                 * @memberof google.firestore.v1.ListenRequest
                 * @instance
                 */
                ListenRequest.prototype.addTarget = null;

                /**
                 * ListenRequest removeTarget.
                 * @member {number} removeTarget
                 * @memberof google.firestore.v1.ListenRequest
                 * @instance
                 */
                ListenRequest.prototype.removeTarget = 0;

                /**
                 * ListenRequest labels.
                 * @member {Object.<string,string>} labels
                 * @memberof google.firestore.v1.ListenRequest
                 * @instance
                 */
                ListenRequest.prototype.labels = $util.emptyObject;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * ListenRequest targetChange.
                 * @member {"addTarget"|"removeTarget"|undefined} targetChange
                 * @memberof google.firestore.v1.ListenRequest
                 * @instance
                 */
                Object.defineProperty(ListenRequest.prototype, "targetChange", {
                    get: $util.oneOfGetter($oneOfFields = ["addTarget", "removeTarget"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return ListenRequest;
            })();

            v1.ListenResponse = (function() {

                /**
                 * Properties of a ListenResponse.
                 * @memberof google.firestore.v1
                 * @interface IListenResponse
                 * @property {google.firestore.v1.ITargetChange|null} [targetChange] ListenResponse targetChange
                 * @property {google.firestore.v1.IDocumentChange|null} [documentChange] ListenResponse documentChange
                 * @property {google.firestore.v1.IDocumentDelete|null} [documentDelete] ListenResponse documentDelete
                 * @property {google.firestore.v1.IDocumentRemove|null} [documentRemove] ListenResponse documentRemove
                 * @property {google.firestore.v1.IExistenceFilter|null} [filter] ListenResponse filter
                 */

                /**
                 * Constructs a new ListenResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListenResponse.
                 * @implements IListenResponse
                 * @constructor
                 * @param {google.firestore.v1.IListenResponse=} [properties] Properties to set
                 */
                function ListenResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListenResponse targetChange.
                 * @member {google.firestore.v1.ITargetChange|null|undefined} targetChange
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                ListenResponse.prototype.targetChange = null;

                /**
                 * ListenResponse documentChange.
                 * @member {google.firestore.v1.IDocumentChange|null|undefined} documentChange
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                ListenResponse.prototype.documentChange = null;

                /**
                 * ListenResponse documentDelete.
                 * @member {google.firestore.v1.IDocumentDelete|null|undefined} documentDelete
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                ListenResponse.prototype.documentDelete = null;

                /**
                 * ListenResponse documentRemove.
                 * @member {google.firestore.v1.IDocumentRemove|null|undefined} documentRemove
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                ListenResponse.prototype.documentRemove = null;

                /**
                 * ListenResponse filter.
                 * @member {google.firestore.v1.IExistenceFilter|null|undefined} filter
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                ListenResponse.prototype.filter = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * ListenResponse responseType.
                 * @member {"targetChange"|"documentChange"|"documentDelete"|"documentRemove"|"filter"|undefined} responseType
                 * @memberof google.firestore.v1.ListenResponse
                 * @instance
                 */
                Object.defineProperty(ListenResponse.prototype, "responseType", {
                    get: $util.oneOfGetter($oneOfFields = ["targetChange", "documentChange", "documentDelete", "documentRemove", "filter"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return ListenResponse;
            })();

            v1.Target = (function() {

                /**
                 * Properties of a Target.
                 * @memberof google.firestore.v1
                 * @interface ITarget
                 * @property {google.firestore.v1.Target.IQueryTarget|null} [query] Target query
                 * @property {google.firestore.v1.Target.IDocumentsTarget|null} [documents] Target documents
                 * @property {Uint8Array|null} [resumeToken] Target resumeToken
                 * @property {google.protobuf.ITimestamp|null} [readTime] Target readTime
                 * @property {number|null} [targetId] Target targetId
                 * @property {boolean|null} [once] Target once
                 */

                /**
                 * Constructs a new Target.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Target.
                 * @implements ITarget
                 * @constructor
                 * @param {google.firestore.v1.ITarget=} [properties] Properties to set
                 */
                function Target(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Target query.
                 * @member {google.firestore.v1.Target.IQueryTarget|null|undefined} query
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.query = null;

                /**
                 * Target documents.
                 * @member {google.firestore.v1.Target.IDocumentsTarget|null|undefined} documents
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.documents = null;

                /**
                 * Target resumeToken.
                 * @member {Uint8Array} resumeToken
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.resumeToken = $util.newBuffer([]);

                /**
                 * Target readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.readTime = null;

                /**
                 * Target targetId.
                 * @member {number} targetId
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.targetId = 0;

                /**
                 * Target once.
                 * @member {boolean} once
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Target.prototype.once = false;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Target targetType.
                 * @member {"query"|"documents"|undefined} targetType
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Object.defineProperty(Target.prototype, "targetType", {
                    get: $util.oneOfGetter($oneOfFields = ["query", "documents"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Target resumeType.
                 * @member {"resumeToken"|"readTime"|undefined} resumeType
                 * @memberof google.firestore.v1.Target
                 * @instance
                 */
                Object.defineProperty(Target.prototype, "resumeType", {
                    get: $util.oneOfGetter($oneOfFields = ["resumeToken", "readTime"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                Target.DocumentsTarget = (function() {

                    /**
                     * Properties of a DocumentsTarget.
                     * @memberof google.firestore.v1.Target
                     * @interface IDocumentsTarget
                     * @property {Array.<string>|null} [documents] DocumentsTarget documents
                     */

                    /**
                     * Constructs a new DocumentsTarget.
                     * @memberof google.firestore.v1.Target
                     * @classdesc Represents a DocumentsTarget.
                     * @implements IDocumentsTarget
                     * @constructor
                     * @param {google.firestore.v1.Target.IDocumentsTarget=} [properties] Properties to set
                     */
                    function DocumentsTarget(properties) {
                        this.documents = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * DocumentsTarget documents.
                     * @member {Array.<string>} documents
                     * @memberof google.firestore.v1.Target.DocumentsTarget
                     * @instance
                     */
                    DocumentsTarget.prototype.documents = $util.emptyArray;

                    return DocumentsTarget;
                })();

                Target.QueryTarget = (function() {

                    /**
                     * Properties of a QueryTarget.
                     * @memberof google.firestore.v1.Target
                     * @interface IQueryTarget
                     * @property {string|null} [parent] QueryTarget parent
                     * @property {google.firestore.v1.IStructuredQuery|null} [structuredQuery] QueryTarget structuredQuery
                     */

                    /**
                     * Constructs a new QueryTarget.
                     * @memberof google.firestore.v1.Target
                     * @classdesc Represents a QueryTarget.
                     * @implements IQueryTarget
                     * @constructor
                     * @param {google.firestore.v1.Target.IQueryTarget=} [properties] Properties to set
                     */
                    function QueryTarget(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * QueryTarget parent.
                     * @member {string} parent
                     * @memberof google.firestore.v1.Target.QueryTarget
                     * @instance
                     */
                    QueryTarget.prototype.parent = "";

                    /**
                     * QueryTarget structuredQuery.
                     * @member {google.firestore.v1.IStructuredQuery|null|undefined} structuredQuery
                     * @memberof google.firestore.v1.Target.QueryTarget
                     * @instance
                     */
                    QueryTarget.prototype.structuredQuery = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * QueryTarget queryType.
                     * @member {"structuredQuery"|undefined} queryType
                     * @memberof google.firestore.v1.Target.QueryTarget
                     * @instance
                     */
                    Object.defineProperty(QueryTarget.prototype, "queryType", {
                        get: $util.oneOfGetter($oneOfFields = ["structuredQuery"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    return QueryTarget;
                })();

                return Target;
            })();

            v1.TargetChange = (function() {

                /**
                 * Properties of a TargetChange.
                 * @memberof google.firestore.v1
                 * @interface ITargetChange
                 * @property {google.firestore.v1.TargetChange.TargetChangeType|null} [targetChangeType] TargetChange targetChangeType
                 * @property {Array.<number>|null} [targetIds] TargetChange targetIds
                 * @property {google.rpc.IStatus|null} [cause] TargetChange cause
                 * @property {Uint8Array|null} [resumeToken] TargetChange resumeToken
                 * @property {google.protobuf.ITimestamp|null} [readTime] TargetChange readTime
                 */

                /**
                 * Constructs a new TargetChange.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a TargetChange.
                 * @implements ITargetChange
                 * @constructor
                 * @param {google.firestore.v1.ITargetChange=} [properties] Properties to set
                 */
                function TargetChange(properties) {
                    this.targetIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TargetChange targetChangeType.
                 * @member {google.firestore.v1.TargetChange.TargetChangeType} targetChangeType
                 * @memberof google.firestore.v1.TargetChange
                 * @instance
                 */
                TargetChange.prototype.targetChangeType = 0;

                /**
                 * TargetChange targetIds.
                 * @member {Array.<number>} targetIds
                 * @memberof google.firestore.v1.TargetChange
                 * @instance
                 */
                TargetChange.prototype.targetIds = $util.emptyArray;

                /**
                 * TargetChange cause.
                 * @member {google.rpc.IStatus|null|undefined} cause
                 * @memberof google.firestore.v1.TargetChange
                 * @instance
                 */
                TargetChange.prototype.cause = null;

                /**
                 * TargetChange resumeToken.
                 * @member {Uint8Array} resumeToken
                 * @memberof google.firestore.v1.TargetChange
                 * @instance
                 */
                TargetChange.prototype.resumeToken = $util.newBuffer([]);

                /**
                 * TargetChange readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.TargetChange
                 * @instance
                 */
                TargetChange.prototype.readTime = null;

                /**
                 * TargetChangeType enum.
                 * @name google.firestore.v1.TargetChange.TargetChangeType
                 * @enum {number}
                 * @property {string} NO_CHANGE=NO_CHANGE NO_CHANGE value
                 * @property {string} ADD=ADD ADD value
                 * @property {string} REMOVE=REMOVE REMOVE value
                 * @property {string} CURRENT=CURRENT CURRENT value
                 * @property {string} RESET=RESET RESET value
                 */
                TargetChange.TargetChangeType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "NO_CHANGE"] = "NO_CHANGE";
                    values[valuesById[1] = "ADD"] = "ADD";
                    values[valuesById[2] = "REMOVE"] = "REMOVE";
                    values[valuesById[3] = "CURRENT"] = "CURRENT";
                    values[valuesById[4] = "RESET"] = "RESET";
                    return values;
                })();

                return TargetChange;
            })();

            v1.ListCollectionIdsRequest = (function() {

                /**
                 * Properties of a ListCollectionIdsRequest.
                 * @memberof google.firestore.v1
                 * @interface IListCollectionIdsRequest
                 * @property {string|null} [parent] ListCollectionIdsRequest parent
                 * @property {number|null} [pageSize] ListCollectionIdsRequest pageSize
                 * @property {string|null} [pageToken] ListCollectionIdsRequest pageToken
                 */

                /**
                 * Constructs a new ListCollectionIdsRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListCollectionIdsRequest.
                 * @implements IListCollectionIdsRequest
                 * @constructor
                 * @param {google.firestore.v1.IListCollectionIdsRequest=} [properties] Properties to set
                 */
                function ListCollectionIdsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListCollectionIdsRequest parent.
                 * @member {string} parent
                 * @memberof google.firestore.v1.ListCollectionIdsRequest
                 * @instance
                 */
                ListCollectionIdsRequest.prototype.parent = "";

                /**
                 * ListCollectionIdsRequest pageSize.
                 * @member {number} pageSize
                 * @memberof google.firestore.v1.ListCollectionIdsRequest
                 * @instance
                 */
                ListCollectionIdsRequest.prototype.pageSize = 0;

                /**
                 * ListCollectionIdsRequest pageToken.
                 * @member {string} pageToken
                 * @memberof google.firestore.v1.ListCollectionIdsRequest
                 * @instance
                 */
                ListCollectionIdsRequest.prototype.pageToken = "";

                return ListCollectionIdsRequest;
            })();

            v1.ListCollectionIdsResponse = (function() {

                /**
                 * Properties of a ListCollectionIdsResponse.
                 * @memberof google.firestore.v1
                 * @interface IListCollectionIdsResponse
                 * @property {Array.<string>|null} [collectionIds] ListCollectionIdsResponse collectionIds
                 * @property {string|null} [nextPageToken] ListCollectionIdsResponse nextPageToken
                 */

                /**
                 * Constructs a new ListCollectionIdsResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a ListCollectionIdsResponse.
                 * @implements IListCollectionIdsResponse
                 * @constructor
                 * @param {google.firestore.v1.IListCollectionIdsResponse=} [properties] Properties to set
                 */
                function ListCollectionIdsResponse(properties) {
                    this.collectionIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListCollectionIdsResponse collectionIds.
                 * @member {Array.<string>} collectionIds
                 * @memberof google.firestore.v1.ListCollectionIdsResponse
                 * @instance
                 */
                ListCollectionIdsResponse.prototype.collectionIds = $util.emptyArray;

                /**
                 * ListCollectionIdsResponse nextPageToken.
                 * @member {string} nextPageToken
                 * @memberof google.firestore.v1.ListCollectionIdsResponse
                 * @instance
                 */
                ListCollectionIdsResponse.prototype.nextPageToken = "";

                return ListCollectionIdsResponse;
            })();

            v1.BatchWriteRequest = (function() {

                /**
                 * Properties of a BatchWriteRequest.
                 * @memberof google.firestore.v1
                 * @interface IBatchWriteRequest
                 * @property {string|null} [database] BatchWriteRequest database
                 * @property {Array.<google.firestore.v1.IWrite>|null} [writes] BatchWriteRequest writes
                 */

                /**
                 * Constructs a new BatchWriteRequest.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BatchWriteRequest.
                 * @implements IBatchWriteRequest
                 * @constructor
                 * @param {google.firestore.v1.IBatchWriteRequest=} [properties] Properties to set
                 */
                function BatchWriteRequest(properties) {
                    this.writes = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BatchWriteRequest database.
                 * @member {string} database
                 * @memberof google.firestore.v1.BatchWriteRequest
                 * @instance
                 */
                BatchWriteRequest.prototype.database = "";

                /**
                 * BatchWriteRequest writes.
                 * @member {Array.<google.firestore.v1.IWrite>} writes
                 * @memberof google.firestore.v1.BatchWriteRequest
                 * @instance
                 */
                BatchWriteRequest.prototype.writes = $util.emptyArray;

                return BatchWriteRequest;
            })();

            v1.BatchWriteResponse = (function() {

                /**
                 * Properties of a BatchWriteResponse.
                 * @memberof google.firestore.v1
                 * @interface IBatchWriteResponse
                 * @property {Array.<google.firestore.v1.IWriteResult>|null} [writeResults] BatchWriteResponse writeResults
                 * @property {Array.<google.rpc.IStatus>|null} [status] BatchWriteResponse status
                 */

                /**
                 * Constructs a new BatchWriteResponse.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a BatchWriteResponse.
                 * @implements IBatchWriteResponse
                 * @constructor
                 * @param {google.firestore.v1.IBatchWriteResponse=} [properties] Properties to set
                 */
                function BatchWriteResponse(properties) {
                    this.writeResults = [];
                    this.status = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BatchWriteResponse writeResults.
                 * @member {Array.<google.firestore.v1.IWriteResult>} writeResults
                 * @memberof google.firestore.v1.BatchWriteResponse
                 * @instance
                 */
                BatchWriteResponse.prototype.writeResults = $util.emptyArray;

                /**
                 * BatchWriteResponse status.
                 * @member {Array.<google.rpc.IStatus>} status
                 * @memberof google.firestore.v1.BatchWriteResponse
                 * @instance
                 */
                BatchWriteResponse.prototype.status = $util.emptyArray;

                return BatchWriteResponse;
            })();

            v1.StructuredQuery = (function() {

                /**
                 * Properties of a StructuredQuery.
                 * @memberof google.firestore.v1
                 * @interface IStructuredQuery
                 * @property {google.firestore.v1.StructuredQuery.IProjection|null} [select] StructuredQuery select
                 * @property {Array.<google.firestore.v1.StructuredQuery.ICollectionSelector>|null} [from] StructuredQuery from
                 * @property {google.firestore.v1.StructuredQuery.IFilter|null} [where] StructuredQuery where
                 * @property {Array.<google.firestore.v1.StructuredQuery.IOrder>|null} [orderBy] StructuredQuery orderBy
                 * @property {google.firestore.v1.ICursor|null} [startAt] StructuredQuery startAt
                 * @property {google.firestore.v1.ICursor|null} [endAt] StructuredQuery endAt
                 * @property {number|null} [offset] StructuredQuery offset
                 * @property {google.protobuf.IInt32Value|null} [limit] StructuredQuery limit
                 */

                /**
                 * Constructs a new StructuredQuery.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a StructuredQuery.
                 * @implements IStructuredQuery
                 * @constructor
                 * @param {google.firestore.v1.IStructuredQuery=} [properties] Properties to set
                 */
                function StructuredQuery(properties) {
                    this.from = [];
                    this.orderBy = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StructuredQuery select.
                 * @member {google.firestore.v1.StructuredQuery.IProjection|null|undefined} select
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.select = null;

                /**
                 * StructuredQuery from.
                 * @member {Array.<google.firestore.v1.StructuredQuery.ICollectionSelector>} from
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.from = $util.emptyArray;

                /**
                 * StructuredQuery where.
                 * @member {google.firestore.v1.StructuredQuery.IFilter|null|undefined} where
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.where = null;

                /**
                 * StructuredQuery orderBy.
                 * @member {Array.<google.firestore.v1.StructuredQuery.IOrder>} orderBy
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.orderBy = $util.emptyArray;

                /**
                 * StructuredQuery startAt.
                 * @member {google.firestore.v1.ICursor|null|undefined} startAt
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.startAt = null;

                /**
                 * StructuredQuery endAt.
                 * @member {google.firestore.v1.ICursor|null|undefined} endAt
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.endAt = null;

                /**
                 * StructuredQuery offset.
                 * @member {number} offset
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.offset = 0;

                /**
                 * StructuredQuery limit.
                 * @member {google.protobuf.IInt32Value|null|undefined} limit
                 * @memberof google.firestore.v1.StructuredQuery
                 * @instance
                 */
                StructuredQuery.prototype.limit = null;

                StructuredQuery.CollectionSelector = (function() {

                    /**
                     * Properties of a CollectionSelector.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface ICollectionSelector
                     * @property {string|null} [collectionId] CollectionSelector collectionId
                     * @property {boolean|null} [allDescendants] CollectionSelector allDescendants
                     */

                    /**
                     * Constructs a new CollectionSelector.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a CollectionSelector.
                     * @implements ICollectionSelector
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.ICollectionSelector=} [properties] Properties to set
                     */
                    function CollectionSelector(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * CollectionSelector collectionId.
                     * @member {string} collectionId
                     * @memberof google.firestore.v1.StructuredQuery.CollectionSelector
                     * @instance
                     */
                    CollectionSelector.prototype.collectionId = "";

                    /**
                     * CollectionSelector allDescendants.
                     * @member {boolean} allDescendants
                     * @memberof google.firestore.v1.StructuredQuery.CollectionSelector
                     * @instance
                     */
                    CollectionSelector.prototype.allDescendants = false;

                    return CollectionSelector;
                })();

                StructuredQuery.Filter = (function() {

                    /**
                     * Properties of a Filter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IFilter
                     * @property {google.firestore.v1.StructuredQuery.ICompositeFilter|null} [compositeFilter] Filter compositeFilter
                     * @property {google.firestore.v1.StructuredQuery.IFieldFilter|null} [fieldFilter] Filter fieldFilter
                     * @property {google.firestore.v1.StructuredQuery.IUnaryFilter|null} [unaryFilter] Filter unaryFilter
                     */

                    /**
                     * Constructs a new Filter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a Filter.
                     * @implements IFilter
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IFilter=} [properties] Properties to set
                     */
                    function Filter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Filter compositeFilter.
                     * @member {google.firestore.v1.StructuredQuery.ICompositeFilter|null|undefined} compositeFilter
                     * @memberof google.firestore.v1.StructuredQuery.Filter
                     * @instance
                     */
                    Filter.prototype.compositeFilter = null;

                    /**
                     * Filter fieldFilter.
                     * @member {google.firestore.v1.StructuredQuery.IFieldFilter|null|undefined} fieldFilter
                     * @memberof google.firestore.v1.StructuredQuery.Filter
                     * @instance
                     */
                    Filter.prototype.fieldFilter = null;

                    /**
                     * Filter unaryFilter.
                     * @member {google.firestore.v1.StructuredQuery.IUnaryFilter|null|undefined} unaryFilter
                     * @memberof google.firestore.v1.StructuredQuery.Filter
                     * @instance
                     */
                    Filter.prototype.unaryFilter = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * Filter filterType.
                     * @member {"compositeFilter"|"fieldFilter"|"unaryFilter"|undefined} filterType
                     * @memberof google.firestore.v1.StructuredQuery.Filter
                     * @instance
                     */
                    Object.defineProperty(Filter.prototype, "filterType", {
                        get: $util.oneOfGetter($oneOfFields = ["compositeFilter", "fieldFilter", "unaryFilter"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    return Filter;
                })();

                StructuredQuery.CompositeFilter = (function() {

                    /**
                     * Properties of a CompositeFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface ICompositeFilter
                     * @property {google.firestore.v1.StructuredQuery.CompositeFilter.Operator|null} [op] CompositeFilter op
                     * @property {Array.<google.firestore.v1.StructuredQuery.IFilter>|null} [filters] CompositeFilter filters
                     */

                    /**
                     * Constructs a new CompositeFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a CompositeFilter.
                     * @implements ICompositeFilter
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.ICompositeFilter=} [properties] Properties to set
                     */
                    function CompositeFilter(properties) {
                        this.filters = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * CompositeFilter op.
                     * @member {google.firestore.v1.StructuredQuery.CompositeFilter.Operator} op
                     * @memberof google.firestore.v1.StructuredQuery.CompositeFilter
                     * @instance
                     */
                    CompositeFilter.prototype.op = 0;

                    /**
                     * CompositeFilter filters.
                     * @member {Array.<google.firestore.v1.StructuredQuery.IFilter>} filters
                     * @memberof google.firestore.v1.StructuredQuery.CompositeFilter
                     * @instance
                     */
                    CompositeFilter.prototype.filters = $util.emptyArray;

                    /**
                     * Operator enum.
                     * @name google.firestore.v1.StructuredQuery.CompositeFilter.Operator
                     * @enum {number}
                     * @property {string} OPERATOR_UNSPECIFIED=OPERATOR_UNSPECIFIED OPERATOR_UNSPECIFIED value
                     * @property {string} AND=AND AND value
                     */
                    CompositeFilter.Operator = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "OPERATOR_UNSPECIFIED"] = "OPERATOR_UNSPECIFIED";
                        values[valuesById[1] = "AND"] = "AND";
                        return values;
                    })();

                    return CompositeFilter;
                })();

                StructuredQuery.FieldFilter = (function() {

                    /**
                     * Properties of a FieldFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IFieldFilter
                     * @property {google.firestore.v1.StructuredQuery.IFieldReference|null} [field] FieldFilter field
                     * @property {google.firestore.v1.StructuredQuery.FieldFilter.Operator|null} [op] FieldFilter op
                     * @property {google.firestore.v1.IValue|null} [value] FieldFilter value
                     */

                    /**
                     * Constructs a new FieldFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a FieldFilter.
                     * @implements IFieldFilter
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IFieldFilter=} [properties] Properties to set
                     */
                    function FieldFilter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * FieldFilter field.
                     * @member {google.firestore.v1.StructuredQuery.IFieldReference|null|undefined} field
                     * @memberof google.firestore.v1.StructuredQuery.FieldFilter
                     * @instance
                     */
                    FieldFilter.prototype.field = null;

                    /**
                     * FieldFilter op.
                     * @member {google.firestore.v1.StructuredQuery.FieldFilter.Operator} op
                     * @memberof google.firestore.v1.StructuredQuery.FieldFilter
                     * @instance
                     */
                    FieldFilter.prototype.op = 0;

                    /**
                     * FieldFilter value.
                     * @member {google.firestore.v1.IValue|null|undefined} value
                     * @memberof google.firestore.v1.StructuredQuery.FieldFilter
                     * @instance
                     */
                    FieldFilter.prototype.value = null;

                    /**
                     * Operator enum.
                     * @name google.firestore.v1.StructuredQuery.FieldFilter.Operator
                     * @enum {number}
                     * @property {string} OPERATOR_UNSPECIFIED=OPERATOR_UNSPECIFIED OPERATOR_UNSPECIFIED value
                     * @property {string} LESS_THAN=LESS_THAN LESS_THAN value
                     * @property {string} LESS_THAN_OR_EQUAL=LESS_THAN_OR_EQUAL LESS_THAN_OR_EQUAL value
                     * @property {string} GREATER_THAN=GREATER_THAN GREATER_THAN value
                     * @property {string} GREATER_THAN_OR_EQUAL=GREATER_THAN_OR_EQUAL GREATER_THAN_OR_EQUAL value
                     * @property {string} EQUAL=EQUAL EQUAL value
                     * @property {string} ARRAY_CONTAINS=ARRAY_CONTAINS ARRAY_CONTAINS value
                     * @property {string} IN=IN IN value
                     * @property {string} ARRAY_CONTAINS_ANY=ARRAY_CONTAINS_ANY ARRAY_CONTAINS_ANY value
                     */
                    FieldFilter.Operator = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "OPERATOR_UNSPECIFIED"] = "OPERATOR_UNSPECIFIED";
                        values[valuesById[1] = "LESS_THAN"] = "LESS_THAN";
                        values[valuesById[2] = "LESS_THAN_OR_EQUAL"] = "LESS_THAN_OR_EQUAL";
                        values[valuesById[3] = "GREATER_THAN"] = "GREATER_THAN";
                        values[valuesById[4] = "GREATER_THAN_OR_EQUAL"] = "GREATER_THAN_OR_EQUAL";
                        values[valuesById[5] = "EQUAL"] = "EQUAL";
                        values[valuesById[7] = "ARRAY_CONTAINS"] = "ARRAY_CONTAINS";
                        values[valuesById[8] = "IN"] = "IN";
                        values[valuesById[9] = "ARRAY_CONTAINS_ANY"] = "ARRAY_CONTAINS_ANY";
                        return values;
                    })();

                    return FieldFilter;
                })();

                StructuredQuery.Projection = (function() {

                    /**
                     * Properties of a Projection.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IProjection
                     * @property {Array.<google.firestore.v1.StructuredQuery.IFieldReference>|null} [fields] Projection fields
                     */

                    /**
                     * Constructs a new Projection.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a Projection.
                     * @implements IProjection
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IProjection=} [properties] Properties to set
                     */
                    function Projection(properties) {
                        this.fields = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Projection fields.
                     * @member {Array.<google.firestore.v1.StructuredQuery.IFieldReference>} fields
                     * @memberof google.firestore.v1.StructuredQuery.Projection
                     * @instance
                     */
                    Projection.prototype.fields = $util.emptyArray;

                    return Projection;
                })();

                StructuredQuery.UnaryFilter = (function() {

                    /**
                     * Properties of an UnaryFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IUnaryFilter
                     * @property {google.firestore.v1.StructuredQuery.UnaryFilter.Operator|null} [op] UnaryFilter op
                     * @property {google.firestore.v1.StructuredQuery.IFieldReference|null} [field] UnaryFilter field
                     */

                    /**
                     * Constructs a new UnaryFilter.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents an UnaryFilter.
                     * @implements IUnaryFilter
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IUnaryFilter=} [properties] Properties to set
                     */
                    function UnaryFilter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * UnaryFilter op.
                     * @member {google.firestore.v1.StructuredQuery.UnaryFilter.Operator} op
                     * @memberof google.firestore.v1.StructuredQuery.UnaryFilter
                     * @instance
                     */
                    UnaryFilter.prototype.op = 0;

                    /**
                     * UnaryFilter field.
                     * @member {google.firestore.v1.StructuredQuery.IFieldReference|null|undefined} field
                     * @memberof google.firestore.v1.StructuredQuery.UnaryFilter
                     * @instance
                     */
                    UnaryFilter.prototype.field = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * UnaryFilter operandType.
                     * @member {"field"|undefined} operandType
                     * @memberof google.firestore.v1.StructuredQuery.UnaryFilter
                     * @instance
                     */
                    Object.defineProperty(UnaryFilter.prototype, "operandType", {
                        get: $util.oneOfGetter($oneOfFields = ["field"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Operator enum.
                     * @name google.firestore.v1.StructuredQuery.UnaryFilter.Operator
                     * @enum {number}
                     * @property {string} OPERATOR_UNSPECIFIED=OPERATOR_UNSPECIFIED OPERATOR_UNSPECIFIED value
                     * @property {string} IS_NAN=IS_NAN IS_NAN value
                     * @property {string} IS_NULL=IS_NULL IS_NULL value
                     */
                    UnaryFilter.Operator = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "OPERATOR_UNSPECIFIED"] = "OPERATOR_UNSPECIFIED";
                        values[valuesById[2] = "IS_NAN"] = "IS_NAN";
                        values[valuesById[3] = "IS_NULL"] = "IS_NULL";
                        return values;
                    })();

                    return UnaryFilter;
                })();

                StructuredQuery.FieldReference = (function() {

                    /**
                     * Properties of a FieldReference.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IFieldReference
                     * @property {string|null} [fieldPath] FieldReference fieldPath
                     */

                    /**
                     * Constructs a new FieldReference.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents a FieldReference.
                     * @implements IFieldReference
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IFieldReference=} [properties] Properties to set
                     */
                    function FieldReference(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * FieldReference fieldPath.
                     * @member {string} fieldPath
                     * @memberof google.firestore.v1.StructuredQuery.FieldReference
                     * @instance
                     */
                    FieldReference.prototype.fieldPath = "";

                    return FieldReference;
                })();

                StructuredQuery.Order = (function() {

                    /**
                     * Properties of an Order.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @interface IOrder
                     * @property {google.firestore.v1.StructuredQuery.IFieldReference|null} [field] Order field
                     * @property {google.firestore.v1.StructuredQuery.Direction|null} [direction] Order direction
                     */

                    /**
                     * Constructs a new Order.
                     * @memberof google.firestore.v1.StructuredQuery
                     * @classdesc Represents an Order.
                     * @implements IOrder
                     * @constructor
                     * @param {google.firestore.v1.StructuredQuery.IOrder=} [properties] Properties to set
                     */
                    function Order(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Order field.
                     * @member {google.firestore.v1.StructuredQuery.IFieldReference|null|undefined} field
                     * @memberof google.firestore.v1.StructuredQuery.Order
                     * @instance
                     */
                    Order.prototype.field = null;

                    /**
                     * Order direction.
                     * @member {google.firestore.v1.StructuredQuery.Direction} direction
                     * @memberof google.firestore.v1.StructuredQuery.Order
                     * @instance
                     */
                    Order.prototype.direction = 0;

                    return Order;
                })();

                /**
                 * Direction enum.
                 * @name google.firestore.v1.StructuredQuery.Direction
                 * @enum {number}
                 * @property {string} DIRECTION_UNSPECIFIED=DIRECTION_UNSPECIFIED DIRECTION_UNSPECIFIED value
                 * @property {string} ASCENDING=ASCENDING ASCENDING value
                 * @property {string} DESCENDING=DESCENDING DESCENDING value
                 */
                StructuredQuery.Direction = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "DIRECTION_UNSPECIFIED"] = "DIRECTION_UNSPECIFIED";
                    values[valuesById[1] = "ASCENDING"] = "ASCENDING";
                    values[valuesById[2] = "DESCENDING"] = "DESCENDING";
                    return values;
                })();

                return StructuredQuery;
            })();

            v1.Cursor = (function() {

                /**
                 * Properties of a Cursor.
                 * @memberof google.firestore.v1
                 * @interface ICursor
                 * @property {Array.<google.firestore.v1.IValue>|null} [values] Cursor values
                 * @property {boolean|null} [before] Cursor before
                 */

                /**
                 * Constructs a new Cursor.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Cursor.
                 * @implements ICursor
                 * @constructor
                 * @param {google.firestore.v1.ICursor=} [properties] Properties to set
                 */
                function Cursor(properties) {
                    this.values = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Cursor values.
                 * @member {Array.<google.firestore.v1.IValue>} values
                 * @memberof google.firestore.v1.Cursor
                 * @instance
                 */
                Cursor.prototype.values = $util.emptyArray;

                /**
                 * Cursor before.
                 * @member {boolean} before
                 * @memberof google.firestore.v1.Cursor
                 * @instance
                 */
                Cursor.prototype.before = false;

                return Cursor;
            })();

            v1.Write = (function() {

                /**
                 * Properties of a Write.
                 * @memberof google.firestore.v1
                 * @interface IWrite
                 * @property {google.firestore.v1.IDocument|null} [update] Write update
                 * @property {string|null} ["delete"] Write delete
                 * @property {google.firestore.v1.IDocumentTransform|null} [transform] Write transform
                 * @property {google.firestore.v1.IDocumentMask|null} [updateMask] Write updateMask
                 * @property {Array.<google.firestore.v1.DocumentTransform.IFieldTransform>|null} [updateTransforms] Write updateTransforms
                 * @property {google.firestore.v1.IPrecondition|null} [currentDocument] Write currentDocument
                 */

                /**
                 * Constructs a new Write.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a Write.
                 * @implements IWrite
                 * @constructor
                 * @param {google.firestore.v1.IWrite=} [properties] Properties to set
                 */
                function Write(properties) {
                    this.updateTransforms = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Write update.
                 * @member {google.firestore.v1.IDocument|null|undefined} update
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype.update = null;

                /**
                 * Write delete.
                 * @member {string} delete
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype["delete"] = "";

                /**
                 * Write transform.
                 * @member {google.firestore.v1.IDocumentTransform|null|undefined} transform
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype.transform = null;

                /**
                 * Write updateMask.
                 * @member {google.firestore.v1.IDocumentMask|null|undefined} updateMask
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype.updateMask = null;

                /**
                 * Write updateTransforms.
                 * @member {Array.<google.firestore.v1.DocumentTransform.IFieldTransform>} updateTransforms
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype.updateTransforms = $util.emptyArray;

                /**
                 * Write currentDocument.
                 * @member {google.firestore.v1.IPrecondition|null|undefined} currentDocument
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Write.prototype.currentDocument = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Write operation.
                 * @member {"update"|"delete"|"transform"|undefined} operation
                 * @memberof google.firestore.v1.Write
                 * @instance
                 */
                Object.defineProperty(Write.prototype, "operation", {
                    get: $util.oneOfGetter($oneOfFields = ["update", "delete", "transform"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                return Write;
            })();

            v1.DocumentTransform = (function() {

                /**
                 * Properties of a DocumentTransform.
                 * @memberof google.firestore.v1
                 * @interface IDocumentTransform
                 * @property {string|null} [document] DocumentTransform document
                 * @property {Array.<google.firestore.v1.DocumentTransform.IFieldTransform>|null} [fieldTransforms] DocumentTransform fieldTransforms
                 */

                /**
                 * Constructs a new DocumentTransform.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DocumentTransform.
                 * @implements IDocumentTransform
                 * @constructor
                 * @param {google.firestore.v1.IDocumentTransform=} [properties] Properties to set
                 */
                function DocumentTransform(properties) {
                    this.fieldTransforms = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DocumentTransform document.
                 * @member {string} document
                 * @memberof google.firestore.v1.DocumentTransform
                 * @instance
                 */
                DocumentTransform.prototype.document = "";

                /**
                 * DocumentTransform fieldTransforms.
                 * @member {Array.<google.firestore.v1.DocumentTransform.IFieldTransform>} fieldTransforms
                 * @memberof google.firestore.v1.DocumentTransform
                 * @instance
                 */
                DocumentTransform.prototype.fieldTransforms = $util.emptyArray;

                DocumentTransform.FieldTransform = (function() {

                    /**
                     * Properties of a FieldTransform.
                     * @memberof google.firestore.v1.DocumentTransform
                     * @interface IFieldTransform
                     * @property {string|null} [fieldPath] FieldTransform fieldPath
                     * @property {google.firestore.v1.DocumentTransform.FieldTransform.ServerValue|null} [setToServerValue] FieldTransform setToServerValue
                     * @property {google.firestore.v1.IValue|null} [increment] FieldTransform increment
                     * @property {google.firestore.v1.IValue|null} [maximum] FieldTransform maximum
                     * @property {google.firestore.v1.IValue|null} [minimum] FieldTransform minimum
                     * @property {google.firestore.v1.IArrayValue|null} [appendMissingElements] FieldTransform appendMissingElements
                     * @property {google.firestore.v1.IArrayValue|null} [removeAllFromArray] FieldTransform removeAllFromArray
                     */

                    /**
                     * Constructs a new FieldTransform.
                     * @memberof google.firestore.v1.DocumentTransform
                     * @classdesc Represents a FieldTransform.
                     * @implements IFieldTransform
                     * @constructor
                     * @param {google.firestore.v1.DocumentTransform.IFieldTransform=} [properties] Properties to set
                     */
                    function FieldTransform(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * FieldTransform fieldPath.
                     * @member {string} fieldPath
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.fieldPath = "";

                    /**
                     * FieldTransform setToServerValue.
                     * @member {google.firestore.v1.DocumentTransform.FieldTransform.ServerValue} setToServerValue
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.setToServerValue = 0;

                    /**
                     * FieldTransform increment.
                     * @member {google.firestore.v1.IValue|null|undefined} increment
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.increment = null;

                    /**
                     * FieldTransform maximum.
                     * @member {google.firestore.v1.IValue|null|undefined} maximum
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.maximum = null;

                    /**
                     * FieldTransform minimum.
                     * @member {google.firestore.v1.IValue|null|undefined} minimum
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.minimum = null;

                    /**
                     * FieldTransform appendMissingElements.
                     * @member {google.firestore.v1.IArrayValue|null|undefined} appendMissingElements
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.appendMissingElements = null;

                    /**
                     * FieldTransform removeAllFromArray.
                     * @member {google.firestore.v1.IArrayValue|null|undefined} removeAllFromArray
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    FieldTransform.prototype.removeAllFromArray = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * FieldTransform transformType.
                     * @member {"setToServerValue"|"increment"|"maximum"|"minimum"|"appendMissingElements"|"removeAllFromArray"|undefined} transformType
                     * @memberof google.firestore.v1.DocumentTransform.FieldTransform
                     * @instance
                     */
                    Object.defineProperty(FieldTransform.prototype, "transformType", {
                        get: $util.oneOfGetter($oneOfFields = ["setToServerValue", "increment", "maximum", "minimum", "appendMissingElements", "removeAllFromArray"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * ServerValue enum.
                     * @name google.firestore.v1.DocumentTransform.FieldTransform.ServerValue
                     * @enum {number}
                     * @property {string} SERVER_VALUE_UNSPECIFIED=SERVER_VALUE_UNSPECIFIED SERVER_VALUE_UNSPECIFIED value
                     * @property {string} REQUEST_TIME=REQUEST_TIME REQUEST_TIME value
                     */
                    FieldTransform.ServerValue = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "SERVER_VALUE_UNSPECIFIED"] = "SERVER_VALUE_UNSPECIFIED";
                        values[valuesById[1] = "REQUEST_TIME"] = "REQUEST_TIME";
                        return values;
                    })();

                    return FieldTransform;
                })();

                return DocumentTransform;
            })();

            v1.WriteResult = (function() {

                /**
                 * Properties of a WriteResult.
                 * @memberof google.firestore.v1
                 * @interface IWriteResult
                 * @property {google.protobuf.ITimestamp|null} [updateTime] WriteResult updateTime
                 * @property {Array.<google.firestore.v1.IValue>|null} [transformResults] WriteResult transformResults
                 */

                /**
                 * Constructs a new WriteResult.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a WriteResult.
                 * @implements IWriteResult
                 * @constructor
                 * @param {google.firestore.v1.IWriteResult=} [properties] Properties to set
                 */
                function WriteResult(properties) {
                    this.transformResults = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WriteResult updateTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} updateTime
                 * @memberof google.firestore.v1.WriteResult
                 * @instance
                 */
                WriteResult.prototype.updateTime = null;

                /**
                 * WriteResult transformResults.
                 * @member {Array.<google.firestore.v1.IValue>} transformResults
                 * @memberof google.firestore.v1.WriteResult
                 * @instance
                 */
                WriteResult.prototype.transformResults = $util.emptyArray;

                return WriteResult;
            })();

            v1.DocumentChange = (function() {

                /**
                 * Properties of a DocumentChange.
                 * @memberof google.firestore.v1
                 * @interface IDocumentChange
                 * @property {google.firestore.v1.IDocument|null} [document] DocumentChange document
                 * @property {Array.<number>|null} [targetIds] DocumentChange targetIds
                 * @property {Array.<number>|null} [removedTargetIds] DocumentChange removedTargetIds
                 */

                /**
                 * Constructs a new DocumentChange.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DocumentChange.
                 * @implements IDocumentChange
                 * @constructor
                 * @param {google.firestore.v1.IDocumentChange=} [properties] Properties to set
                 */
                function DocumentChange(properties) {
                    this.targetIds = [];
                    this.removedTargetIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DocumentChange document.
                 * @member {google.firestore.v1.IDocument|null|undefined} document
                 * @memberof google.firestore.v1.DocumentChange
                 * @instance
                 */
                DocumentChange.prototype.document = null;

                /**
                 * DocumentChange targetIds.
                 * @member {Array.<number>} targetIds
                 * @memberof google.firestore.v1.DocumentChange
                 * @instance
                 */
                DocumentChange.prototype.targetIds = $util.emptyArray;

                /**
                 * DocumentChange removedTargetIds.
                 * @member {Array.<number>} removedTargetIds
                 * @memberof google.firestore.v1.DocumentChange
                 * @instance
                 */
                DocumentChange.prototype.removedTargetIds = $util.emptyArray;

                return DocumentChange;
            })();

            v1.DocumentDelete = (function() {

                /**
                 * Properties of a DocumentDelete.
                 * @memberof google.firestore.v1
                 * @interface IDocumentDelete
                 * @property {string|null} [document] DocumentDelete document
                 * @property {Array.<number>|null} [removedTargetIds] DocumentDelete removedTargetIds
                 * @property {google.protobuf.ITimestamp|null} [readTime] DocumentDelete readTime
                 */

                /**
                 * Constructs a new DocumentDelete.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DocumentDelete.
                 * @implements IDocumentDelete
                 * @constructor
                 * @param {google.firestore.v1.IDocumentDelete=} [properties] Properties to set
                 */
                function DocumentDelete(properties) {
                    this.removedTargetIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DocumentDelete document.
                 * @member {string} document
                 * @memberof google.firestore.v1.DocumentDelete
                 * @instance
                 */
                DocumentDelete.prototype.document = "";

                /**
                 * DocumentDelete removedTargetIds.
                 * @member {Array.<number>} removedTargetIds
                 * @memberof google.firestore.v1.DocumentDelete
                 * @instance
                 */
                DocumentDelete.prototype.removedTargetIds = $util.emptyArray;

                /**
                 * DocumentDelete readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.DocumentDelete
                 * @instance
                 */
                DocumentDelete.prototype.readTime = null;

                return DocumentDelete;
            })();

            v1.DocumentRemove = (function() {

                /**
                 * Properties of a DocumentRemove.
                 * @memberof google.firestore.v1
                 * @interface IDocumentRemove
                 * @property {string|null} [document] DocumentRemove document
                 * @property {Array.<number>|null} [removedTargetIds] DocumentRemove removedTargetIds
                 * @property {google.protobuf.ITimestamp|null} [readTime] DocumentRemove readTime
                 */

                /**
                 * Constructs a new DocumentRemove.
                 * @memberof google.firestore.v1
                 * @classdesc Represents a DocumentRemove.
                 * @implements IDocumentRemove
                 * @constructor
                 * @param {google.firestore.v1.IDocumentRemove=} [properties] Properties to set
                 */
                function DocumentRemove(properties) {
                    this.removedTargetIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DocumentRemove document.
                 * @member {string} document
                 * @memberof google.firestore.v1.DocumentRemove
                 * @instance
                 */
                DocumentRemove.prototype.document = "";

                /**
                 * DocumentRemove removedTargetIds.
                 * @member {Array.<number>} removedTargetIds
                 * @memberof google.firestore.v1.DocumentRemove
                 * @instance
                 */
                DocumentRemove.prototype.removedTargetIds = $util.emptyArray;

                /**
                 * DocumentRemove readTime.
                 * @member {google.protobuf.ITimestamp|null|undefined} readTime
                 * @memberof google.firestore.v1.DocumentRemove
                 * @instance
                 */
                DocumentRemove.prototype.readTime = null;

                return DocumentRemove;
            })();

            v1.ExistenceFilter = (function() {

                /**
                 * Properties of an ExistenceFilter.
                 * @memberof google.firestore.v1
                 * @interface IExistenceFilter
                 * @property {number|null} [targetId] ExistenceFilter targetId
                 * @property {number|null} [count] ExistenceFilter count
                 */

                /**
                 * Constructs a new ExistenceFilter.
                 * @memberof google.firestore.v1
                 * @classdesc Represents an ExistenceFilter.
                 * @implements IExistenceFilter
                 * @constructor
                 * @param {google.firestore.v1.IExistenceFilter=} [properties] Properties to set
                 */
                function ExistenceFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ExistenceFilter targetId.
                 * @member {number} targetId
                 * @memberof google.firestore.v1.ExistenceFilter
                 * @instance
                 */
                ExistenceFilter.prototype.targetId = 0;

                /**
                 * ExistenceFilter count.
                 * @member {number} count
                 * @memberof google.firestore.v1.ExistenceFilter
                 * @instance
                 */
                ExistenceFilter.prototype.count = 0;

                return ExistenceFilter;
            })();

            return v1;
        })();

        return firestore;
    })();

    google.api = (function() {

        /**
         * Namespace api.
         * @memberof google
         * @namespace
         */
        var api = {};

        api.Http = (function() {

            /**
             * Properties of a Http.
             * @memberof google.api
             * @interface IHttp
             * @property {Array.<google.api.IHttpRule>|null} [rules] Http rules
             */

            /**
             * Constructs a new Http.
             * @memberof google.api
             * @classdesc Represents a Http.
             * @implements IHttp
             * @constructor
             * @param {google.api.IHttp=} [properties] Properties to set
             */
            function Http(properties) {
                this.rules = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Http rules.
             * @member {Array.<google.api.IHttpRule>} rules
             * @memberof google.api.Http
             * @instance
             */
            Http.prototype.rules = $util.emptyArray;

            return Http;
        })();

        api.HttpRule = (function() {

            /**
             * Properties of a HttpRule.
             * @memberof google.api
             * @interface IHttpRule
             * @property {string|null} [get] HttpRule get
             * @property {string|null} [put] HttpRule put
             * @property {string|null} [post] HttpRule post
             * @property {string|null} ["delete"] HttpRule delete
             * @property {string|null} [patch] HttpRule patch
             * @property {google.api.ICustomHttpPattern|null} [custom] HttpRule custom
             * @property {string|null} [selector] HttpRule selector
             * @property {string|null} [body] HttpRule body
             * @property {Array.<google.api.IHttpRule>|null} [additionalBindings] HttpRule additionalBindings
             */

            /**
             * Constructs a new HttpRule.
             * @memberof google.api
             * @classdesc Represents a HttpRule.
             * @implements IHttpRule
             * @constructor
             * @param {google.api.IHttpRule=} [properties] Properties to set
             */
            function HttpRule(properties) {
                this.additionalBindings = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HttpRule get.
             * @member {string} get
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.get = "";

            /**
             * HttpRule put.
             * @member {string} put
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.put = "";

            /**
             * HttpRule post.
             * @member {string} post
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.post = "";

            /**
             * HttpRule delete.
             * @member {string} delete
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype["delete"] = "";

            /**
             * HttpRule patch.
             * @member {string} patch
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.patch = "";

            /**
             * HttpRule custom.
             * @member {google.api.ICustomHttpPattern|null|undefined} custom
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.custom = null;

            /**
             * HttpRule selector.
             * @member {string} selector
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.selector = "";

            /**
             * HttpRule body.
             * @member {string} body
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.body = "";

            /**
             * HttpRule additionalBindings.
             * @member {Array.<google.api.IHttpRule>} additionalBindings
             * @memberof google.api.HttpRule
             * @instance
             */
            HttpRule.prototype.additionalBindings = $util.emptyArray;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * HttpRule pattern.
             * @member {"get"|"put"|"post"|"delete"|"patch"|"custom"|undefined} pattern
             * @memberof google.api.HttpRule
             * @instance
             */
            Object.defineProperty(HttpRule.prototype, "pattern", {
                get: $util.oneOfGetter($oneOfFields = ["get", "put", "post", "delete", "patch", "custom"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            return HttpRule;
        })();

        api.CustomHttpPattern = (function() {

            /**
             * Properties of a CustomHttpPattern.
             * @memberof google.api
             * @interface ICustomHttpPattern
             * @property {string|null} [kind] CustomHttpPattern kind
             * @property {string|null} [path] CustomHttpPattern path
             */

            /**
             * Constructs a new CustomHttpPattern.
             * @memberof google.api
             * @classdesc Represents a CustomHttpPattern.
             * @implements ICustomHttpPattern
             * @constructor
             * @param {google.api.ICustomHttpPattern=} [properties] Properties to set
             */
            function CustomHttpPattern(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CustomHttpPattern kind.
             * @member {string} kind
             * @memberof google.api.CustomHttpPattern
             * @instance
             */
            CustomHttpPattern.prototype.kind = "";

            /**
             * CustomHttpPattern path.
             * @member {string} path
             * @memberof google.api.CustomHttpPattern
             * @instance
             */
            CustomHttpPattern.prototype.path = "";

            return CustomHttpPattern;
        })();

        /**
         * FieldBehavior enum.
         * @name google.api.FieldBehavior
         * @enum {number}
         * @property {string} FIELD_BEHAVIOR_UNSPECIFIED=FIELD_BEHAVIOR_UNSPECIFIED FIELD_BEHAVIOR_UNSPECIFIED value
         * @property {string} OPTIONAL=OPTIONAL OPTIONAL value
         * @property {string} REQUIRED=REQUIRED REQUIRED value
         * @property {string} OUTPUT_ONLY=OUTPUT_ONLY OUTPUT_ONLY value
         * @property {string} INPUT_ONLY=INPUT_ONLY INPUT_ONLY value
         * @property {string} IMMUTABLE=IMMUTABLE IMMUTABLE value
         */
        api.FieldBehavior = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "FIELD_BEHAVIOR_UNSPECIFIED"] = "FIELD_BEHAVIOR_UNSPECIFIED";
            values[valuesById[1] = "OPTIONAL"] = "OPTIONAL";
            values[valuesById[2] = "REQUIRED"] = "REQUIRED";
            values[valuesById[3] = "OUTPUT_ONLY"] = "OUTPUT_ONLY";
            values[valuesById[4] = "INPUT_ONLY"] = "INPUT_ONLY";
            values[valuesById[5] = "IMMUTABLE"] = "IMMUTABLE";
            return values;
        })();

        api.ResourceDescriptor = (function() {

            /**
             * Properties of a ResourceDescriptor.
             * @memberof google.api
             * @interface IResourceDescriptor
             * @property {string|null} [type] ResourceDescriptor type
             * @property {Array.<string>|null} [pattern] ResourceDescriptor pattern
             * @property {string|null} [nameField] ResourceDescriptor nameField
             * @property {google.api.ResourceDescriptor.History|null} [history] ResourceDescriptor history
             * @property {string|null} [plural] ResourceDescriptor plural
             * @property {string|null} [singular] ResourceDescriptor singular
             */

            /**
             * Constructs a new ResourceDescriptor.
             * @memberof google.api
             * @classdesc Represents a ResourceDescriptor.
             * @implements IResourceDescriptor
             * @constructor
             * @param {google.api.IResourceDescriptor=} [properties] Properties to set
             */
            function ResourceDescriptor(properties) {
                this.pattern = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ResourceDescriptor type.
             * @member {string} type
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.type = "";

            /**
             * ResourceDescriptor pattern.
             * @member {Array.<string>} pattern
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.pattern = $util.emptyArray;

            /**
             * ResourceDescriptor nameField.
             * @member {string} nameField
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.nameField = "";

            /**
             * ResourceDescriptor history.
             * @member {google.api.ResourceDescriptor.History} history
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.history = 0;

            /**
             * ResourceDescriptor plural.
             * @member {string} plural
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.plural = "";

            /**
             * ResourceDescriptor singular.
             * @member {string} singular
             * @memberof google.api.ResourceDescriptor
             * @instance
             */
            ResourceDescriptor.prototype.singular = "";

            /**
             * History enum.
             * @name google.api.ResourceDescriptor.History
             * @enum {number}
             * @property {string} HISTORY_UNSPECIFIED=HISTORY_UNSPECIFIED HISTORY_UNSPECIFIED value
             * @property {string} ORIGINALLY_SINGLE_PATTERN=ORIGINALLY_SINGLE_PATTERN ORIGINALLY_SINGLE_PATTERN value
             * @property {string} FUTURE_MULTI_PATTERN=FUTURE_MULTI_PATTERN FUTURE_MULTI_PATTERN value
             */
            ResourceDescriptor.History = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "HISTORY_UNSPECIFIED"] = "HISTORY_UNSPECIFIED";
                values[valuesById[1] = "ORIGINALLY_SINGLE_PATTERN"] = "ORIGINALLY_SINGLE_PATTERN";
                values[valuesById[2] = "FUTURE_MULTI_PATTERN"] = "FUTURE_MULTI_PATTERN";
                return values;
            })();

            return ResourceDescriptor;
        })();

        api.ResourceReference = (function() {

            /**
             * Properties of a ResourceReference.
             * @memberof google.api
             * @interface IResourceReference
             * @property {string|null} [type] ResourceReference type
             * @property {string|null} [childType] ResourceReference childType
             */

            /**
             * Constructs a new ResourceReference.
             * @memberof google.api
             * @classdesc Represents a ResourceReference.
             * @implements IResourceReference
             * @constructor
             * @param {google.api.IResourceReference=} [properties] Properties to set
             */
            function ResourceReference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ResourceReference type.
             * @member {string} type
             * @memberof google.api.ResourceReference
             * @instance
             */
            ResourceReference.prototype.type = "";

            /**
             * ResourceReference childType.
             * @member {string} childType
             * @memberof google.api.ResourceReference
             * @instance
             */
            ResourceReference.prototype.childType = "";

            return ResourceReference;
        })();

        return api;
    })();

    google.type = (function() {

        /**
         * Namespace type.
         * @memberof google
         * @namespace
         */
        var type = {};

        type.LatLng = (function() {

            /**
             * Properties of a LatLng.
             * @memberof google.type
             * @interface ILatLng
             * @property {number|null} [latitude] LatLng latitude
             * @property {number|null} [longitude] LatLng longitude
             */

            /**
             * Constructs a new LatLng.
             * @memberof google.type
             * @classdesc Represents a LatLng.
             * @implements ILatLng
             * @constructor
             * @param {google.type.ILatLng=} [properties] Properties to set
             */
            function LatLng(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LatLng latitude.
             * @member {number} latitude
             * @memberof google.type.LatLng
             * @instance
             */
            LatLng.prototype.latitude = 0;

            /**
             * LatLng longitude.
             * @member {number} longitude
             * @memberof google.type.LatLng
             * @instance
             */
            LatLng.prototype.longitude = 0;

            return LatLng;
        })();

        return type;
    })();

    google.rpc = (function() {

        /**
         * Namespace rpc.
         * @memberof google
         * @namespace
         */
        var rpc = {};

        rpc.Status = (function() {

            /**
             * Properties of a Status.
             * @memberof google.rpc
             * @interface IStatus
             * @property {number|null} [code] Status code
             * @property {string|null} [message] Status message
             * @property {Array.<google.protobuf.IAny>|null} [details] Status details
             */

            /**
             * Constructs a new Status.
             * @memberof google.rpc
             * @classdesc Represents a Status.
             * @implements IStatus
             * @constructor
             * @param {google.rpc.IStatus=} [properties] Properties to set
             */
            function Status(properties) {
                this.details = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Status code.
             * @member {number} code
             * @memberof google.rpc.Status
             * @instance
             */
            Status.prototype.code = 0;

            /**
             * Status message.
             * @member {string} message
             * @memberof google.rpc.Status
             * @instance
             */
            Status.prototype.message = "";

            /**
             * Status details.
             * @member {Array.<google.protobuf.IAny>} details
             * @memberof google.rpc.Status
             * @instance
             */
            Status.prototype.details = $util.emptyArray;

            return Status;
        })();

        return rpc;
    })();

    google.longrunning = (function() {

        /**
         * Namespace longrunning.
         * @memberof google
         * @namespace
         */
        var longrunning = {};

        longrunning.Operations = (function() {

            /**
             * Constructs a new Operations service.
             * @memberof google.longrunning
             * @classdesc Represents an Operations
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function Operations(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (Operations.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Operations;

            /**
             * Callback as used by {@link google.longrunning.Operations#listOperations}.
             * @memberof google.longrunning.Operations
             * @typedef ListOperationsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.longrunning.ListOperationsResponse} [response] ListOperationsResponse
             */

            /**
             * Calls ListOperations.
             * @function listOperations
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IListOperationsRequest} request ListOperationsRequest message or plain object
             * @param {google.longrunning.Operations.ListOperationsCallback} callback Node-style callback called with the error, if any, and ListOperationsResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Operations.prototype.listOperations = function listOperations(request, callback) {
                return this.rpcCall(listOperations, $root.google.longrunning.ListOperationsRequest, $root.google.longrunning.ListOperationsResponse, request, callback);
            }, "name", { value: "ListOperations" });

            /**
             * Calls ListOperations.
             * @function listOperations
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IListOperationsRequest} request ListOperationsRequest message or plain object
             * @returns {Promise<google.longrunning.ListOperationsResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link google.longrunning.Operations#getOperation}.
             * @memberof google.longrunning.Operations
             * @typedef GetOperationCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.longrunning.Operation} [response] Operation
             */

            /**
             * Calls GetOperation.
             * @function getOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IGetOperationRequest} request GetOperationRequest message or plain object
             * @param {google.longrunning.Operations.GetOperationCallback} callback Node-style callback called with the error, if any, and Operation
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Operations.prototype.getOperation = function getOperation(request, callback) {
                return this.rpcCall(getOperation, $root.google.longrunning.GetOperationRequest, $root.google.longrunning.Operation, request, callback);
            }, "name", { value: "GetOperation" });

            /**
             * Calls GetOperation.
             * @function getOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IGetOperationRequest} request GetOperationRequest message or plain object
             * @returns {Promise<google.longrunning.Operation>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link google.longrunning.Operations#deleteOperation}.
             * @memberof google.longrunning.Operations
             * @typedef DeleteOperationCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.protobuf.Empty} [response] Empty
             */

            /**
             * Calls DeleteOperation.
             * @function deleteOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IDeleteOperationRequest} request DeleteOperationRequest message or plain object
             * @param {google.longrunning.Operations.DeleteOperationCallback} callback Node-style callback called with the error, if any, and Empty
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Operations.prototype.deleteOperation = function deleteOperation(request, callback) {
                return this.rpcCall(deleteOperation, $root.google.longrunning.DeleteOperationRequest, $root.google.protobuf.Empty, request, callback);
            }, "name", { value: "DeleteOperation" });

            /**
             * Calls DeleteOperation.
             * @function deleteOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IDeleteOperationRequest} request DeleteOperationRequest message or plain object
             * @returns {Promise<google.protobuf.Empty>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link google.longrunning.Operations#cancelOperation}.
             * @memberof google.longrunning.Operations
             * @typedef CancelOperationCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.protobuf.Empty} [response] Empty
             */

            /**
             * Calls CancelOperation.
             * @function cancelOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.ICancelOperationRequest} request CancelOperationRequest message or plain object
             * @param {google.longrunning.Operations.CancelOperationCallback} callback Node-style callback called with the error, if any, and Empty
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Operations.prototype.cancelOperation = function cancelOperation(request, callback) {
                return this.rpcCall(cancelOperation, $root.google.longrunning.CancelOperationRequest, $root.google.protobuf.Empty, request, callback);
            }, "name", { value: "CancelOperation" });

            /**
             * Calls CancelOperation.
             * @function cancelOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.ICancelOperationRequest} request CancelOperationRequest message or plain object
             * @returns {Promise<google.protobuf.Empty>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link google.longrunning.Operations#waitOperation}.
             * @memberof google.longrunning.Operations
             * @typedef WaitOperationCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.longrunning.Operation} [response] Operation
             */

            /**
             * Calls WaitOperation.
             * @function waitOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IWaitOperationRequest} request WaitOperationRequest message or plain object
             * @param {google.longrunning.Operations.WaitOperationCallback} callback Node-style callback called with the error, if any, and Operation
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Operations.prototype.waitOperation = function waitOperation(request, callback) {
                return this.rpcCall(waitOperation, $root.google.longrunning.WaitOperationRequest, $root.google.longrunning.Operation, request, callback);
            }, "name", { value: "WaitOperation" });

            /**
             * Calls WaitOperation.
             * @function waitOperation
             * @memberof google.longrunning.Operations
             * @instance
             * @param {google.longrunning.IWaitOperationRequest} request WaitOperationRequest message or plain object
             * @returns {Promise<google.longrunning.Operation>} Promise
             * @variation 2
             */

            return Operations;
        })();

        longrunning.Operation = (function() {

            /**
             * Properties of an Operation.
             * @memberof google.longrunning
             * @interface IOperation
             * @property {string|null} [name] Operation name
             * @property {google.protobuf.IAny|null} [metadata] Operation metadata
             * @property {boolean|null} [done] Operation done
             * @property {google.rpc.IStatus|null} [error] Operation error
             * @property {google.protobuf.IAny|null} [response] Operation response
             */

            /**
             * Constructs a new Operation.
             * @memberof google.longrunning
             * @classdesc Represents an Operation.
             * @implements IOperation
             * @constructor
             * @param {google.longrunning.IOperation=} [properties] Properties to set
             */
            function Operation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Operation name.
             * @member {string} name
             * @memberof google.longrunning.Operation
             * @instance
             */
            Operation.prototype.name = "";

            /**
             * Operation metadata.
             * @member {google.protobuf.IAny|null|undefined} metadata
             * @memberof google.longrunning.Operation
             * @instance
             */
            Operation.prototype.metadata = null;

            /**
             * Operation done.
             * @member {boolean} done
             * @memberof google.longrunning.Operation
             * @instance
             */
            Operation.prototype.done = false;

            /**
             * Operation error.
             * @member {google.rpc.IStatus|null|undefined} error
             * @memberof google.longrunning.Operation
             * @instance
             */
            Operation.prototype.error = null;

            /**
             * Operation response.
             * @member {google.protobuf.IAny|null|undefined} response
             * @memberof google.longrunning.Operation
             * @instance
             */
            Operation.prototype.response = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Operation result.
             * @member {"error"|"response"|undefined} result
             * @memberof google.longrunning.Operation
             * @instance
             */
            Object.defineProperty(Operation.prototype, "result", {
                get: $util.oneOfGetter($oneOfFields = ["error", "response"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            return Operation;
        })();

        longrunning.GetOperationRequest = (function() {

            /**
             * Properties of a GetOperationRequest.
             * @memberof google.longrunning
             * @interface IGetOperationRequest
             * @property {string|null} [name] GetOperationRequest name
             */

            /**
             * Constructs a new GetOperationRequest.
             * @memberof google.longrunning
             * @classdesc Represents a GetOperationRequest.
             * @implements IGetOperationRequest
             * @constructor
             * @param {google.longrunning.IGetOperationRequest=} [properties] Properties to set
             */
            function GetOperationRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetOperationRequest name.
             * @member {string} name
             * @memberof google.longrunning.GetOperationRequest
             * @instance
             */
            GetOperationRequest.prototype.name = "";

            return GetOperationRequest;
        })();

        longrunning.ListOperationsRequest = (function() {

            /**
             * Properties of a ListOperationsRequest.
             * @memberof google.longrunning
             * @interface IListOperationsRequest
             * @property {string|null} [name] ListOperationsRequest name
             * @property {string|null} [filter] ListOperationsRequest filter
             * @property {number|null} [pageSize] ListOperationsRequest pageSize
             * @property {string|null} [pageToken] ListOperationsRequest pageToken
             */

            /**
             * Constructs a new ListOperationsRequest.
             * @memberof google.longrunning
             * @classdesc Represents a ListOperationsRequest.
             * @implements IListOperationsRequest
             * @constructor
             * @param {google.longrunning.IListOperationsRequest=} [properties] Properties to set
             */
            function ListOperationsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListOperationsRequest name.
             * @member {string} name
             * @memberof google.longrunning.ListOperationsRequest
             * @instance
             */
            ListOperationsRequest.prototype.name = "";

            /**
             * ListOperationsRequest filter.
             * @member {string} filter
             * @memberof google.longrunning.ListOperationsRequest
             * @instance
             */
            ListOperationsRequest.prototype.filter = "";

            /**
             * ListOperationsRequest pageSize.
             * @member {number} pageSize
             * @memberof google.longrunning.ListOperationsRequest
             * @instance
             */
            ListOperationsRequest.prototype.pageSize = 0;

            /**
             * ListOperationsRequest pageToken.
             * @member {string} pageToken
             * @memberof google.longrunning.ListOperationsRequest
             * @instance
             */
            ListOperationsRequest.prototype.pageToken = "";

            return ListOperationsRequest;
        })();

        longrunning.ListOperationsResponse = (function() {

            /**
             * Properties of a ListOperationsResponse.
             * @memberof google.longrunning
             * @interface IListOperationsResponse
             * @property {Array.<google.longrunning.IOperation>|null} [operations] ListOperationsResponse operations
             * @property {string|null} [nextPageToken] ListOperationsResponse nextPageToken
             */

            /**
             * Constructs a new ListOperationsResponse.
             * @memberof google.longrunning
             * @classdesc Represents a ListOperationsResponse.
             * @implements IListOperationsResponse
             * @constructor
             * @param {google.longrunning.IListOperationsResponse=} [properties] Properties to set
             */
            function ListOperationsResponse(properties) {
                this.operations = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListOperationsResponse operations.
             * @member {Array.<google.longrunning.IOperation>} operations
             * @memberof google.longrunning.ListOperationsResponse
             * @instance
             */
            ListOperationsResponse.prototype.operations = $util.emptyArray;

            /**
             * ListOperationsResponse nextPageToken.
             * @member {string} nextPageToken
             * @memberof google.longrunning.ListOperationsResponse
             * @instance
             */
            ListOperationsResponse.prototype.nextPageToken = "";

            return ListOperationsResponse;
        })();

        longrunning.CancelOperationRequest = (function() {

            /**
             * Properties of a CancelOperationRequest.
             * @memberof google.longrunning
             * @interface ICancelOperationRequest
             * @property {string|null} [name] CancelOperationRequest name
             */

            /**
             * Constructs a new CancelOperationRequest.
             * @memberof google.longrunning
             * @classdesc Represents a CancelOperationRequest.
             * @implements ICancelOperationRequest
             * @constructor
             * @param {google.longrunning.ICancelOperationRequest=} [properties] Properties to set
             */
            function CancelOperationRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CancelOperationRequest name.
             * @member {string} name
             * @memberof google.longrunning.CancelOperationRequest
             * @instance
             */
            CancelOperationRequest.prototype.name = "";

            return CancelOperationRequest;
        })();

        longrunning.DeleteOperationRequest = (function() {

            /**
             * Properties of a DeleteOperationRequest.
             * @memberof google.longrunning
             * @interface IDeleteOperationRequest
             * @property {string|null} [name] DeleteOperationRequest name
             */

            /**
             * Constructs a new DeleteOperationRequest.
             * @memberof google.longrunning
             * @classdesc Represents a DeleteOperationRequest.
             * @implements IDeleteOperationRequest
             * @constructor
             * @param {google.longrunning.IDeleteOperationRequest=} [properties] Properties to set
             */
            function DeleteOperationRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeleteOperationRequest name.
             * @member {string} name
             * @memberof google.longrunning.DeleteOperationRequest
             * @instance
             */
            DeleteOperationRequest.prototype.name = "";

            return DeleteOperationRequest;
        })();

        longrunning.WaitOperationRequest = (function() {

            /**
             * Properties of a WaitOperationRequest.
             * @memberof google.longrunning
             * @interface IWaitOperationRequest
             * @property {string|null} [name] WaitOperationRequest name
             * @property {google.protobuf.IDuration|null} [timeout] WaitOperationRequest timeout
             */

            /**
             * Constructs a new WaitOperationRequest.
             * @memberof google.longrunning
             * @classdesc Represents a WaitOperationRequest.
             * @implements IWaitOperationRequest
             * @constructor
             * @param {google.longrunning.IWaitOperationRequest=} [properties] Properties to set
             */
            function WaitOperationRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WaitOperationRequest name.
             * @member {string} name
             * @memberof google.longrunning.WaitOperationRequest
             * @instance
             */
            WaitOperationRequest.prototype.name = "";

            /**
             * WaitOperationRequest timeout.
             * @member {google.protobuf.IDuration|null|undefined} timeout
             * @memberof google.longrunning.WaitOperationRequest
             * @instance
             */
            WaitOperationRequest.prototype.timeout = null;

            return WaitOperationRequest;
        })();

        longrunning.OperationInfo = (function() {

            /**
             * Properties of an OperationInfo.
             * @memberof google.longrunning
             * @interface IOperationInfo
             * @property {string|null} [responseType] OperationInfo responseType
             * @property {string|null} [metadataType] OperationInfo metadataType
             */

            /**
             * Constructs a new OperationInfo.
             * @memberof google.longrunning
             * @classdesc Represents an OperationInfo.
             * @implements IOperationInfo
             * @constructor
             * @param {google.longrunning.IOperationInfo=} [properties] Properties to set
             */
            function OperationInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OperationInfo responseType.
             * @member {string} responseType
             * @memberof google.longrunning.OperationInfo
             * @instance
             */
            OperationInfo.prototype.responseType = "";

            /**
             * OperationInfo metadataType.
             * @member {string} metadataType
             * @memberof google.longrunning.OperationInfo
             * @instance
             */
            OperationInfo.prototype.metadataType = "";

            return OperationInfo;
        })();

        return longrunning;
    })();

    return google;
})();
