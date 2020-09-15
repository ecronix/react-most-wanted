import { Metadata, ServiceObject } from '@google-cloud/common';
import { Storage } from './storage';
export interface StopCallback {
    (err: Error | null, apiResponse?: Metadata): void;
}
/**
 * Create a channel object to interact with a Cloud Storage channel.
 *
 * @see [Object Change Notification]{@link https://cloud.google.com/storage/docs/object-change-notification}
 *
 * @class
 *
 * @param {string} id The ID of the channel.
 * @param {string} resourceId The resource ID of the channel.
 *
 * @example
 * const {Storage} = require('@google-cloud/storage');
 * const storage = new Storage();
 * const channel = storage.channel('id', 'resource-id');
 */
declare class Channel extends ServiceObject {
    constructor(storage: Storage, id: string, resourceId: string);
    stop(): Promise<Metadata>;
    stop(callback: StopCallback): void;
}
/**
 * Reference to the {@link Channel} class.
 * @name module:@google-cloud/storage.Channel
 * @see Channel
 */
export { Channel };
