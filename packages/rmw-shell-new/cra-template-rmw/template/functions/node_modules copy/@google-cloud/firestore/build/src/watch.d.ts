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
import { google } from '../protos/firestore_v1_proto_api';
import { QueryDocumentSnapshot } from './document';
import { DocumentChange } from './document-change';
import { DocumentReference, Firestore, Query } from './index';
import { Timestamp } from './timestamp';
import { DocumentData, FirestoreDataConverter } from './types';
import api = google.firestore.v1;
/**
 * @private
 * @callback docsCallback
 * @returns {Array.<QueryDocumentSnapshot>} An ordered list of documents.
 */
/**
 * @private
 * @callback changeCallback
 * @returns {Array.<DocumentChange>} An ordered list of document
 * changes.
 */
/**
 * onSnapshot() callback that receives the updated query state.
 *
 * @private
 * @callback watchSnapshotCallback
 *
 * @param {Timestamp} readTime The time at which this snapshot was obtained.
 * @param {number} size The number of documents in the result set.
 * @param {docsCallback} docs A callback that returns the ordered list of
 * documents stored in this snapshot.
 * @param {changeCallback} changes A callback that returns the list of
 * changed documents since the last snapshot delivered for this watch.
 */
declare type DocumentComparator<T> = (l: QueryDocumentSnapshot<T>, r: QueryDocumentSnapshot<T>) => number;
/**
 * Watch provides listen functionality and exposes the 'onSnapshot' observer. It
 * can be used with a valid Firestore Listen target.
 *
 * @class
 * @private
 */
declare abstract class Watch<T = DocumentData> {
    readonly _converter: FirestoreDataConverter<T>;
    protected readonly firestore: Firestore;
    private readonly backoff;
    private readonly requestTag;
    /**
     * Indicates whether we are interested in data from the stream. Set to false in the
     * 'unsubscribe()' callback.
     * @private
     */
    private isActive;
    /**
     * The current stream to the backend.
     * @private
     */
    private currentStream;
    /**
     * The server assigns and updates the resume token.
     * @private
     */
    private resumeToken;
    /**
     * A map of document names to QueryDocumentSnapshots for the last sent snapshot.
     * @private
     */
    private docMap;
    /**
     * The accumulated map of document changes (keyed by document name) for the
     * current snapshot.
     * @private
     */
    private changeMap;
    /**
     * The current state of the query results. *
     * @private
     */
    private current;
    /**
     * The sorted tree of QueryDocumentSnapshots as sent in the last snapshot.
     * We only look at the keys.
     * @private
     */
    private docTree;
    /**
     * We need this to track whether we've pushed an initial set of changes,
     * since we should push those even when there are no changes, if there
     * aren't docs.
     * @private
     */
    private hasPushed;
    private onNext;
    private onError;
    /**
     * @private
     * @hideconstructor
     *
     * @param firestore The Firestore Database client.
     */
    constructor(firestore: Firestore, _converter?: FirestoreDataConverter<T>);
    /**  Returns a 'Target' proto denoting the target to listen on. */
    protected abstract getTarget(resumeToken?: Uint8Array): api.ITarget;
    /**
     * Returns a comparator for QueryDocumentSnapshots that is used to order the
     * document snapshots returned by this watch.
     */
    protected abstract getComparator(): DocumentComparator<T>;
    /**
     * Starts a watch and attaches a listener for document change events.
     *
     * @private
     * @param onNext A callback to be called every time a new snapshot is
     * available.
     * @param onError A callback to be called if the listen fails or is cancelled.
     * No further callbacks will occur.
     *
     * @returns An unsubscribe function that can be called to cancel the snapshot
     * listener.
     */
    onSnapshot(onNext: (readTime: Timestamp, size: number, docs: () => Array<QueryDocumentSnapshot<T>>, changes: () => Array<DocumentChange<T>>) => void, onError: (error: Error) => void): () => void;
    /**
     * Returns the current count of all documents, including the changes from
     * the current changeMap.
     * @private
     */
    private currentSize;
    /**
     * Splits up document changes into removals, additions, and updates.
     * @private
     */
    private extractCurrentChanges;
    /**
     * Helper to clear the docs on RESET or filter mismatch.
     * @private
     */
    private resetDocs;
    /**
     * Closes the stream and calls onError() if the stream is still active.
     * @private
     */
    private closeStream;
    /**
     * Re-opens the stream unless the specified error is considered permanent.
     * Clears the change map.
     * @private
     */
    private maybeReopenStream;
    /**
     * Helper to restart the outgoing stream to the backend.
     * @private
     */
    private resetStream;
    /**
     * Initializes a new stream to the backend with backoff.
     * @private
     */
    private initStream;
    /**
     * Handles 'data' events and closes the stream if the response type is
     * invalid.
     * @private
     */
    private onData;
    /**
     * Checks if the current target id is included in the list of target ids.
     * If no targetIds are provided, returns true.
     * @private
     */
    private affectsTarget;
    /**
     * Assembles a new snapshot from the current set of changes and invokes the
     * user's callback. Clears the current changes on completion.
     * @private
     */
    private pushSnapshot;
    /**
     * Applies a document delete to the document tree and the document map.
     * Returns the corresponding DocumentChange event.
     * @private
     */
    private deleteDoc;
    /**
     * Applies a document add to the document tree and the document map. Returns
     * the corresponding DocumentChange event.
     * @private
     */
    private addDoc;
    /**
     * Applies a document modification to the document tree and the document map.
     * Returns the DocumentChange event for successful modifications.
     * @private
     */
    private modifyDoc;
    /**
     * Applies the mutations in changeMap to both the document tree and the
     * document lookup map. Modified docMap in-place and returns the updated
     * state.
     * @private
     */
    private computeSnapshot;
    /**
     * Determines whether a watch error is considered permanent and should not be
     * retried. Errors that don't provide a GRPC error code are always considered
     * transient in this context.
     *
     * @private
     * @param error An error object.
     * @return Whether the error is permanent.
     */
    private isPermanentWatchError;
    /**
     * Determines whether we need to initiate a longer backoff due to system
     * overload.
     *
     * @private
     * @param error A GRPC Error object that exposes an error code.
     * @return Whether we need to back off our retries.
     */
    private isResourceExhaustedError;
}
/**
 * Creates a new Watch instance to listen on DocumentReferences.
 *
 * @private
 */
export declare class DocumentWatch<T = DocumentData> extends Watch<T> {
    private readonly ref;
    constructor(firestore: Firestore, ref: DocumentReference<T>);
    getComparator(): DocumentComparator<T>;
    getTarget(resumeToken?: Uint8Array): google.firestore.v1.ITarget;
}
/**
 * Creates a new Watch instance to listen on Queries.
 *
 * @private
 */
export declare class QueryWatch<T = DocumentData> extends Watch<T> {
    private readonly query;
    private comparator;
    constructor(firestore: Firestore, query: Query<T>, converter?: FirestoreDataConverter<T>);
    getComparator(): DocumentComparator<T>;
    getTarget(resumeToken?: Uint8Array): google.firestore.v1.ITarget;
}
export {};
