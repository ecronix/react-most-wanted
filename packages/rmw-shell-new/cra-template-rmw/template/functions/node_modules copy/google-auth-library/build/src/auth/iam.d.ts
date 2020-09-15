export interface RequestMetadata {
    'x-goog-iam-authority-selector': string;
    'x-goog-iam-authorization-token': string;
}
export declare class IAMAuth {
    selector: string;
    token: string;
    /**
     * IAM credentials.
     *
     * @param selector the iam authority selector
     * @param token the token
     * @constructor
     */
    constructor(selector: string, token: string);
    /**
     * Indicates whether the credential requires scopes to be created by calling
     * createdScoped before use.
     * @deprecated
     * @return always false
     */
    createScopedRequired(): boolean;
    /**
     * Pass the selector and token to the metadataFn callback.
     * @deprecated
     * @param unused_uri is required of the credentials interface
     * @param metadataFn a callback invoked with object containing request
     * metadata.
     */
    getRequestMetadata(unusedUri: string | null, metadataFn: (err: Error | null, metadata?: RequestMetadata) => void): void;
    /**
     * Acquire the HTTP headers required to make an authenticated request.
     */
    getRequestHeaders(): {
        'x-goog-iam-authority-selector': string;
        'x-goog-iam-authorization-token': string;
    };
}
