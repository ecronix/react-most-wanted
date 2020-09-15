import { auth } from 'firebase-functions';
/** Create a UserRecord. */
export declare function makeUserRecord(
/** Fields of AuthRecord that you'd like to specify. */
fields: {
    [key: string]: string | boolean;
}): auth.UserRecord;
/** Fetch an example UserRecord already populated with data. */
export declare function exampleUserRecord(): auth.UserRecord;
