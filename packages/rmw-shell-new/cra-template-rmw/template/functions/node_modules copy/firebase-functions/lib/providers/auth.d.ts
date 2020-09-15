import * as firebase from 'firebase-admin';
import { CloudFunction, EventContext } from '../cloud-functions';
import { DeploymentOptions } from '../function-configuration';
/** @hidden */
export declare const provider = "google.firebase.auth";
/** @hidden */
export declare const service = "firebaseauth.googleapis.com";
/**
 * Handle events related to Firebase authentication users.
 */
export declare function user(): UserBuilder;
/** @hidden */
export declare function _userWithOptions(options: DeploymentOptions): UserBuilder;
export declare class UserRecordMetadata implements firebase.auth.UserMetadata {
    creationTime: string;
    lastSignInTime: string;
    constructor(creationTime: string, lastSignInTime: string);
    /** Returns a plain JavaScript object with the properties of UserRecordMetadata. */
    toJSON(): {
        creationTime: string;
        lastSignInTime: string;
    };
}
/** Builder used to create Cloud Functions for Firebase Auth user lifecycle events. */
export declare class UserBuilder {
    private triggerResource;
    private options?;
    private static dataConstructor;
    /** @hidden */
    constructor(triggerResource: () => string, options?: DeploymentOptions);
    /** Respond to the creation of a Firebase Auth user. */
    onCreate(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
    /** Respond to the deletion of a Firebase Auth user. */
    onDelete(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
    private onOperation;
}
/**
 * The UserRecord passed to Cloud Functions is the same UserRecord that is returned by the Firebase Admin
 * SDK.
 */
export declare type UserRecord = firebase.auth.UserRecord;
/**
 * UserInfo that is part of the UserRecord
 */
export declare type UserInfo = firebase.auth.UserInfo;
export declare function userRecordConstructor(wireData: Object): firebase.auth.UserRecord;
