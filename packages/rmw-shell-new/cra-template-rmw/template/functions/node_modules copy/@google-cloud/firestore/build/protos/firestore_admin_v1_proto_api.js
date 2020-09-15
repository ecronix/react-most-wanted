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

    google.firestore = (function() {

        /**
         * Namespace firestore.
         * @memberof google
         * @namespace
         */
        var firestore = {};

        firestore.admin = (function() {

            /**
             * Namespace admin.
             * @memberof google.firestore
             * @namespace
             */
            var admin = {};

            admin.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof google.firestore.admin
                 * @namespace
                 */
                var v1 = {};

                v1.Field = (function() {

                    /**
                     * Properties of a Field.
                     * @memberof google.firestore.admin.v1
                     * @interface IField
                     * @property {string|null} [name] Field name
                     * @property {google.firestore.admin.v1.Field.IIndexConfig|null} [indexConfig] Field indexConfig
                     */

                    /**
                     * Constructs a new Field.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a Field.
                     * @implements IField
                     * @constructor
                     * @param {google.firestore.admin.v1.IField=} [properties] Properties to set
                     */
                    function Field(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Field name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.Field
                     * @instance
                     */
                    Field.prototype.name = "";

                    /**
                     * Field indexConfig.
                     * @member {google.firestore.admin.v1.Field.IIndexConfig|null|undefined} indexConfig
                     * @memberof google.firestore.admin.v1.Field
                     * @instance
                     */
                    Field.prototype.indexConfig = null;

                    Field.IndexConfig = (function() {

                        /**
                         * Properties of an IndexConfig.
                         * @memberof google.firestore.admin.v1.Field
                         * @interface IIndexConfig
                         * @property {Array.<google.firestore.admin.v1.IIndex>|null} [indexes] IndexConfig indexes
                         * @property {boolean|null} [usesAncestorConfig] IndexConfig usesAncestorConfig
                         * @property {string|null} [ancestorField] IndexConfig ancestorField
                         * @property {boolean|null} [reverting] IndexConfig reverting
                         */

                        /**
                         * Constructs a new IndexConfig.
                         * @memberof google.firestore.admin.v1.Field
                         * @classdesc Represents an IndexConfig.
                         * @implements IIndexConfig
                         * @constructor
                         * @param {google.firestore.admin.v1.Field.IIndexConfig=} [properties] Properties to set
                         */
                        function IndexConfig(properties) {
                            this.indexes = [];
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * IndexConfig indexes.
                         * @member {Array.<google.firestore.admin.v1.IIndex>} indexes
                         * @memberof google.firestore.admin.v1.Field.IndexConfig
                         * @instance
                         */
                        IndexConfig.prototype.indexes = $util.emptyArray;

                        /**
                         * IndexConfig usesAncestorConfig.
                         * @member {boolean} usesAncestorConfig
                         * @memberof google.firestore.admin.v1.Field.IndexConfig
                         * @instance
                         */
                        IndexConfig.prototype.usesAncestorConfig = false;

                        /**
                         * IndexConfig ancestorField.
                         * @member {string} ancestorField
                         * @memberof google.firestore.admin.v1.Field.IndexConfig
                         * @instance
                         */
                        IndexConfig.prototype.ancestorField = "";

                        /**
                         * IndexConfig reverting.
                         * @member {boolean} reverting
                         * @memberof google.firestore.admin.v1.Field.IndexConfig
                         * @instance
                         */
                        IndexConfig.prototype.reverting = false;

                        return IndexConfig;
                    })();

                    return Field;
                })();

                v1.FirestoreAdmin = (function() {

                    /**
                     * Constructs a new FirestoreAdmin service.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a FirestoreAdmin
                     * @extends $protobuf.rpc.Service
                     * @constructor
                     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                     */
                    function FirestoreAdmin(rpcImpl, requestDelimited, responseDelimited) {
                        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                    }

                    (FirestoreAdmin.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = FirestoreAdmin;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#createIndex}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef CreateIndexCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.longrunning.Operation} [response] Operation
                     */

                    /**
                     * Calls CreateIndex.
                     * @function createIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.ICreateIndexRequest} request CreateIndexRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.CreateIndexCallback} callback Node-style callback called with the error, if any, and Operation
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.createIndex = function createIndex(request, callback) {
                        return this.rpcCall(createIndex, $root.google.firestore.admin.v1.CreateIndexRequest, $root.google.longrunning.Operation, request, callback);
                    }, "name", { value: "CreateIndex" });

                    /**
                     * Calls CreateIndex.
                     * @function createIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.ICreateIndexRequest} request CreateIndexRequest message or plain object
                     * @returns {Promise<google.longrunning.Operation>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#listIndexes}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef ListIndexesCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.firestore.admin.v1.ListIndexesResponse} [response] ListIndexesResponse
                     */

                    /**
                     * Calls ListIndexes.
                     * @function listIndexes
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IListIndexesRequest} request ListIndexesRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.ListIndexesCallback} callback Node-style callback called with the error, if any, and ListIndexesResponse
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.listIndexes = function listIndexes(request, callback) {
                        return this.rpcCall(listIndexes, $root.google.firestore.admin.v1.ListIndexesRequest, $root.google.firestore.admin.v1.ListIndexesResponse, request, callback);
                    }, "name", { value: "ListIndexes" });

                    /**
                     * Calls ListIndexes.
                     * @function listIndexes
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IListIndexesRequest} request ListIndexesRequest message or plain object
                     * @returns {Promise<google.firestore.admin.v1.ListIndexesResponse>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#getIndex}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef GetIndexCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.firestore.admin.v1.Index} [response] Index
                     */

                    /**
                     * Calls GetIndex.
                     * @function getIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IGetIndexRequest} request GetIndexRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.GetIndexCallback} callback Node-style callback called with the error, if any, and Index
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.getIndex = function getIndex(request, callback) {
                        return this.rpcCall(getIndex, $root.google.firestore.admin.v1.GetIndexRequest, $root.google.firestore.admin.v1.Index, request, callback);
                    }, "name", { value: "GetIndex" });

                    /**
                     * Calls GetIndex.
                     * @function getIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IGetIndexRequest} request GetIndexRequest message or plain object
                     * @returns {Promise<google.firestore.admin.v1.Index>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#deleteIndex}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef DeleteIndexCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.protobuf.Empty} [response] Empty
                     */

                    /**
                     * Calls DeleteIndex.
                     * @function deleteIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IDeleteIndexRequest} request DeleteIndexRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.DeleteIndexCallback} callback Node-style callback called with the error, if any, and Empty
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.deleteIndex = function deleteIndex(request, callback) {
                        return this.rpcCall(deleteIndex, $root.google.firestore.admin.v1.DeleteIndexRequest, $root.google.protobuf.Empty, request, callback);
                    }, "name", { value: "DeleteIndex" });

                    /**
                     * Calls DeleteIndex.
                     * @function deleteIndex
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IDeleteIndexRequest} request DeleteIndexRequest message or plain object
                     * @returns {Promise<google.protobuf.Empty>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#getField}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef GetFieldCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.firestore.admin.v1.Field} [response] Field
                     */

                    /**
                     * Calls GetField.
                     * @function getField
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IGetFieldRequest} request GetFieldRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.GetFieldCallback} callback Node-style callback called with the error, if any, and Field
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.getField = function getField(request, callback) {
                        return this.rpcCall(getField, $root.google.firestore.admin.v1.GetFieldRequest, $root.google.firestore.admin.v1.Field, request, callback);
                    }, "name", { value: "GetField" });

                    /**
                     * Calls GetField.
                     * @function getField
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IGetFieldRequest} request GetFieldRequest message or plain object
                     * @returns {Promise<google.firestore.admin.v1.Field>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#updateField}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef UpdateFieldCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.longrunning.Operation} [response] Operation
                     */

                    /**
                     * Calls UpdateField.
                     * @function updateField
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IUpdateFieldRequest} request UpdateFieldRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.UpdateFieldCallback} callback Node-style callback called with the error, if any, and Operation
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.updateField = function updateField(request, callback) {
                        return this.rpcCall(updateField, $root.google.firestore.admin.v1.UpdateFieldRequest, $root.google.longrunning.Operation, request, callback);
                    }, "name", { value: "UpdateField" });

                    /**
                     * Calls UpdateField.
                     * @function updateField
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IUpdateFieldRequest} request UpdateFieldRequest message or plain object
                     * @returns {Promise<google.longrunning.Operation>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#listFields}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef ListFieldsCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.firestore.admin.v1.ListFieldsResponse} [response] ListFieldsResponse
                     */

                    /**
                     * Calls ListFields.
                     * @function listFields
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IListFieldsRequest} request ListFieldsRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.ListFieldsCallback} callback Node-style callback called with the error, if any, and ListFieldsResponse
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.listFields = function listFields(request, callback) {
                        return this.rpcCall(listFields, $root.google.firestore.admin.v1.ListFieldsRequest, $root.google.firestore.admin.v1.ListFieldsResponse, request, callback);
                    }, "name", { value: "ListFields" });

                    /**
                     * Calls ListFields.
                     * @function listFields
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IListFieldsRequest} request ListFieldsRequest message or plain object
                     * @returns {Promise<google.firestore.admin.v1.ListFieldsResponse>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#exportDocuments}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef ExportDocumentsCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.longrunning.Operation} [response] Operation
                     */

                    /**
                     * Calls ExportDocuments.
                     * @function exportDocuments
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IExportDocumentsRequest} request ExportDocumentsRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.ExportDocumentsCallback} callback Node-style callback called with the error, if any, and Operation
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.exportDocuments = function exportDocuments(request, callback) {
                        return this.rpcCall(exportDocuments, $root.google.firestore.admin.v1.ExportDocumentsRequest, $root.google.longrunning.Operation, request, callback);
                    }, "name", { value: "ExportDocuments" });

                    /**
                     * Calls ExportDocuments.
                     * @function exportDocuments
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IExportDocumentsRequest} request ExportDocumentsRequest message or plain object
                     * @returns {Promise<google.longrunning.Operation>} Promise
                     * @variation 2
                     */

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#importDocuments}.
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @typedef ImportDocumentsCallback
                     * @type {function}
                     * @param {Error|null} error Error, if any
                     * @param {google.longrunning.Operation} [response] Operation
                     */

                    /**
                     * Calls ImportDocuments.
                     * @function importDocuments
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IImportDocumentsRequest} request ImportDocumentsRequest message or plain object
                     * @param {google.firestore.admin.v1.FirestoreAdmin.ImportDocumentsCallback} callback Node-style callback called with the error, if any, and Operation
                     * @returns {undefined}
                     * @variation 1
                     */
                    Object.defineProperty(FirestoreAdmin.prototype.importDocuments = function importDocuments(request, callback) {
                        return this.rpcCall(importDocuments, $root.google.firestore.admin.v1.ImportDocumentsRequest, $root.google.longrunning.Operation, request, callback);
                    }, "name", { value: "ImportDocuments" });

                    /**
                     * Calls ImportDocuments.
                     * @function importDocuments
                     * @memberof google.firestore.admin.v1.FirestoreAdmin
                     * @instance
                     * @param {google.firestore.admin.v1.IImportDocumentsRequest} request ImportDocumentsRequest message or plain object
                     * @returns {Promise<google.longrunning.Operation>} Promise
                     * @variation 2
                     */

                    return FirestoreAdmin;
                })();

                v1.CreateIndexRequest = (function() {

                    /**
                     * Properties of a CreateIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface ICreateIndexRequest
                     * @property {string|null} [parent] CreateIndexRequest parent
                     * @property {google.firestore.admin.v1.IIndex|null} [index] CreateIndexRequest index
                     */

                    /**
                     * Constructs a new CreateIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a CreateIndexRequest.
                     * @implements ICreateIndexRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.ICreateIndexRequest=} [properties] Properties to set
                     */
                    function CreateIndexRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * CreateIndexRequest parent.
                     * @member {string} parent
                     * @memberof google.firestore.admin.v1.CreateIndexRequest
                     * @instance
                     */
                    CreateIndexRequest.prototype.parent = "";

                    /**
                     * CreateIndexRequest index.
                     * @member {google.firestore.admin.v1.IIndex|null|undefined} index
                     * @memberof google.firestore.admin.v1.CreateIndexRequest
                     * @instance
                     */
                    CreateIndexRequest.prototype.index = null;

                    return CreateIndexRequest;
                })();

                v1.ListIndexesRequest = (function() {

                    /**
                     * Properties of a ListIndexesRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IListIndexesRequest
                     * @property {string|null} [parent] ListIndexesRequest parent
                     * @property {string|null} [filter] ListIndexesRequest filter
                     * @property {number|null} [pageSize] ListIndexesRequest pageSize
                     * @property {string|null} [pageToken] ListIndexesRequest pageToken
                     */

                    /**
                     * Constructs a new ListIndexesRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a ListIndexesRequest.
                     * @implements IListIndexesRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IListIndexesRequest=} [properties] Properties to set
                     */
                    function ListIndexesRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ListIndexesRequest parent.
                     * @member {string} parent
                     * @memberof google.firestore.admin.v1.ListIndexesRequest
                     * @instance
                     */
                    ListIndexesRequest.prototype.parent = "";

                    /**
                     * ListIndexesRequest filter.
                     * @member {string} filter
                     * @memberof google.firestore.admin.v1.ListIndexesRequest
                     * @instance
                     */
                    ListIndexesRequest.prototype.filter = "";

                    /**
                     * ListIndexesRequest pageSize.
                     * @member {number} pageSize
                     * @memberof google.firestore.admin.v1.ListIndexesRequest
                     * @instance
                     */
                    ListIndexesRequest.prototype.pageSize = 0;

                    /**
                     * ListIndexesRequest pageToken.
                     * @member {string} pageToken
                     * @memberof google.firestore.admin.v1.ListIndexesRequest
                     * @instance
                     */
                    ListIndexesRequest.prototype.pageToken = "";

                    return ListIndexesRequest;
                })();

                v1.ListIndexesResponse = (function() {

                    /**
                     * Properties of a ListIndexesResponse.
                     * @memberof google.firestore.admin.v1
                     * @interface IListIndexesResponse
                     * @property {Array.<google.firestore.admin.v1.IIndex>|null} [indexes] ListIndexesResponse indexes
                     * @property {string|null} [nextPageToken] ListIndexesResponse nextPageToken
                     */

                    /**
                     * Constructs a new ListIndexesResponse.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a ListIndexesResponse.
                     * @implements IListIndexesResponse
                     * @constructor
                     * @param {google.firestore.admin.v1.IListIndexesResponse=} [properties] Properties to set
                     */
                    function ListIndexesResponse(properties) {
                        this.indexes = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ListIndexesResponse indexes.
                     * @member {Array.<google.firestore.admin.v1.IIndex>} indexes
                     * @memberof google.firestore.admin.v1.ListIndexesResponse
                     * @instance
                     */
                    ListIndexesResponse.prototype.indexes = $util.emptyArray;

                    /**
                     * ListIndexesResponse nextPageToken.
                     * @member {string} nextPageToken
                     * @memberof google.firestore.admin.v1.ListIndexesResponse
                     * @instance
                     */
                    ListIndexesResponse.prototype.nextPageToken = "";

                    return ListIndexesResponse;
                })();

                v1.GetIndexRequest = (function() {

                    /**
                     * Properties of a GetIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IGetIndexRequest
                     * @property {string|null} [name] GetIndexRequest name
                     */

                    /**
                     * Constructs a new GetIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a GetIndexRequest.
                     * @implements IGetIndexRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IGetIndexRequest=} [properties] Properties to set
                     */
                    function GetIndexRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GetIndexRequest name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.GetIndexRequest
                     * @instance
                     */
                    GetIndexRequest.prototype.name = "";

                    return GetIndexRequest;
                })();

                v1.DeleteIndexRequest = (function() {

                    /**
                     * Properties of a DeleteIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IDeleteIndexRequest
                     * @property {string|null} [name] DeleteIndexRequest name
                     */

                    /**
                     * Constructs a new DeleteIndexRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a DeleteIndexRequest.
                     * @implements IDeleteIndexRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IDeleteIndexRequest=} [properties] Properties to set
                     */
                    function DeleteIndexRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * DeleteIndexRequest name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.DeleteIndexRequest
                     * @instance
                     */
                    DeleteIndexRequest.prototype.name = "";

                    return DeleteIndexRequest;
                })();

                v1.UpdateFieldRequest = (function() {

                    /**
                     * Properties of an UpdateFieldRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IUpdateFieldRequest
                     * @property {google.firestore.admin.v1.IField|null} [field] UpdateFieldRequest field
                     * @property {google.protobuf.IFieldMask|null} [updateMask] UpdateFieldRequest updateMask
                     */

                    /**
                     * Constructs a new UpdateFieldRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an UpdateFieldRequest.
                     * @implements IUpdateFieldRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IUpdateFieldRequest=} [properties] Properties to set
                     */
                    function UpdateFieldRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * UpdateFieldRequest field.
                     * @member {google.firestore.admin.v1.IField|null|undefined} field
                     * @memberof google.firestore.admin.v1.UpdateFieldRequest
                     * @instance
                     */
                    UpdateFieldRequest.prototype.field = null;

                    /**
                     * UpdateFieldRequest updateMask.
                     * @member {google.protobuf.IFieldMask|null|undefined} updateMask
                     * @memberof google.firestore.admin.v1.UpdateFieldRequest
                     * @instance
                     */
                    UpdateFieldRequest.prototype.updateMask = null;

                    return UpdateFieldRequest;
                })();

                v1.GetFieldRequest = (function() {

                    /**
                     * Properties of a GetFieldRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IGetFieldRequest
                     * @property {string|null} [name] GetFieldRequest name
                     */

                    /**
                     * Constructs a new GetFieldRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a GetFieldRequest.
                     * @implements IGetFieldRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IGetFieldRequest=} [properties] Properties to set
                     */
                    function GetFieldRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GetFieldRequest name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.GetFieldRequest
                     * @instance
                     */
                    GetFieldRequest.prototype.name = "";

                    return GetFieldRequest;
                })();

                v1.ListFieldsRequest = (function() {

                    /**
                     * Properties of a ListFieldsRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IListFieldsRequest
                     * @property {string|null} [parent] ListFieldsRequest parent
                     * @property {string|null} [filter] ListFieldsRequest filter
                     * @property {number|null} [pageSize] ListFieldsRequest pageSize
                     * @property {string|null} [pageToken] ListFieldsRequest pageToken
                     */

                    /**
                     * Constructs a new ListFieldsRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a ListFieldsRequest.
                     * @implements IListFieldsRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IListFieldsRequest=} [properties] Properties to set
                     */
                    function ListFieldsRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ListFieldsRequest parent.
                     * @member {string} parent
                     * @memberof google.firestore.admin.v1.ListFieldsRequest
                     * @instance
                     */
                    ListFieldsRequest.prototype.parent = "";

                    /**
                     * ListFieldsRequest filter.
                     * @member {string} filter
                     * @memberof google.firestore.admin.v1.ListFieldsRequest
                     * @instance
                     */
                    ListFieldsRequest.prototype.filter = "";

                    /**
                     * ListFieldsRequest pageSize.
                     * @member {number} pageSize
                     * @memberof google.firestore.admin.v1.ListFieldsRequest
                     * @instance
                     */
                    ListFieldsRequest.prototype.pageSize = 0;

                    /**
                     * ListFieldsRequest pageToken.
                     * @member {string} pageToken
                     * @memberof google.firestore.admin.v1.ListFieldsRequest
                     * @instance
                     */
                    ListFieldsRequest.prototype.pageToken = "";

                    return ListFieldsRequest;
                })();

                v1.ListFieldsResponse = (function() {

                    /**
                     * Properties of a ListFieldsResponse.
                     * @memberof google.firestore.admin.v1
                     * @interface IListFieldsResponse
                     * @property {Array.<google.firestore.admin.v1.IField>|null} [fields] ListFieldsResponse fields
                     * @property {string|null} [nextPageToken] ListFieldsResponse nextPageToken
                     */

                    /**
                     * Constructs a new ListFieldsResponse.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a ListFieldsResponse.
                     * @implements IListFieldsResponse
                     * @constructor
                     * @param {google.firestore.admin.v1.IListFieldsResponse=} [properties] Properties to set
                     */
                    function ListFieldsResponse(properties) {
                        this.fields = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ListFieldsResponse fields.
                     * @member {Array.<google.firestore.admin.v1.IField>} fields
                     * @memberof google.firestore.admin.v1.ListFieldsResponse
                     * @instance
                     */
                    ListFieldsResponse.prototype.fields = $util.emptyArray;

                    /**
                     * ListFieldsResponse nextPageToken.
                     * @member {string} nextPageToken
                     * @memberof google.firestore.admin.v1.ListFieldsResponse
                     * @instance
                     */
                    ListFieldsResponse.prototype.nextPageToken = "";

                    return ListFieldsResponse;
                })();

                v1.ExportDocumentsRequest = (function() {

                    /**
                     * Properties of an ExportDocumentsRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IExportDocumentsRequest
                     * @property {string|null} [name] ExportDocumentsRequest name
                     * @property {Array.<string>|null} [collectionIds] ExportDocumentsRequest collectionIds
                     * @property {string|null} [outputUriPrefix] ExportDocumentsRequest outputUriPrefix
                     */

                    /**
                     * Constructs a new ExportDocumentsRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an ExportDocumentsRequest.
                     * @implements IExportDocumentsRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IExportDocumentsRequest=} [properties] Properties to set
                     */
                    function ExportDocumentsRequest(properties) {
                        this.collectionIds = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ExportDocumentsRequest name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.ExportDocumentsRequest
                     * @instance
                     */
                    ExportDocumentsRequest.prototype.name = "";

                    /**
                     * ExportDocumentsRequest collectionIds.
                     * @member {Array.<string>} collectionIds
                     * @memberof google.firestore.admin.v1.ExportDocumentsRequest
                     * @instance
                     */
                    ExportDocumentsRequest.prototype.collectionIds = $util.emptyArray;

                    /**
                     * ExportDocumentsRequest outputUriPrefix.
                     * @member {string} outputUriPrefix
                     * @memberof google.firestore.admin.v1.ExportDocumentsRequest
                     * @instance
                     */
                    ExportDocumentsRequest.prototype.outputUriPrefix = "";

                    return ExportDocumentsRequest;
                })();

                v1.ImportDocumentsRequest = (function() {

                    /**
                     * Properties of an ImportDocumentsRequest.
                     * @memberof google.firestore.admin.v1
                     * @interface IImportDocumentsRequest
                     * @property {string|null} [name] ImportDocumentsRequest name
                     * @property {Array.<string>|null} [collectionIds] ImportDocumentsRequest collectionIds
                     * @property {string|null} [inputUriPrefix] ImportDocumentsRequest inputUriPrefix
                     */

                    /**
                     * Constructs a new ImportDocumentsRequest.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an ImportDocumentsRequest.
                     * @implements IImportDocumentsRequest
                     * @constructor
                     * @param {google.firestore.admin.v1.IImportDocumentsRequest=} [properties] Properties to set
                     */
                    function ImportDocumentsRequest(properties) {
                        this.collectionIds = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ImportDocumentsRequest name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.ImportDocumentsRequest
                     * @instance
                     */
                    ImportDocumentsRequest.prototype.name = "";

                    /**
                     * ImportDocumentsRequest collectionIds.
                     * @member {Array.<string>} collectionIds
                     * @memberof google.firestore.admin.v1.ImportDocumentsRequest
                     * @instance
                     */
                    ImportDocumentsRequest.prototype.collectionIds = $util.emptyArray;

                    /**
                     * ImportDocumentsRequest inputUriPrefix.
                     * @member {string} inputUriPrefix
                     * @memberof google.firestore.admin.v1.ImportDocumentsRequest
                     * @instance
                     */
                    ImportDocumentsRequest.prototype.inputUriPrefix = "";

                    return ImportDocumentsRequest;
                })();

                v1.Index = (function() {

                    /**
                     * Properties of an Index.
                     * @memberof google.firestore.admin.v1
                     * @interface IIndex
                     * @property {string|null} [name] Index name
                     * @property {google.firestore.admin.v1.Index.QueryScope|null} [queryScope] Index queryScope
                     * @property {Array.<google.firestore.admin.v1.Index.IIndexField>|null} [fields] Index fields
                     * @property {google.firestore.admin.v1.Index.State|null} [state] Index state
                     */

                    /**
                     * Constructs a new Index.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an Index.
                     * @implements IIndex
                     * @constructor
                     * @param {google.firestore.admin.v1.IIndex=} [properties] Properties to set
                     */
                    function Index(properties) {
                        this.fields = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Index name.
                     * @member {string} name
                     * @memberof google.firestore.admin.v1.Index
                     * @instance
                     */
                    Index.prototype.name = "";

                    /**
                     * Index queryScope.
                     * @member {google.firestore.admin.v1.Index.QueryScope} queryScope
                     * @memberof google.firestore.admin.v1.Index
                     * @instance
                     */
                    Index.prototype.queryScope = 0;

                    /**
                     * Index fields.
                     * @member {Array.<google.firestore.admin.v1.Index.IIndexField>} fields
                     * @memberof google.firestore.admin.v1.Index
                     * @instance
                     */
                    Index.prototype.fields = $util.emptyArray;

                    /**
                     * Index state.
                     * @member {google.firestore.admin.v1.Index.State} state
                     * @memberof google.firestore.admin.v1.Index
                     * @instance
                     */
                    Index.prototype.state = 0;

                    Index.IndexField = (function() {

                        /**
                         * Properties of an IndexField.
                         * @memberof google.firestore.admin.v1.Index
                         * @interface IIndexField
                         * @property {string|null} [fieldPath] IndexField fieldPath
                         * @property {google.firestore.admin.v1.Index.IndexField.Order|null} [order] IndexField order
                         * @property {google.firestore.admin.v1.Index.IndexField.ArrayConfig|null} [arrayConfig] IndexField arrayConfig
                         */

                        /**
                         * Constructs a new IndexField.
                         * @memberof google.firestore.admin.v1.Index
                         * @classdesc Represents an IndexField.
                         * @implements IIndexField
                         * @constructor
                         * @param {google.firestore.admin.v1.Index.IIndexField=} [properties] Properties to set
                         */
                        function IndexField(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * IndexField fieldPath.
                         * @member {string} fieldPath
                         * @memberof google.firestore.admin.v1.Index.IndexField
                         * @instance
                         */
                        IndexField.prototype.fieldPath = "";

                        /**
                         * IndexField order.
                         * @member {google.firestore.admin.v1.Index.IndexField.Order} order
                         * @memberof google.firestore.admin.v1.Index.IndexField
                         * @instance
                         */
                        IndexField.prototype.order = 0;

                        /**
                         * IndexField arrayConfig.
                         * @member {google.firestore.admin.v1.Index.IndexField.ArrayConfig} arrayConfig
                         * @memberof google.firestore.admin.v1.Index.IndexField
                         * @instance
                         */
                        IndexField.prototype.arrayConfig = 0;

                        // OneOf field names bound to virtual getters and setters
                        var $oneOfFields;

                        /**
                         * IndexField valueMode.
                         * @member {"order"|"arrayConfig"|undefined} valueMode
                         * @memberof google.firestore.admin.v1.Index.IndexField
                         * @instance
                         */
                        Object.defineProperty(IndexField.prototype, "valueMode", {
                            get: $util.oneOfGetter($oneOfFields = ["order", "arrayConfig"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Order enum.
                         * @name google.firestore.admin.v1.Index.IndexField.Order
                         * @enum {number}
                         * @property {string} ORDER_UNSPECIFIED=ORDER_UNSPECIFIED ORDER_UNSPECIFIED value
                         * @property {string} ASCENDING=ASCENDING ASCENDING value
                         * @property {string} DESCENDING=DESCENDING DESCENDING value
                         */
                        IndexField.Order = (function() {
                            var valuesById = {}, values = Object.create(valuesById);
                            values[valuesById[0] = "ORDER_UNSPECIFIED"] = "ORDER_UNSPECIFIED";
                            values[valuesById[1] = "ASCENDING"] = "ASCENDING";
                            values[valuesById[2] = "DESCENDING"] = "DESCENDING";
                            return values;
                        })();

                        /**
                         * ArrayConfig enum.
                         * @name google.firestore.admin.v1.Index.IndexField.ArrayConfig
                         * @enum {number}
                         * @property {string} ARRAY_CONFIG_UNSPECIFIED=ARRAY_CONFIG_UNSPECIFIED ARRAY_CONFIG_UNSPECIFIED value
                         * @property {string} CONTAINS=CONTAINS CONTAINS value
                         */
                        IndexField.ArrayConfig = (function() {
                            var valuesById = {}, values = Object.create(valuesById);
                            values[valuesById[0] = "ARRAY_CONFIG_UNSPECIFIED"] = "ARRAY_CONFIG_UNSPECIFIED";
                            values[valuesById[1] = "CONTAINS"] = "CONTAINS";
                            return values;
                        })();

                        return IndexField;
                    })();

                    /**
                     * QueryScope enum.
                     * @name google.firestore.admin.v1.Index.QueryScope
                     * @enum {number}
                     * @property {string} QUERY_SCOPE_UNSPECIFIED=QUERY_SCOPE_UNSPECIFIED QUERY_SCOPE_UNSPECIFIED value
                     * @property {string} COLLECTION=COLLECTION COLLECTION value
                     * @property {string} COLLECTION_GROUP=COLLECTION_GROUP COLLECTION_GROUP value
                     */
                    Index.QueryScope = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "QUERY_SCOPE_UNSPECIFIED"] = "QUERY_SCOPE_UNSPECIFIED";
                        values[valuesById[1] = "COLLECTION"] = "COLLECTION";
                        values[valuesById[2] = "COLLECTION_GROUP"] = "COLLECTION_GROUP";
                        return values;
                    })();

                    /**
                     * State enum.
                     * @name google.firestore.admin.v1.Index.State
                     * @enum {number}
                     * @property {string} STATE_UNSPECIFIED=STATE_UNSPECIFIED STATE_UNSPECIFIED value
                     * @property {string} CREATING=CREATING CREATING value
                     * @property {string} READY=READY READY value
                     * @property {string} NEEDS_REPAIR=NEEDS_REPAIR NEEDS_REPAIR value
                     */
                    Index.State = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
                        values[valuesById[1] = "CREATING"] = "CREATING";
                        values[valuesById[2] = "READY"] = "READY";
                        values[valuesById[3] = "NEEDS_REPAIR"] = "NEEDS_REPAIR";
                        return values;
                    })();

                    return Index;
                })();

                v1.LocationMetadata = (function() {

                    /**
                     * Properties of a LocationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @interface ILocationMetadata
                     */

                    /**
                     * Constructs a new LocationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a LocationMetadata.
                     * @implements ILocationMetadata
                     * @constructor
                     * @param {google.firestore.admin.v1.ILocationMetadata=} [properties] Properties to set
                     */
                    function LocationMetadata(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    return LocationMetadata;
                })();

                v1.IndexOperationMetadata = (function() {

                    /**
                     * Properties of an IndexOperationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @interface IIndexOperationMetadata
                     * @property {google.protobuf.ITimestamp|null} [startTime] IndexOperationMetadata startTime
                     * @property {google.protobuf.ITimestamp|null} [endTime] IndexOperationMetadata endTime
                     * @property {string|null} [index] IndexOperationMetadata index
                     * @property {google.firestore.admin.v1.OperationState|null} [state] IndexOperationMetadata state
                     * @property {google.firestore.admin.v1.IProgress|null} [progressDocuments] IndexOperationMetadata progressDocuments
                     * @property {google.firestore.admin.v1.IProgress|null} [progressBytes] IndexOperationMetadata progressBytes
                     */

                    /**
                     * Constructs a new IndexOperationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an IndexOperationMetadata.
                     * @implements IIndexOperationMetadata
                     * @constructor
                     * @param {google.firestore.admin.v1.IIndexOperationMetadata=} [properties] Properties to set
                     */
                    function IndexOperationMetadata(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * IndexOperationMetadata startTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} startTime
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.startTime = null;

                    /**
                     * IndexOperationMetadata endTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} endTime
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.endTime = null;

                    /**
                     * IndexOperationMetadata index.
                     * @member {string} index
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.index = "";

                    /**
                     * IndexOperationMetadata state.
                     * @member {google.firestore.admin.v1.OperationState} state
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.state = 0;

                    /**
                     * IndexOperationMetadata progressDocuments.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressDocuments
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.progressDocuments = null;

                    /**
                     * IndexOperationMetadata progressBytes.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressBytes
                     * @memberof google.firestore.admin.v1.IndexOperationMetadata
                     * @instance
                     */
                    IndexOperationMetadata.prototype.progressBytes = null;

                    return IndexOperationMetadata;
                })();

                v1.FieldOperationMetadata = (function() {

                    /**
                     * Properties of a FieldOperationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @interface IFieldOperationMetadata
                     * @property {google.protobuf.ITimestamp|null} [startTime] FieldOperationMetadata startTime
                     * @property {google.protobuf.ITimestamp|null} [endTime] FieldOperationMetadata endTime
                     * @property {string|null} [field] FieldOperationMetadata field
                     * @property {Array.<google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta>|null} [indexConfigDeltas] FieldOperationMetadata indexConfigDeltas
                     * @property {google.firestore.admin.v1.OperationState|null} [state] FieldOperationMetadata state
                     * @property {google.firestore.admin.v1.IProgress|null} [progressDocuments] FieldOperationMetadata progressDocuments
                     * @property {google.firestore.admin.v1.IProgress|null} [progressBytes] FieldOperationMetadata progressBytes
                     */

                    /**
                     * Constructs a new FieldOperationMetadata.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a FieldOperationMetadata.
                     * @implements IFieldOperationMetadata
                     * @constructor
                     * @param {google.firestore.admin.v1.IFieldOperationMetadata=} [properties] Properties to set
                     */
                    function FieldOperationMetadata(properties) {
                        this.indexConfigDeltas = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * FieldOperationMetadata startTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} startTime
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.startTime = null;

                    /**
                     * FieldOperationMetadata endTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} endTime
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.endTime = null;

                    /**
                     * FieldOperationMetadata field.
                     * @member {string} field
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.field = "";

                    /**
                     * FieldOperationMetadata indexConfigDeltas.
                     * @member {Array.<google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta>} indexConfigDeltas
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.indexConfigDeltas = $util.emptyArray;

                    /**
                     * FieldOperationMetadata state.
                     * @member {google.firestore.admin.v1.OperationState} state
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.state = 0;

                    /**
                     * FieldOperationMetadata progressDocuments.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressDocuments
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.progressDocuments = null;

                    /**
                     * FieldOperationMetadata progressBytes.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressBytes
                     * @memberof google.firestore.admin.v1.FieldOperationMetadata
                     * @instance
                     */
                    FieldOperationMetadata.prototype.progressBytes = null;

                    FieldOperationMetadata.IndexConfigDelta = (function() {

                        /**
                         * Properties of an IndexConfigDelta.
                         * @memberof google.firestore.admin.v1.FieldOperationMetadata
                         * @interface IIndexConfigDelta
                         * @property {google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta.ChangeType|null} [changeType] IndexConfigDelta changeType
                         * @property {google.firestore.admin.v1.IIndex|null} [index] IndexConfigDelta index
                         */

                        /**
                         * Constructs a new IndexConfigDelta.
                         * @memberof google.firestore.admin.v1.FieldOperationMetadata
                         * @classdesc Represents an IndexConfigDelta.
                         * @implements IIndexConfigDelta
                         * @constructor
                         * @param {google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta=} [properties] Properties to set
                         */
                        function IndexConfigDelta(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * IndexConfigDelta changeType.
                         * @member {google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta.ChangeType} changeType
                         * @memberof google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta
                         * @instance
                         */
                        IndexConfigDelta.prototype.changeType = 0;

                        /**
                         * IndexConfigDelta index.
                         * @member {google.firestore.admin.v1.IIndex|null|undefined} index
                         * @memberof google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta
                         * @instance
                         */
                        IndexConfigDelta.prototype.index = null;

                        /**
                         * ChangeType enum.
                         * @name google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta.ChangeType
                         * @enum {number}
                         * @property {string} CHANGE_TYPE_UNSPECIFIED=CHANGE_TYPE_UNSPECIFIED CHANGE_TYPE_UNSPECIFIED value
                         * @property {string} ADD=ADD ADD value
                         * @property {string} REMOVE=REMOVE REMOVE value
                         */
                        IndexConfigDelta.ChangeType = (function() {
                            var valuesById = {}, values = Object.create(valuesById);
                            values[valuesById[0] = "CHANGE_TYPE_UNSPECIFIED"] = "CHANGE_TYPE_UNSPECIFIED";
                            values[valuesById[1] = "ADD"] = "ADD";
                            values[valuesById[2] = "REMOVE"] = "REMOVE";
                            return values;
                        })();

                        return IndexConfigDelta;
                    })();

                    return FieldOperationMetadata;
                })();

                v1.ExportDocumentsMetadata = (function() {

                    /**
                     * Properties of an ExportDocumentsMetadata.
                     * @memberof google.firestore.admin.v1
                     * @interface IExportDocumentsMetadata
                     * @property {google.protobuf.ITimestamp|null} [startTime] ExportDocumentsMetadata startTime
                     * @property {google.protobuf.ITimestamp|null} [endTime] ExportDocumentsMetadata endTime
                     * @property {google.firestore.admin.v1.OperationState|null} [operationState] ExportDocumentsMetadata operationState
                     * @property {google.firestore.admin.v1.IProgress|null} [progressDocuments] ExportDocumentsMetadata progressDocuments
                     * @property {google.firestore.admin.v1.IProgress|null} [progressBytes] ExportDocumentsMetadata progressBytes
                     * @property {Array.<string>|null} [collectionIds] ExportDocumentsMetadata collectionIds
                     * @property {string|null} [outputUriPrefix] ExportDocumentsMetadata outputUriPrefix
                     */

                    /**
                     * Constructs a new ExportDocumentsMetadata.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an ExportDocumentsMetadata.
                     * @implements IExportDocumentsMetadata
                     * @constructor
                     * @param {google.firestore.admin.v1.IExportDocumentsMetadata=} [properties] Properties to set
                     */
                    function ExportDocumentsMetadata(properties) {
                        this.collectionIds = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ExportDocumentsMetadata startTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} startTime
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.startTime = null;

                    /**
                     * ExportDocumentsMetadata endTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} endTime
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.endTime = null;

                    /**
                     * ExportDocumentsMetadata operationState.
                     * @member {google.firestore.admin.v1.OperationState} operationState
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.operationState = 0;

                    /**
                     * ExportDocumentsMetadata progressDocuments.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressDocuments
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.progressDocuments = null;

                    /**
                     * ExportDocumentsMetadata progressBytes.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressBytes
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.progressBytes = null;

                    /**
                     * ExportDocumentsMetadata collectionIds.
                     * @member {Array.<string>} collectionIds
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.collectionIds = $util.emptyArray;

                    /**
                     * ExportDocumentsMetadata outputUriPrefix.
                     * @member {string} outputUriPrefix
                     * @memberof google.firestore.admin.v1.ExportDocumentsMetadata
                     * @instance
                     */
                    ExportDocumentsMetadata.prototype.outputUriPrefix = "";

                    return ExportDocumentsMetadata;
                })();

                v1.ImportDocumentsMetadata = (function() {

                    /**
                     * Properties of an ImportDocumentsMetadata.
                     * @memberof google.firestore.admin.v1
                     * @interface IImportDocumentsMetadata
                     * @property {google.protobuf.ITimestamp|null} [startTime] ImportDocumentsMetadata startTime
                     * @property {google.protobuf.ITimestamp|null} [endTime] ImportDocumentsMetadata endTime
                     * @property {google.firestore.admin.v1.OperationState|null} [operationState] ImportDocumentsMetadata operationState
                     * @property {google.firestore.admin.v1.IProgress|null} [progressDocuments] ImportDocumentsMetadata progressDocuments
                     * @property {google.firestore.admin.v1.IProgress|null} [progressBytes] ImportDocumentsMetadata progressBytes
                     * @property {Array.<string>|null} [collectionIds] ImportDocumentsMetadata collectionIds
                     * @property {string|null} [inputUriPrefix] ImportDocumentsMetadata inputUriPrefix
                     */

                    /**
                     * Constructs a new ImportDocumentsMetadata.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an ImportDocumentsMetadata.
                     * @implements IImportDocumentsMetadata
                     * @constructor
                     * @param {google.firestore.admin.v1.IImportDocumentsMetadata=} [properties] Properties to set
                     */
                    function ImportDocumentsMetadata(properties) {
                        this.collectionIds = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ImportDocumentsMetadata startTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} startTime
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.startTime = null;

                    /**
                     * ImportDocumentsMetadata endTime.
                     * @member {google.protobuf.ITimestamp|null|undefined} endTime
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.endTime = null;

                    /**
                     * ImportDocumentsMetadata operationState.
                     * @member {google.firestore.admin.v1.OperationState} operationState
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.operationState = 0;

                    /**
                     * ImportDocumentsMetadata progressDocuments.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressDocuments
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.progressDocuments = null;

                    /**
                     * ImportDocumentsMetadata progressBytes.
                     * @member {google.firestore.admin.v1.IProgress|null|undefined} progressBytes
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.progressBytes = null;

                    /**
                     * ImportDocumentsMetadata collectionIds.
                     * @member {Array.<string>} collectionIds
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.collectionIds = $util.emptyArray;

                    /**
                     * ImportDocumentsMetadata inputUriPrefix.
                     * @member {string} inputUriPrefix
                     * @memberof google.firestore.admin.v1.ImportDocumentsMetadata
                     * @instance
                     */
                    ImportDocumentsMetadata.prototype.inputUriPrefix = "";

                    return ImportDocumentsMetadata;
                })();

                v1.ExportDocumentsResponse = (function() {

                    /**
                     * Properties of an ExportDocumentsResponse.
                     * @memberof google.firestore.admin.v1
                     * @interface IExportDocumentsResponse
                     * @property {string|null} [outputUriPrefix] ExportDocumentsResponse outputUriPrefix
                     */

                    /**
                     * Constructs a new ExportDocumentsResponse.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents an ExportDocumentsResponse.
                     * @implements IExportDocumentsResponse
                     * @constructor
                     * @param {google.firestore.admin.v1.IExportDocumentsResponse=} [properties] Properties to set
                     */
                    function ExportDocumentsResponse(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ExportDocumentsResponse outputUriPrefix.
                     * @member {string} outputUriPrefix
                     * @memberof google.firestore.admin.v1.ExportDocumentsResponse
                     * @instance
                     */
                    ExportDocumentsResponse.prototype.outputUriPrefix = "";

                    return ExportDocumentsResponse;
                })();

                v1.Progress = (function() {

                    /**
                     * Properties of a Progress.
                     * @memberof google.firestore.admin.v1
                     * @interface IProgress
                     * @property {number|null} [estimatedWork] Progress estimatedWork
                     * @property {number|null} [completedWork] Progress completedWork
                     */

                    /**
                     * Constructs a new Progress.
                     * @memberof google.firestore.admin.v1
                     * @classdesc Represents a Progress.
                     * @implements IProgress
                     * @constructor
                     * @param {google.firestore.admin.v1.IProgress=} [properties] Properties to set
                     */
                    function Progress(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Progress estimatedWork.
                     * @member {number} estimatedWork
                     * @memberof google.firestore.admin.v1.Progress
                     * @instance
                     */
                    Progress.prototype.estimatedWork = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Progress completedWork.
                     * @member {number} completedWork
                     * @memberof google.firestore.admin.v1.Progress
                     * @instance
                     */
                    Progress.prototype.completedWork = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    return Progress;
                })();

                /**
                 * OperationState enum.
                 * @name google.firestore.admin.v1.OperationState
                 * @enum {number}
                 * @property {string} OPERATION_STATE_UNSPECIFIED=OPERATION_STATE_UNSPECIFIED OPERATION_STATE_UNSPECIFIED value
                 * @property {string} INITIALIZING=INITIALIZING INITIALIZING value
                 * @property {string} PROCESSING=PROCESSING PROCESSING value
                 * @property {string} CANCELLING=CANCELLING CANCELLING value
                 * @property {string} FINALIZING=FINALIZING FINALIZING value
                 * @property {string} SUCCESSFUL=SUCCESSFUL SUCCESSFUL value
                 * @property {string} FAILED=FAILED FAILED value
                 * @property {string} CANCELLED=CANCELLED CANCELLED value
                 */
                v1.OperationState = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "OPERATION_STATE_UNSPECIFIED"] = "OPERATION_STATE_UNSPECIFIED";
                    values[valuesById[1] = "INITIALIZING"] = "INITIALIZING";
                    values[valuesById[2] = "PROCESSING"] = "PROCESSING";
                    values[valuesById[3] = "CANCELLING"] = "CANCELLING";
                    values[valuesById[4] = "FINALIZING"] = "FINALIZING";
                    values[valuesById[5] = "SUCCESSFUL"] = "SUCCESSFUL";
                    values[valuesById[6] = "FAILED"] = "FAILED";
                    values[valuesById[7] = "CANCELLED"] = "CANCELLED";
                    return values;
                })();

                return v1;
            })();

            return admin;
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

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

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
