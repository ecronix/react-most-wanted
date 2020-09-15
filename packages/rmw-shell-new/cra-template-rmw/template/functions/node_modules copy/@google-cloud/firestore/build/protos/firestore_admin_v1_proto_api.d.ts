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

import * as $protobuf from "protobufjs";
/** Namespace google. */
export namespace google {

    /** Namespace firestore. */
    namespace firestore {

        /** Namespace admin. */
        namespace admin {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a Field. */
                interface IField {

                    /** Field name */
                    name?: (string|null);

                    /** Field indexConfig */
                    indexConfig?: (google.firestore.admin.v1.Field.IIndexConfig|null);
                }

                /** Represents a Field. */
                class Field implements IField {

                    /**
                     * Constructs a new Field.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IField);

                    /** Field name. */
                    public name: string;

                    /** Field indexConfig. */
                    public indexConfig?: (google.firestore.admin.v1.Field.IIndexConfig|null);
                }

                namespace Field {

                    /** Properties of an IndexConfig. */
                    interface IIndexConfig {

                        /** IndexConfig indexes */
                        indexes?: (google.firestore.admin.v1.IIndex[]|null);

                        /** IndexConfig usesAncestorConfig */
                        usesAncestorConfig?: (boolean|null);

                        /** IndexConfig ancestorField */
                        ancestorField?: (string|null);

                        /** IndexConfig reverting */
                        reverting?: (boolean|null);
                    }

                    /** Represents an IndexConfig. */
                    class IndexConfig implements IIndexConfig {

                        /**
                         * Constructs a new IndexConfig.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.firestore.admin.v1.Field.IIndexConfig);

                        /** IndexConfig indexes. */
                        public indexes: google.firestore.admin.v1.IIndex[];

                        /** IndexConfig usesAncestorConfig. */
                        public usesAncestorConfig: boolean;

                        /** IndexConfig ancestorField. */
                        public ancestorField: string;

                        /** IndexConfig reverting. */
                        public reverting: boolean;
                    }
                }

                /** Represents a FirestoreAdmin */
                class FirestoreAdmin extends $protobuf.rpc.Service {

                    /**
                     * Constructs a new FirestoreAdmin service.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     */
                    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                    /**
                     * Calls CreateIndex.
                     * @param request CreateIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public createIndex(request: google.firestore.admin.v1.ICreateIndexRequest, callback: google.firestore.admin.v1.FirestoreAdmin.CreateIndexCallback): void;

                    /**
                     * Calls CreateIndex.
                     * @param request CreateIndexRequest message or plain object
                     * @returns Promise
                     */
                    public createIndex(request: google.firestore.admin.v1.ICreateIndexRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls ListIndexes.
                     * @param request ListIndexesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListIndexesResponse
                     */
                    public listIndexes(request: google.firestore.admin.v1.IListIndexesRequest, callback: google.firestore.admin.v1.FirestoreAdmin.ListIndexesCallback): void;

                    /**
                     * Calls ListIndexes.
                     * @param request ListIndexesRequest message or plain object
                     * @returns Promise
                     */
                    public listIndexes(request: google.firestore.admin.v1.IListIndexesRequest): Promise<google.firestore.admin.v1.ListIndexesResponse>;

                    /**
                     * Calls GetIndex.
                     * @param request GetIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Index
                     */
                    public getIndex(request: google.firestore.admin.v1.IGetIndexRequest, callback: google.firestore.admin.v1.FirestoreAdmin.GetIndexCallback): void;

                    /**
                     * Calls GetIndex.
                     * @param request GetIndexRequest message or plain object
                     * @returns Promise
                     */
                    public getIndex(request: google.firestore.admin.v1.IGetIndexRequest): Promise<google.firestore.admin.v1.Index>;

                    /**
                     * Calls DeleteIndex.
                     * @param request DeleteIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteIndex(request: google.firestore.admin.v1.IDeleteIndexRequest, callback: google.firestore.admin.v1.FirestoreAdmin.DeleteIndexCallback): void;

                    /**
                     * Calls DeleteIndex.
                     * @param request DeleteIndexRequest message or plain object
                     * @returns Promise
                     */
                    public deleteIndex(request: google.firestore.admin.v1.IDeleteIndexRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls GetField.
                     * @param request GetFieldRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Field
                     */
                    public getField(request: google.firestore.admin.v1.IGetFieldRequest, callback: google.firestore.admin.v1.FirestoreAdmin.GetFieldCallback): void;

                    /**
                     * Calls GetField.
                     * @param request GetFieldRequest message or plain object
                     * @returns Promise
                     */
                    public getField(request: google.firestore.admin.v1.IGetFieldRequest): Promise<google.firestore.admin.v1.Field>;

                    /**
                     * Calls UpdateField.
                     * @param request UpdateFieldRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public updateField(request: google.firestore.admin.v1.IUpdateFieldRequest, callback: google.firestore.admin.v1.FirestoreAdmin.UpdateFieldCallback): void;

                    /**
                     * Calls UpdateField.
                     * @param request UpdateFieldRequest message or plain object
                     * @returns Promise
                     */
                    public updateField(request: google.firestore.admin.v1.IUpdateFieldRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls ListFields.
                     * @param request ListFieldsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListFieldsResponse
                     */
                    public listFields(request: google.firestore.admin.v1.IListFieldsRequest, callback: google.firestore.admin.v1.FirestoreAdmin.ListFieldsCallback): void;

                    /**
                     * Calls ListFields.
                     * @param request ListFieldsRequest message or plain object
                     * @returns Promise
                     */
                    public listFields(request: google.firestore.admin.v1.IListFieldsRequest): Promise<google.firestore.admin.v1.ListFieldsResponse>;

                    /**
                     * Calls ExportDocuments.
                     * @param request ExportDocumentsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public exportDocuments(request: google.firestore.admin.v1.IExportDocumentsRequest, callback: google.firestore.admin.v1.FirestoreAdmin.ExportDocumentsCallback): void;

                    /**
                     * Calls ExportDocuments.
                     * @param request ExportDocumentsRequest message or plain object
                     * @returns Promise
                     */
                    public exportDocuments(request: google.firestore.admin.v1.IExportDocumentsRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls ImportDocuments.
                     * @param request ImportDocumentsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public importDocuments(request: google.firestore.admin.v1.IImportDocumentsRequest, callback: google.firestore.admin.v1.FirestoreAdmin.ImportDocumentsCallback): void;

                    /**
                     * Calls ImportDocuments.
                     * @param request ImportDocumentsRequest message or plain object
                     * @returns Promise
                     */
                    public importDocuments(request: google.firestore.admin.v1.IImportDocumentsRequest): Promise<google.longrunning.Operation>;
                }

                namespace FirestoreAdmin {

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#createIndex}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type CreateIndexCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#listIndexes}.
                     * @param error Error, if any
                     * @param [response] ListIndexesResponse
                     */
                    type ListIndexesCallback = (error: (Error|null), response?: google.firestore.admin.v1.ListIndexesResponse) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#getIndex}.
                     * @param error Error, if any
                     * @param [response] Index
                     */
                    type GetIndexCallback = (error: (Error|null), response?: google.firestore.admin.v1.Index) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#deleteIndex}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteIndexCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#getField}.
                     * @param error Error, if any
                     * @param [response] Field
                     */
                    type GetFieldCallback = (error: (Error|null), response?: google.firestore.admin.v1.Field) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#updateField}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type UpdateFieldCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#listFields}.
                     * @param error Error, if any
                     * @param [response] ListFieldsResponse
                     */
                    type ListFieldsCallback = (error: (Error|null), response?: google.firestore.admin.v1.ListFieldsResponse) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#exportDocuments}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type ExportDocumentsCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.firestore.admin.v1.FirestoreAdmin#importDocuments}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type ImportDocumentsCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;
                }

                /** Properties of a CreateIndexRequest. */
                interface ICreateIndexRequest {

                    /** CreateIndexRequest parent */
                    parent?: (string|null);

                    /** CreateIndexRequest index */
                    index?: (google.firestore.admin.v1.IIndex|null);
                }

                /** Represents a CreateIndexRequest. */
                class CreateIndexRequest implements ICreateIndexRequest {

                    /**
                     * Constructs a new CreateIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.ICreateIndexRequest);

                    /** CreateIndexRequest parent. */
                    public parent: string;

                    /** CreateIndexRequest index. */
                    public index?: (google.firestore.admin.v1.IIndex|null);
                }

                /** Properties of a ListIndexesRequest. */
                interface IListIndexesRequest {

                    /** ListIndexesRequest parent */
                    parent?: (string|null);

                    /** ListIndexesRequest filter */
                    filter?: (string|null);

                    /** ListIndexesRequest pageSize */
                    pageSize?: (number|null);

                    /** ListIndexesRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListIndexesRequest. */
                class ListIndexesRequest implements IListIndexesRequest {

                    /**
                     * Constructs a new ListIndexesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IListIndexesRequest);

                    /** ListIndexesRequest parent. */
                    public parent: string;

                    /** ListIndexesRequest filter. */
                    public filter: string;

                    /** ListIndexesRequest pageSize. */
                    public pageSize: number;

                    /** ListIndexesRequest pageToken. */
                    public pageToken: string;
                }

                /** Properties of a ListIndexesResponse. */
                interface IListIndexesResponse {

                    /** ListIndexesResponse indexes */
                    indexes?: (google.firestore.admin.v1.IIndex[]|null);

                    /** ListIndexesResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListIndexesResponse. */
                class ListIndexesResponse implements IListIndexesResponse {

                    /**
                     * Constructs a new ListIndexesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IListIndexesResponse);

                    /** ListIndexesResponse indexes. */
                    public indexes: google.firestore.admin.v1.IIndex[];

                    /** ListIndexesResponse nextPageToken. */
                    public nextPageToken: string;
                }

                /** Properties of a GetIndexRequest. */
                interface IGetIndexRequest {

                    /** GetIndexRequest name */
                    name?: (string|null);
                }

                /** Represents a GetIndexRequest. */
                class GetIndexRequest implements IGetIndexRequest {

                    /**
                     * Constructs a new GetIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IGetIndexRequest);

                    /** GetIndexRequest name. */
                    public name: string;
                }

                /** Properties of a DeleteIndexRequest. */
                interface IDeleteIndexRequest {

                    /** DeleteIndexRequest name */
                    name?: (string|null);
                }

                /** Represents a DeleteIndexRequest. */
                class DeleteIndexRequest implements IDeleteIndexRequest {

                    /**
                     * Constructs a new DeleteIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IDeleteIndexRequest);

                    /** DeleteIndexRequest name. */
                    public name: string;
                }

                /** Properties of an UpdateFieldRequest. */
                interface IUpdateFieldRequest {

                    /** UpdateFieldRequest field */
                    field?: (google.firestore.admin.v1.IField|null);

                    /** UpdateFieldRequest updateMask */
                    updateMask?: (google.protobuf.IFieldMask|null);
                }

                /** Represents an UpdateFieldRequest. */
                class UpdateFieldRequest implements IUpdateFieldRequest {

                    /**
                     * Constructs a new UpdateFieldRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IUpdateFieldRequest);

                    /** UpdateFieldRequest field. */
                    public field?: (google.firestore.admin.v1.IField|null);

                    /** UpdateFieldRequest updateMask. */
                    public updateMask?: (google.protobuf.IFieldMask|null);
                }

                /** Properties of a GetFieldRequest. */
                interface IGetFieldRequest {

                    /** GetFieldRequest name */
                    name?: (string|null);
                }

                /** Represents a GetFieldRequest. */
                class GetFieldRequest implements IGetFieldRequest {

                    /**
                     * Constructs a new GetFieldRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IGetFieldRequest);

                    /** GetFieldRequest name. */
                    public name: string;
                }

                /** Properties of a ListFieldsRequest. */
                interface IListFieldsRequest {

                    /** ListFieldsRequest parent */
                    parent?: (string|null);

                    /** ListFieldsRequest filter */
                    filter?: (string|null);

                    /** ListFieldsRequest pageSize */
                    pageSize?: (number|null);

                    /** ListFieldsRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListFieldsRequest. */
                class ListFieldsRequest implements IListFieldsRequest {

                    /**
                     * Constructs a new ListFieldsRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IListFieldsRequest);

                    /** ListFieldsRequest parent. */
                    public parent: string;

                    /** ListFieldsRequest filter. */
                    public filter: string;

                    /** ListFieldsRequest pageSize. */
                    public pageSize: number;

                    /** ListFieldsRequest pageToken. */
                    public pageToken: string;
                }

                /** Properties of a ListFieldsResponse. */
                interface IListFieldsResponse {

                    /** ListFieldsResponse fields */
                    fields?: (google.firestore.admin.v1.IField[]|null);

                    /** ListFieldsResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListFieldsResponse. */
                class ListFieldsResponse implements IListFieldsResponse {

                    /**
                     * Constructs a new ListFieldsResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IListFieldsResponse);

                    /** ListFieldsResponse fields. */
                    public fields: google.firestore.admin.v1.IField[];

                    /** ListFieldsResponse nextPageToken. */
                    public nextPageToken: string;
                }

                /** Properties of an ExportDocumentsRequest. */
                interface IExportDocumentsRequest {

                    /** ExportDocumentsRequest name */
                    name?: (string|null);

                    /** ExportDocumentsRequest collectionIds */
                    collectionIds?: (string[]|null);

                    /** ExportDocumentsRequest outputUriPrefix */
                    outputUriPrefix?: (string|null);
                }

                /** Represents an ExportDocumentsRequest. */
                class ExportDocumentsRequest implements IExportDocumentsRequest {

                    /**
                     * Constructs a new ExportDocumentsRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IExportDocumentsRequest);

                    /** ExportDocumentsRequest name. */
                    public name: string;

                    /** ExportDocumentsRequest collectionIds. */
                    public collectionIds: string[];

                    /** ExportDocumentsRequest outputUriPrefix. */
                    public outputUriPrefix: string;
                }

                /** Properties of an ImportDocumentsRequest. */
                interface IImportDocumentsRequest {

                    /** ImportDocumentsRequest name */
                    name?: (string|null);

                    /** ImportDocumentsRequest collectionIds */
                    collectionIds?: (string[]|null);

                    /** ImportDocumentsRequest inputUriPrefix */
                    inputUriPrefix?: (string|null);
                }

                /** Represents an ImportDocumentsRequest. */
                class ImportDocumentsRequest implements IImportDocumentsRequest {

                    /**
                     * Constructs a new ImportDocumentsRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IImportDocumentsRequest);

                    /** ImportDocumentsRequest name. */
                    public name: string;

                    /** ImportDocumentsRequest collectionIds. */
                    public collectionIds: string[];

                    /** ImportDocumentsRequest inputUriPrefix. */
                    public inputUriPrefix: string;
                }

                /** Properties of an Index. */
                interface IIndex {

                    /** Index name */
                    name?: (string|null);

                    /** Index queryScope */
                    queryScope?: (google.firestore.admin.v1.Index.QueryScope|null);

                    /** Index fields */
                    fields?: (google.firestore.admin.v1.Index.IIndexField[]|null);

                    /** Index state */
                    state?: (google.firestore.admin.v1.Index.State|null);
                }

                /** Represents an Index. */
                class Index implements IIndex {

                    /**
                     * Constructs a new Index.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IIndex);

                    /** Index name. */
                    public name: string;

                    /** Index queryScope. */
                    public queryScope: google.firestore.admin.v1.Index.QueryScope;

                    /** Index fields. */
                    public fields: google.firestore.admin.v1.Index.IIndexField[];

                    /** Index state. */
                    public state: google.firestore.admin.v1.Index.State;
                }

                namespace Index {

                    /** Properties of an IndexField. */
                    interface IIndexField {

                        /** IndexField fieldPath */
                        fieldPath?: (string|null);

                        /** IndexField order */
                        order?: (google.firestore.admin.v1.Index.IndexField.Order|null);

                        /** IndexField arrayConfig */
                        arrayConfig?: (google.firestore.admin.v1.Index.IndexField.ArrayConfig|null);
                    }

                    /** Represents an IndexField. */
                    class IndexField implements IIndexField {

                        /**
                         * Constructs a new IndexField.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.firestore.admin.v1.Index.IIndexField);

                        /** IndexField fieldPath. */
                        public fieldPath: string;

                        /** IndexField order. */
                        public order: google.firestore.admin.v1.Index.IndexField.Order;

                        /** IndexField arrayConfig. */
                        public arrayConfig: google.firestore.admin.v1.Index.IndexField.ArrayConfig;

                        /** IndexField valueMode. */
                        public valueMode?: ("order"|"arrayConfig");
                    }

                    namespace IndexField {

                        /** Order enum. */
                        type Order =
                            "ORDER_UNSPECIFIED"| "ASCENDING"| "DESCENDING";

                        /** ArrayConfig enum. */
                        type ArrayConfig =
                            "ARRAY_CONFIG_UNSPECIFIED"| "CONTAINS";
                    }

                    /** QueryScope enum. */
                    type QueryScope =
                        "QUERY_SCOPE_UNSPECIFIED"| "COLLECTION"| "COLLECTION_GROUP";

                    /** State enum. */
                    type State =
                        "STATE_UNSPECIFIED"| "CREATING"| "READY"| "NEEDS_REPAIR";
                }

                /** Properties of a LocationMetadata. */
                interface ILocationMetadata {
                }

                /** Represents a LocationMetadata. */
                class LocationMetadata implements ILocationMetadata {

                    /**
                     * Constructs a new LocationMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.ILocationMetadata);
                }

                /** Properties of an IndexOperationMetadata. */
                interface IIndexOperationMetadata {

                    /** IndexOperationMetadata startTime */
                    startTime?: (google.protobuf.ITimestamp|null);

                    /** IndexOperationMetadata endTime */
                    endTime?: (google.protobuf.ITimestamp|null);

                    /** IndexOperationMetadata index */
                    index?: (string|null);

                    /** IndexOperationMetadata state */
                    state?: (google.firestore.admin.v1.OperationState|null);

                    /** IndexOperationMetadata progressDocuments */
                    progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** IndexOperationMetadata progressBytes */
                    progressBytes?: (google.firestore.admin.v1.IProgress|null);
                }

                /** Represents an IndexOperationMetadata. */
                class IndexOperationMetadata implements IIndexOperationMetadata {

                    /**
                     * Constructs a new IndexOperationMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IIndexOperationMetadata);

                    /** IndexOperationMetadata startTime. */
                    public startTime?: (google.protobuf.ITimestamp|null);

                    /** IndexOperationMetadata endTime. */
                    public endTime?: (google.protobuf.ITimestamp|null);

                    /** IndexOperationMetadata index. */
                    public index: string;

                    /** IndexOperationMetadata state. */
                    public state: google.firestore.admin.v1.OperationState;

                    /** IndexOperationMetadata progressDocuments. */
                    public progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** IndexOperationMetadata progressBytes. */
                    public progressBytes?: (google.firestore.admin.v1.IProgress|null);
                }

                /** Properties of a FieldOperationMetadata. */
                interface IFieldOperationMetadata {

                    /** FieldOperationMetadata startTime */
                    startTime?: (google.protobuf.ITimestamp|null);

                    /** FieldOperationMetadata endTime */
                    endTime?: (google.protobuf.ITimestamp|null);

                    /** FieldOperationMetadata field */
                    field?: (string|null);

                    /** FieldOperationMetadata indexConfigDeltas */
                    indexConfigDeltas?: (google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta[]|null);

                    /** FieldOperationMetadata state */
                    state?: (google.firestore.admin.v1.OperationState|null);

                    /** FieldOperationMetadata progressDocuments */
                    progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** FieldOperationMetadata progressBytes */
                    progressBytes?: (google.firestore.admin.v1.IProgress|null);
                }

                /** Represents a FieldOperationMetadata. */
                class FieldOperationMetadata implements IFieldOperationMetadata {

                    /**
                     * Constructs a new FieldOperationMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IFieldOperationMetadata);

                    /** FieldOperationMetadata startTime. */
                    public startTime?: (google.protobuf.ITimestamp|null);

                    /** FieldOperationMetadata endTime. */
                    public endTime?: (google.protobuf.ITimestamp|null);

                    /** FieldOperationMetadata field. */
                    public field: string;

                    /** FieldOperationMetadata indexConfigDeltas. */
                    public indexConfigDeltas: google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta[];

                    /** FieldOperationMetadata state. */
                    public state: google.firestore.admin.v1.OperationState;

                    /** FieldOperationMetadata progressDocuments. */
                    public progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** FieldOperationMetadata progressBytes. */
                    public progressBytes?: (google.firestore.admin.v1.IProgress|null);
                }

                namespace FieldOperationMetadata {

                    /** Properties of an IndexConfigDelta. */
                    interface IIndexConfigDelta {

                        /** IndexConfigDelta changeType */
                        changeType?: (google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta.ChangeType|null);

                        /** IndexConfigDelta index */
                        index?: (google.firestore.admin.v1.IIndex|null);
                    }

                    /** Represents an IndexConfigDelta. */
                    class IndexConfigDelta implements IIndexConfigDelta {

                        /**
                         * Constructs a new IndexConfigDelta.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.firestore.admin.v1.FieldOperationMetadata.IIndexConfigDelta);

                        /** IndexConfigDelta changeType. */
                        public changeType: google.firestore.admin.v1.FieldOperationMetadata.IndexConfigDelta.ChangeType;

                        /** IndexConfigDelta index. */
                        public index?: (google.firestore.admin.v1.IIndex|null);
                    }

                    namespace IndexConfigDelta {

                        /** ChangeType enum. */
                        type ChangeType =
                            "CHANGE_TYPE_UNSPECIFIED"| "ADD"| "REMOVE";
                    }
                }

                /** Properties of an ExportDocumentsMetadata. */
                interface IExportDocumentsMetadata {

                    /** ExportDocumentsMetadata startTime */
                    startTime?: (google.protobuf.ITimestamp|null);

                    /** ExportDocumentsMetadata endTime */
                    endTime?: (google.protobuf.ITimestamp|null);

                    /** ExportDocumentsMetadata operationState */
                    operationState?: (google.firestore.admin.v1.OperationState|null);

                    /** ExportDocumentsMetadata progressDocuments */
                    progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** ExportDocumentsMetadata progressBytes */
                    progressBytes?: (google.firestore.admin.v1.IProgress|null);

                    /** ExportDocumentsMetadata collectionIds */
                    collectionIds?: (string[]|null);

                    /** ExportDocumentsMetadata outputUriPrefix */
                    outputUriPrefix?: (string|null);
                }

                /** Represents an ExportDocumentsMetadata. */
                class ExportDocumentsMetadata implements IExportDocumentsMetadata {

                    /**
                     * Constructs a new ExportDocumentsMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IExportDocumentsMetadata);

                    /** ExportDocumentsMetadata startTime. */
                    public startTime?: (google.protobuf.ITimestamp|null);

                    /** ExportDocumentsMetadata endTime. */
                    public endTime?: (google.protobuf.ITimestamp|null);

                    /** ExportDocumentsMetadata operationState. */
                    public operationState: google.firestore.admin.v1.OperationState;

                    /** ExportDocumentsMetadata progressDocuments. */
                    public progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** ExportDocumentsMetadata progressBytes. */
                    public progressBytes?: (google.firestore.admin.v1.IProgress|null);

                    /** ExportDocumentsMetadata collectionIds. */
                    public collectionIds: string[];

                    /** ExportDocumentsMetadata outputUriPrefix. */
                    public outputUriPrefix: string;
                }

                /** Properties of an ImportDocumentsMetadata. */
                interface IImportDocumentsMetadata {

                    /** ImportDocumentsMetadata startTime */
                    startTime?: (google.protobuf.ITimestamp|null);

                    /** ImportDocumentsMetadata endTime */
                    endTime?: (google.protobuf.ITimestamp|null);

                    /** ImportDocumentsMetadata operationState */
                    operationState?: (google.firestore.admin.v1.OperationState|null);

                    /** ImportDocumentsMetadata progressDocuments */
                    progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** ImportDocumentsMetadata progressBytes */
                    progressBytes?: (google.firestore.admin.v1.IProgress|null);

                    /** ImportDocumentsMetadata collectionIds */
                    collectionIds?: (string[]|null);

                    /** ImportDocumentsMetadata inputUriPrefix */
                    inputUriPrefix?: (string|null);
                }

                /** Represents an ImportDocumentsMetadata. */
                class ImportDocumentsMetadata implements IImportDocumentsMetadata {

                    /**
                     * Constructs a new ImportDocumentsMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IImportDocumentsMetadata);

                    /** ImportDocumentsMetadata startTime. */
                    public startTime?: (google.protobuf.ITimestamp|null);

                    /** ImportDocumentsMetadata endTime. */
                    public endTime?: (google.protobuf.ITimestamp|null);

                    /** ImportDocumentsMetadata operationState. */
                    public operationState: google.firestore.admin.v1.OperationState;

                    /** ImportDocumentsMetadata progressDocuments. */
                    public progressDocuments?: (google.firestore.admin.v1.IProgress|null);

                    /** ImportDocumentsMetadata progressBytes. */
                    public progressBytes?: (google.firestore.admin.v1.IProgress|null);

                    /** ImportDocumentsMetadata collectionIds. */
                    public collectionIds: string[];

                    /** ImportDocumentsMetadata inputUriPrefix. */
                    public inputUriPrefix: string;
                }

                /** Properties of an ExportDocumentsResponse. */
                interface IExportDocumentsResponse {

                    /** ExportDocumentsResponse outputUriPrefix */
                    outputUriPrefix?: (string|null);
                }

                /** Represents an ExportDocumentsResponse. */
                class ExportDocumentsResponse implements IExportDocumentsResponse {

                    /**
                     * Constructs a new ExportDocumentsResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IExportDocumentsResponse);

                    /** ExportDocumentsResponse outputUriPrefix. */
                    public outputUriPrefix: string;
                }

                /** Properties of a Progress. */
                interface IProgress {

                    /** Progress estimatedWork */
                    estimatedWork?: (number|null);

                    /** Progress completedWork */
                    completedWork?: (number|null);
                }

                /** Represents a Progress. */
                class Progress implements IProgress {

                    /**
                     * Constructs a new Progress.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.firestore.admin.v1.IProgress);

                    /** Progress estimatedWork. */
                    public estimatedWork: number;

                    /** Progress completedWork. */
                    public completedWork: number;
                }

                /** OperationState enum. */
                type OperationState =
                    "OPERATION_STATE_UNSPECIFIED"| "INITIALIZING"| "PROCESSING"| "CANCELLING"| "FINALIZING"| "SUCCESSFUL"| "FAILED"| "CANCELLED";
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);
        }

        /** Represents a Http. */
        class Http implements IHttp {

            /**
             * Constructs a new Http.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttp);

            /** Http rules. */
            public rules: google.api.IHttpRule[];
        }

        /** Properties of a HttpRule. */
        interface IHttpRule {

            /** HttpRule get */
            get?: (string|null);

            /** HttpRule put */
            put?: (string|null);

            /** HttpRule post */
            post?: (string|null);

            /** HttpRule delete */
            "delete"?: (string|null);

            /** HttpRule patch */
            patch?: (string|null);

            /** HttpRule custom */
            custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector */
            selector?: (string|null);

            /** HttpRule body */
            body?: (string|null);

            /** HttpRule additionalBindings */
            additionalBindings?: (google.api.IHttpRule[]|null);
        }

        /** Represents a HttpRule. */
        class HttpRule implements IHttpRule {

            /**
             * Constructs a new HttpRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpRule);

            /** HttpRule get. */
            public get: string;

            /** HttpRule put. */
            public put: string;

            /** HttpRule post. */
            public post: string;

            /** HttpRule delete. */
            public delete: string;

            /** HttpRule patch. */
            public patch: string;

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector. */
            public selector: string;

            /** HttpRule body. */
            public body: string;

            /** HttpRule additionalBindings. */
            public additionalBindings: google.api.IHttpRule[];

            /** HttpRule pattern. */
            public pattern?: ("get"|"put"|"post"|"delete"|"patch"|"custom");
        }

        /** Properties of a CustomHttpPattern. */
        interface ICustomHttpPattern {

            /** CustomHttpPattern kind */
            kind?: (string|null);

            /** CustomHttpPattern path */
            path?: (string|null);
        }

        /** Represents a CustomHttpPattern. */
        class CustomHttpPattern implements ICustomHttpPattern {

            /**
             * Constructs a new CustomHttpPattern.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICustomHttpPattern);

            /** CustomHttpPattern kind. */
            public kind: string;

            /** CustomHttpPattern path. */
            public path: string;
        }

        /** FieldBehavior enum. */
        type FieldBehavior =
            "FIELD_BEHAVIOR_UNSPECIFIED"| "OPTIONAL"| "REQUIRED"| "OUTPUT_ONLY"| "INPUT_ONLY"| "IMMUTABLE";

        /** Properties of a ResourceDescriptor. */
        interface IResourceDescriptor {

            /** ResourceDescriptor type */
            type?: (string|null);

            /** ResourceDescriptor pattern */
            pattern?: (string[]|null);

            /** ResourceDescriptor nameField */
            nameField?: (string|null);

            /** ResourceDescriptor history */
            history?: (google.api.ResourceDescriptor.History|null);

            /** ResourceDescriptor plural */
            plural?: (string|null);

            /** ResourceDescriptor singular */
            singular?: (string|null);
        }

        /** Represents a ResourceDescriptor. */
        class ResourceDescriptor implements IResourceDescriptor {

            /**
             * Constructs a new ResourceDescriptor.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IResourceDescriptor);

            /** ResourceDescriptor type. */
            public type: string;

            /** ResourceDescriptor pattern. */
            public pattern: string[];

            /** ResourceDescriptor nameField. */
            public nameField: string;

            /** ResourceDescriptor history. */
            public history: google.api.ResourceDescriptor.History;

            /** ResourceDescriptor plural. */
            public plural: string;

            /** ResourceDescriptor singular. */
            public singular: string;
        }

        namespace ResourceDescriptor {

            /** History enum. */
            type History =
                "HISTORY_UNSPECIFIED"| "ORIGINALLY_SINGLE_PATTERN"| "FUTURE_MULTI_PATTERN";
        }

        /** Properties of a ResourceReference. */
        interface IResourceReference {

            /** ResourceReference type */
            type?: (string|null);

            /** ResourceReference childType */
            childType?: (string|null);
        }

        /** Represents a ResourceReference. */
        class ResourceReference implements IResourceReference {

            /**
             * Constructs a new ResourceReference.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IResourceReference);

            /** ResourceReference type. */
            public type: string;

            /** ResourceReference childType. */
            public childType: string;
        }
    }

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto publicDependency */
            publicDependency?: (number[]|null);

            /** FileDescriptorProto weakDependency */
            weakDependency?: (number[]|null);

            /** FileDescriptorProto messageType */
            messageType?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo */
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto publicDependency. */
            public publicDependency: number[];

            /** FileDescriptorProto weakDependency. */
            public weakDependency: number[];

            /** FileDescriptorProto messageType. */
            public messageType: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo. */
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nestedType */
            nestedType?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extensionRange */
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneofDecl */
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange */
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nestedType. */
            public nestedType: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extensionRange. */
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneofDecl. */
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange. */
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reservedName. */
            public reservedName: string[];
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto typeName */
            typeName?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto defaultValue */
            defaultValue?: (string|null);

            /** FieldDescriptorProto oneofIndex */
            oneofIndex?: (number|null);

            /** FieldDescriptorProto jsonName */
            jsonName?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: google.protobuf.FieldDescriptorProto.Label;

            /** FieldDescriptorProto type. */
            public type: google.protobuf.FieldDescriptorProto.Type;

            /** FieldDescriptorProto typeName. */
            public typeName: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto defaultValue. */
            public defaultValue: string;

            /** FieldDescriptorProto oneofIndex. */
            public oneofIndex: number;

            /** FieldDescriptorProto jsonName. */
            public jsonName: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            type Type =
                "TYPE_DOUBLE"| "TYPE_FLOAT"| "TYPE_INT64"| "TYPE_UINT64"| "TYPE_INT32"| "TYPE_FIXED64"| "TYPE_FIXED32"| "TYPE_BOOL"| "TYPE_STRING"| "TYPE_GROUP"| "TYPE_MESSAGE"| "TYPE_BYTES"| "TYPE_UINT32"| "TYPE_ENUM"| "TYPE_SFIXED32"| "TYPE_SFIXED64"| "TYPE_SINT32"| "TYPE_SINT64";

            /** Label enum. */
            type Label =
                "LABEL_OPTIONAL"| "LABEL_REQUIRED"| "LABEL_REPEATED";
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto inputType */
            inputType?: (string|null);

            /** MethodDescriptorProto outputType */
            outputType?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming */
            clientStreaming?: (boolean|null);

            /** MethodDescriptorProto serverStreaming */
            serverStreaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto inputType. */
            public inputType: string;

            /** MethodDescriptorProto outputType. */
            public outputType: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming. */
            public clientStreaming: boolean;

            /** MethodDescriptorProto serverStreaming. */
            public serverStreaming: boolean;
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions javaPackage */
            javaPackage?: (string|null);

            /** FileOptions javaOuterClassname */
            javaOuterClassname?: (string|null);

            /** FileOptions javaMultipleFiles */
            javaMultipleFiles?: (boolean|null);

            /** FileOptions javaGenerateEqualsAndHash */
            javaGenerateEqualsAndHash?: (boolean|null);

            /** FileOptions javaStringCheckUtf8 */
            javaStringCheckUtf8?: (boolean|null);

            /** FileOptions optimizeFor */
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions ccEnableArenas */
            ccEnableArenas?: (boolean|null);

            /** FileOptions objcClassPrefix */
            objcClassPrefix?: (string|null);

            /** FileOptions csharpNamespace */
            csharpNamespace?: (string|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FileOptions .google.api.resourceDefinition */
            ".google.api.resourceDefinition"?: (google.api.IResourceDescriptor[]|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions javaPackage. */
            public javaPackage: string;

            /** FileOptions javaOuterClassname. */
            public javaOuterClassname: string;

            /** FileOptions javaMultipleFiles. */
            public javaMultipleFiles: boolean;

            /** FileOptions javaGenerateEqualsAndHash. */
            public javaGenerateEqualsAndHash: boolean;

            /** FileOptions javaStringCheckUtf8. */
            public javaStringCheckUtf8: boolean;

            /** FileOptions optimizeFor. */
            public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions ccEnableArenas. */
            public ccEnableArenas: boolean;

            /** FileOptions objcClassPrefix. */
            public objcClassPrefix: string;

            /** FileOptions csharpNamespace. */
            public csharpNamespace: string;

            /** FileOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            type OptimizeMode =
                "SPEED"| "CODE_SIZE"| "LITE_RUNTIME";
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions messageSetWireFormat */
            messageSetWireFormat?: (boolean|null);

            /** MessageOptions noStandardDescriptorAccessor */
            noStandardDescriptorAccessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions mapEntry */
            mapEntry?: (boolean|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MessageOptions .google.api.resource */
            ".google.api.resource"?: (google.api.IResourceDescriptor|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions messageSetWireFormat. */
            public messageSetWireFormat: boolean;

            /** MessageOptions noStandardDescriptorAccessor. */
            public noStandardDescriptorAccessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions mapEntry. */
            public mapEntry: boolean;

            /** MessageOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FieldOptions .google.api.fieldBehavior */
            ".google.api.fieldBehavior"?: (google.api.FieldBehavior[]|null);

            /** FieldOptions .google.api.resourceReference */
            ".google.api.resourceReference"?: (google.api.IResourceReference|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: google.protobuf.FieldOptions.CType;

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: google.protobuf.FieldOptions.JSType;

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        namespace FieldOptions {

            /** CType enum. */
            type CType =
                "STRING"| "CORD"| "STRING_PIECE";

            /** JSType enum. */
            type JSType =
                "JS_NORMAL"| "JS_STRING"| "JS_NUMBER";
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allowAlias. */
            public allowAlias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** ServiceOptions .google.api.defaultHost */
            ".google.api.defaultHost"?: (string|null);

            /** ServiceOptions .google.api.oauthScopes */
            ".google.api.oauthScopes"?: (string|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);

            /** MethodOptions .google.api.methodSignature */
            ".google.api.methodSignature"?: (string[]|null);

            /** MethodOptions .google.longrunning.operationInfo */
            ".google.longrunning.operationInfo"?: (google.longrunning.IOperationInfo|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifierValue */
            identifierValue?: (string|null);

            /** UninterpretedOption positiveIntValue */
            positiveIntValue?: (number|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|null);

            /** UninterpretedOption aggregateValue */
            aggregateValue?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifierValue. */
            public identifierValue: string;

            /** UninterpretedOption positiveIntValue. */
            public positiveIntValue: number;

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: number;

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: Uint8Array;

            /** UninterpretedOption aggregateValue. */
            public aggregateValue: string;
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart namePart */
                namePart: string;

                /** NamePart isExtension */
                isExtension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart namePart. */
                public namePart: string;

                /** NamePart isExtension. */
                public isExtension: boolean;
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leadingComments */
                leadingComments?: (string|null);

                /** Location trailingComments */
                trailingComments?: (string|null);

                /** Location leadingDetachedComments */
                leadingDetachedComments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leadingComments. */
                public leadingComments: string;

                /** Location trailingComments. */
                public trailingComments: string;

                /** Location leadingDetachedComments. */
                public leadingDetachedComments: string[];
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation sourceFile */
                sourceFile?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation sourceFile. */
                public sourceFile: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;
            }
        }

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);
        }

        /** Properties of a FieldMask. */
        interface IFieldMask {

            /** FieldMask paths */
            paths?: (string[]|null);
        }

        /** Represents a FieldMask. */
        class FieldMask implements IFieldMask {

            /**
             * Constructs a new FieldMask.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldMask);

            /** FieldMask paths. */
            public paths: string[];
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: number;

            /** Timestamp nanos. */
            public nanos: number;
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;
        }

        /** Properties of a Struct. */
        interface IStruct {

            /** Struct fields */
            fields?: ({ [k: string]: google.protobuf.IValue }|null);
        }

        /** Represents a Struct. */
        class Struct implements IStruct {

            /**
             * Constructs a new Struct.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStruct);

            /** Struct fields. */
            public fields: { [k: string]: google.protobuf.IValue };
        }

        /** Properties of a Value. */
        interface IValue {

            /** Value nullValue */
            nullValue?: (google.protobuf.NullValue|null);

            /** Value numberValue */
            numberValue?: (number|null);

            /** Value stringValue */
            stringValue?: (string|null);

            /** Value boolValue */
            boolValue?: (boolean|null);

            /** Value structValue */
            structValue?: (google.protobuf.IStruct|null);

            /** Value listValue */
            listValue?: (google.protobuf.IListValue|null);
        }

        /** Represents a Value. */
        class Value implements IValue {

            /**
             * Constructs a new Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IValue);

            /** Value nullValue. */
            public nullValue: google.protobuf.NullValue;

            /** Value numberValue. */
            public numberValue: number;

            /** Value stringValue. */
            public stringValue: string;

            /** Value boolValue. */
            public boolValue: boolean;

            /** Value structValue. */
            public structValue?: (google.protobuf.IStruct|null);

            /** Value listValue. */
            public listValue?: (google.protobuf.IListValue|null);

            /** Value kind. */
            public kind?: ("nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue");
        }

        /** NullValue enum. */
        type NullValue =
            "NULL_VALUE";

        /** Properties of a ListValue. */
        interface IListValue {

            /** ListValue values */
            values?: (google.protobuf.IValue[]|null);
        }

        /** Represents a ListValue. */
        class ListValue implements IListValue {

            /**
             * Constructs a new ListValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IListValue);

            /** ListValue values. */
            public values: google.protobuf.IValue[];
        }

        /** Properties of a DoubleValue. */
        interface IDoubleValue {

            /** DoubleValue value */
            value?: (number|null);
        }

        /** Represents a DoubleValue. */
        class DoubleValue implements IDoubleValue {

            /**
             * Constructs a new DoubleValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDoubleValue);

            /** DoubleValue value. */
            public value: number;
        }

        /** Properties of a FloatValue. */
        interface IFloatValue {

            /** FloatValue value */
            value?: (number|null);
        }

        /** Represents a FloatValue. */
        class FloatValue implements IFloatValue {

            /**
             * Constructs a new FloatValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFloatValue);

            /** FloatValue value. */
            public value: number;
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: number;
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: number;
        }

        /** Properties of an Int32Value. */
        interface IInt32Value {

            /** Int32Value value */
            value?: (number|null);
        }

        /** Represents an Int32Value. */
        class Int32Value implements IInt32Value {

            /**
             * Constructs a new Int32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt32Value);

            /** Int32Value value. */
            public value: number;
        }

        /** Properties of a UInt32Value. */
        interface IUInt32Value {

            /** UInt32Value value */
            value?: (number|null);
        }

        /** Represents a UInt32Value. */
        class UInt32Value implements IUInt32Value {

            /**
             * Constructs a new UInt32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt32Value);

            /** UInt32Value value. */
            public value: number;
        }

        /** Properties of a BoolValue. */
        interface IBoolValue {

            /** BoolValue value */
            value?: (boolean|null);
        }

        /** Represents a BoolValue. */
        class BoolValue implements IBoolValue {

            /**
             * Constructs a new BoolValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBoolValue);

            /** BoolValue value. */
            public value: boolean;
        }

        /** Properties of a StringValue. */
        interface IStringValue {

            /** StringValue value */
            value?: (string|null);
        }

        /** Represents a StringValue. */
        class StringValue implements IStringValue {

            /**
             * Constructs a new StringValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStringValue);

            /** StringValue value. */
            public value: string;
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: Uint8Array;
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (number|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: number;

            /** Duration nanos. */
            public nanos: number;
        }
    }

    /** Namespace type. */
    namespace type {

        /** Properties of a LatLng. */
        interface ILatLng {

            /** LatLng latitude */
            latitude?: (number|null);

            /** LatLng longitude */
            longitude?: (number|null);
        }

        /** Represents a LatLng. */
        class LatLng implements ILatLng {

            /**
             * Constructs a new LatLng.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.type.ILatLng);

            /** LatLng latitude. */
            public latitude: number;

            /** LatLng longitude. */
            public longitude: number;
        }
    }

    /** Namespace rpc. */
    namespace rpc {

        /** Properties of a Status. */
        interface IStatus {

            /** Status code */
            code?: (number|null);

            /** Status message */
            message?: (string|null);

            /** Status details */
            details?: (google.protobuf.IAny[]|null);
        }

        /** Represents a Status. */
        class Status implements IStatus {

            /**
             * Constructs a new Status.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.rpc.IStatus);

            /** Status code. */
            public code: number;

            /** Status message. */
            public message: string;

            /** Status details. */
            public details: google.protobuf.IAny[];
        }
    }

    /** Namespace longrunning. */
    namespace longrunning {

        /** Represents an Operations */
        class Operations extends $protobuf.rpc.Service {

            /**
             * Constructs a new Operations service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListOperationsResponse
             */
            public listOperations(request: google.longrunning.IListOperationsRequest, callback: google.longrunning.Operations.ListOperationsCallback): void;

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @returns Promise
             */
            public listOperations(request: google.longrunning.IListOperationsRequest): Promise<google.longrunning.ListOperationsResponse>;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public getOperation(request: google.longrunning.IGetOperationRequest, callback: google.longrunning.Operations.GetOperationCallback): void;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @returns Promise
             */
            public getOperation(request: google.longrunning.IGetOperationRequest): Promise<google.longrunning.Operation>;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest, callback: google.longrunning.Operations.DeleteOperationCallback): void;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @returns Promise
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest, callback: google.longrunning.Operations.CancelOperationCallback): void;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @returns Promise
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest, callback: google.longrunning.Operations.WaitOperationCallback): void;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @returns Promise
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest): Promise<google.longrunning.Operation>;
        }

        namespace Operations {

            /**
             * Callback as used by {@link google.longrunning.Operations#listOperations}.
             * @param error Error, if any
             * @param [response] ListOperationsResponse
             */
            type ListOperationsCallback = (error: (Error|null), response?: google.longrunning.ListOperationsResponse) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#getOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type GetOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#deleteOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type DeleteOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#cancelOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type CancelOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#waitOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type WaitOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;
        }

        /** Properties of an Operation. */
        interface IOperation {

            /** Operation name */
            name?: (string|null);

            /** Operation metadata */
            metadata?: (google.protobuf.IAny|null);

            /** Operation done */
            done?: (boolean|null);

            /** Operation error */
            error?: (google.rpc.IStatus|null);

            /** Operation response */
            response?: (google.protobuf.IAny|null);
        }

        /** Represents an Operation. */
        class Operation implements IOperation {

            /**
             * Constructs a new Operation.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperation);

            /** Operation name. */
            public name: string;

            /** Operation metadata. */
            public metadata?: (google.protobuf.IAny|null);

            /** Operation done. */
            public done: boolean;

            /** Operation error. */
            public error?: (google.rpc.IStatus|null);

            /** Operation response. */
            public response?: (google.protobuf.IAny|null);

            /** Operation result. */
            public result?: ("error"|"response");
        }

        /** Properties of a GetOperationRequest. */
        interface IGetOperationRequest {

            /** GetOperationRequest name */
            name?: (string|null);
        }

        /** Represents a GetOperationRequest. */
        class GetOperationRequest implements IGetOperationRequest {

            /**
             * Constructs a new GetOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IGetOperationRequest);

            /** GetOperationRequest name. */
            public name: string;
        }

        /** Properties of a ListOperationsRequest. */
        interface IListOperationsRequest {

            /** ListOperationsRequest name */
            name?: (string|null);

            /** ListOperationsRequest filter */
            filter?: (string|null);

            /** ListOperationsRequest pageSize */
            pageSize?: (number|null);

            /** ListOperationsRequest pageToken */
            pageToken?: (string|null);
        }

        /** Represents a ListOperationsRequest. */
        class ListOperationsRequest implements IListOperationsRequest {

            /**
             * Constructs a new ListOperationsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsRequest);

            /** ListOperationsRequest name. */
            public name: string;

            /** ListOperationsRequest filter. */
            public filter: string;

            /** ListOperationsRequest pageSize. */
            public pageSize: number;

            /** ListOperationsRequest pageToken. */
            public pageToken: string;
        }

        /** Properties of a ListOperationsResponse. */
        interface IListOperationsResponse {

            /** ListOperationsResponse operations */
            operations?: (google.longrunning.IOperation[]|null);

            /** ListOperationsResponse nextPageToken */
            nextPageToken?: (string|null);
        }

        /** Represents a ListOperationsResponse. */
        class ListOperationsResponse implements IListOperationsResponse {

            /**
             * Constructs a new ListOperationsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsResponse);

            /** ListOperationsResponse operations. */
            public operations: google.longrunning.IOperation[];

            /** ListOperationsResponse nextPageToken. */
            public nextPageToken: string;
        }

        /** Properties of a CancelOperationRequest. */
        interface ICancelOperationRequest {

            /** CancelOperationRequest name */
            name?: (string|null);
        }

        /** Represents a CancelOperationRequest. */
        class CancelOperationRequest implements ICancelOperationRequest {

            /**
             * Constructs a new CancelOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.ICancelOperationRequest);

            /** CancelOperationRequest name. */
            public name: string;
        }

        /** Properties of a DeleteOperationRequest. */
        interface IDeleteOperationRequest {

            /** DeleteOperationRequest name */
            name?: (string|null);
        }

        /** Represents a DeleteOperationRequest. */
        class DeleteOperationRequest implements IDeleteOperationRequest {

            /**
             * Constructs a new DeleteOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IDeleteOperationRequest);

            /** DeleteOperationRequest name. */
            public name: string;
        }

        /** Properties of a WaitOperationRequest. */
        interface IWaitOperationRequest {

            /** WaitOperationRequest name */
            name?: (string|null);

            /** WaitOperationRequest timeout */
            timeout?: (google.protobuf.IDuration|null);
        }

        /** Represents a WaitOperationRequest. */
        class WaitOperationRequest implements IWaitOperationRequest {

            /**
             * Constructs a new WaitOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IWaitOperationRequest);

            /** WaitOperationRequest name. */
            public name: string;

            /** WaitOperationRequest timeout. */
            public timeout?: (google.protobuf.IDuration|null);
        }

        /** Properties of an OperationInfo. */
        interface IOperationInfo {

            /** OperationInfo responseType */
            responseType?: (string|null);

            /** OperationInfo metadataType */
            metadataType?: (string|null);
        }

        /** Represents an OperationInfo. */
        class OperationInfo implements IOperationInfo {

            /**
             * Constructs a new OperationInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperationInfo);

            /** OperationInfo responseType. */
            public responseType: string;

            /** OperationInfo metadataType. */
            public metadataType: string;
        }
    }
}
