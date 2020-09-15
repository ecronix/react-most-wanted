import { Change } from 'firebase-functions';
import { firestore, app } from 'firebase-admin';
/** Optional parameters for creating a DocumentSnapshot. */
export interface DocumentSnapshotOptions {
    /** ISO timestamp string for the snapshot was read, default is current time.  */
    readTime?: string;
    /** ISO timestamp string for the snapshot was created, default is current time.  */
    createTime?: string;
    /** ISO timestamp string for the snapshot was last updated, default is current time.  */
    updateTime?: string;
    /** The Firebase app that the Firestore database belongs to. You do not need to supply
     * this parameter if you supplied Firebase config values when initializing firebase-functions-test.
     */
    firebaseApp?: app.App;
}
/** Create a DocumentSnapshot. */
export declare function makeDocumentSnapshot(
/** Key-value pairs representing data in the document, pass in `{}` to mock the snapshot of
 * a document that doesn't exist.
 */
data: {
    [key: string]: any;
}, 
/** Full path of the reference (e.g. 'users/alovelace') */
refPath: string, options?: DocumentSnapshotOptions): any;
/** Fetch an example document snapshot already populated with data. Can be passed into a wrapped
 * Firestore onCreate or onDelete function.
 */
export declare function exampleDocumentSnapshot(): firestore.DocumentSnapshot;
/** Fetch an example Change object of document snapshots already populated with data.
 * Can be passed into a wrapped Firestore onUpdate or onWrite function.
 */
export declare function exampleDocumentSnapshotChange(): Change<firestore.DocumentSnapshot>;
