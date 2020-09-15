import * as firebase from 'firebase-admin';
export declare function config(): config.Config;
/**
 * Store and retrieve project configuration data such as third-party API
 * keys or other settings. You can set configuration values using the
 * Firebase CLI as described in
 * [Environment Configuration](/docs/functions/config-env).
 */
export declare namespace config {
    /**
     * The Functions configuration interface.
     *
     * Access via `functions.config()`.
     */
    interface Config {
        [key: string]: any;
    }
    /** @hidden */
    let singleton: config.Config;
}
/** @hidden */
export declare function firebaseConfig(): firebase.AppOptions | null;
