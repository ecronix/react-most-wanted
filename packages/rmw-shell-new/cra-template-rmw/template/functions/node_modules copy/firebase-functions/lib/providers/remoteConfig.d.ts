import { CloudFunction, EventContext } from '../cloud-functions';
import { DeploymentOptions } from '../function-configuration';
/** @hidden */
export declare const provider = "google.firebase.remoteconfig";
/** @hidden */
export declare const service = "firebaseremoteconfig.googleapis.com";
/**
 * Registers a function that triggers on Firebase Remote Config template
 * update events.
 *
 * @param handler A function that takes the updated Remote Config
 *   template version metadata as an argument.
 *
 * @return A Cloud Function that you can export and deploy.
 */
export declare function onUpdate(handler: (version: TemplateVersion, context: EventContext) => PromiseLike<any> | any): CloudFunction<TemplateVersion>;
/** @hidden */
export declare function _onUpdateWithOptions(handler: (version: TemplateVersion, context: EventContext) => PromiseLike<any> | any, options: DeploymentOptions): CloudFunction<TemplateVersion>;
/** Builder used to create Cloud Functions for Remote Config. */
export declare class UpdateBuilder {
    private triggerResource;
    private options;
    /** @hidden */
    constructor(triggerResource: () => string, options: DeploymentOptions);
    /**
     * Handle all updates (including rollbacks) that affect a Remote Config
     * project.
     * @param handler A function that takes the updated Remote Config template
     * version metadata as an argument.
     */
    onUpdate(handler: (version: TemplateVersion, context: EventContext) => PromiseLike<any> | any): CloudFunction<TemplateVersion>;
}
/**
 * An interface representing a Remote Config template version metadata object
 * emitted when a project is updated.
 */
export interface TemplateVersion {
    /** The version number of the updated Remote Config template. */
    versionNumber: number;
    /** When the template was updated in format (ISO8601 timestamp). */
    updateTime: string;
    /**
     * Metadata about the account that performed the update, of
     * type [`RemoteConfigUser`](/docs/reference/remote-config/rest/v1/Version#remoteconfiguser).
     */
    updateUser: RemoteConfigUser;
    /** A description associated with this Remote Config template version. */
    description: string;
    /**
     * The origin of the caller - either the Firebase console or the Remote Config
     * REST API. See [`RemoteConfigUpdateOrigin`](/docs/reference/remote-config/rest/v1/Version#remoteconfigupdateorigin)
     * for valid values.
     */
    updateOrigin: string;
    /**
     * The type of update action that was performed, whether forced,
     * incremental, or a rollback operation. See
     * [`RemoteConfigUpdateType`](/docs/reference/remote-config/rest/v1/Version#remoteconfigupdatetype)
     * for valid values.
     */
    updateType: string;
    /**
     * The version number of the Remote Config template that this update rolled back to.
     * Only applies if this update was a rollback.
     */
    rollbackSource?: number;
}
/**
 * An interface representing metadata for a Remote Config account
 * that performed the update. Contains the same fields as
 * [`RemoteConfigUser`](/docs/reference/remote-config/rest/v1/Version#remoteconfiguser).
 */
export interface RemoteConfigUser {
    /** Name of the Remote Config account that performed the update. */
    name?: string;
    /** Email address of the Remote Config account that performed the update. */
    email: string;
    /** Image URL of the Remote Config account that performed the update. */
    imageUrl?: string;
}
