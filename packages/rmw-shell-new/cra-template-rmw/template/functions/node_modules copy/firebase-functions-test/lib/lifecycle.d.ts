import { AppOptions } from 'firebase-admin';
export declare class FirebaseFunctionsTest {
    private _oldEnv;
    constructor();
    /** Initialize the SDK. */
    init(
    /** Firebase config values for initializing a Firebase app for your test code to
     * interact with (e.g. making database writes). It is recommended that you use
     * a project that is specifically for testing. If omitted, mock config values will
     * be used and your tests will not interact with a real Firebase app, and all Firebase
     * methods need to be stubbed, otherwise they will fail.
     */
    firebaseConfig?: AppOptions, 
    /** Path to a service account key file to be used when initializing the Firebase app. */
    pathToServiceAccountKey?: string): void;
    /** Complete clean up tasks. */
    cleanup(): void;
}
