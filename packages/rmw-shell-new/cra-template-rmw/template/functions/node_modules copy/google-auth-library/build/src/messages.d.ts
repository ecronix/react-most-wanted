export declare enum WarningTypes {
    WARNING = "Warning",
    DEPRECATION = "DeprecationWarning"
}
export declare function warn(warning: Warning): void;
export interface Warning {
    code: string;
    type: WarningTypes;
    message: string;
    warned?: boolean;
}
export declare const PROBLEMATIC_CREDENTIALS_WARNING: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const DEFAULT_PROJECT_ID_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const COMPUTE_CREATE_SCOPED_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const JWT_CREATE_SCOPED_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const IAM_CREATE_SCOPED_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const JWT_ACCESS_CREATE_SCOPED_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const OAUTH_GET_REQUEST_METADATA_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const IAM_GET_REQUEST_METADATA_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
export declare const JWT_ACCESS_GET_REQUEST_METADATA_DEPRECATED: {
    code: string;
    type: WarningTypes;
    message: string;
};
