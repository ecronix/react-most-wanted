import * as firebase from 'firebase-admin';
export declare function apps(): apps.Apps;
export declare namespace apps {
    /** @hidden */
    const garbageCollectionInterval: number;
    /** @hidden */
    function delay(delay: number): Promise<unknown>;
    let singleton: apps.Apps;
    let init: () => Apps;
    interface AuthMode {
        admin: boolean;
        variable?: any;
    }
    /** @hidden */
    interface RefCounter {
        [appName: string]: number;
    }
    class Apps {
        private _refCounter;
        private _emulatedAdminApp?;
        constructor();
        _appAlive(appName: string): boolean;
        _destroyApp(appName: string): void;
        retain(): void;
        release(): Promise<void>;
        get admin(): firebase.app.App;
        /**
         * This function allows the Firebase Emulator Suite to override the FirebaseApp instance
         * used by the Firebase Functions SDK. Developers should never call this function for
         * other purposes.
         */
        setEmulatedAdminApp(app: firebase.app.App): void;
        private get firebaseArgs();
    }
}
