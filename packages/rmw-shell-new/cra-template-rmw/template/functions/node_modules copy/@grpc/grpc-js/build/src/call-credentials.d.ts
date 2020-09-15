import { Metadata } from './metadata';
export interface CallMetadataOptions {
    service_url: string;
}
export declare type CallMetadataGenerator = (options: CallMetadataOptions, cb: (err: Error | null, metadata?: Metadata) => void) => void;
/**
 * A class that represents a generic method of adding authentication-related
 * metadata on a per-request basis.
 */
export declare abstract class CallCredentials {
    /**
     * Asynchronously generates a new Metadata object.
     * @param options Options used in generating the Metadata object.
     */
    abstract generateMetadata(options: CallMetadataOptions): Promise<Metadata>;
    /**
     * Creates a new CallCredentials object from properties of both this and
     * another CallCredentials object. This object's metadata generator will be
     * called first.
     * @param callCredentials The other CallCredentials object.
     */
    abstract compose(callCredentials: CallCredentials): CallCredentials;
    /**
     * Check whether two call credentials objects are equal. Separate
     * SingleCallCredentials with identical metadata generator functions are
     * equal.
     * @param other The other CallCredentials object to compare with.
     */
    abstract _equals(other: CallCredentials): boolean;
    /**
     * Creates a new CallCredentials object from a given function that generates
     * Metadata objects.
     * @param metadataGenerator A function that accepts a set of options, and
     * generates a Metadata object based on these options, which is passed back
     * to the caller via a supplied (err, metadata) callback.
     */
    static createFromMetadataGenerator(metadataGenerator: CallMetadataGenerator): CallCredentials;
    static createEmpty(): CallCredentials;
}
