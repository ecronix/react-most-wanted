import { crashlytics } from 'firebase-functions';
/** Create an Issue */
export declare function makeIssue(
/** Fields of Issue that you'd like to specify. */
fields: {
    [key: string]: string;
}): crashlytics.Issue;
/** Fetch an example Issue already populated with data. */
export declare function exampleIssue(): crashlytics.Issue;
