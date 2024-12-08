import {
  StringFormat,
  UploadMetadata,
  UploadResult,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import React from "react";

export type OnUploadedType = (
  downloadURL: string,
  snapshot: UploadTaskSnapshot | UploadResult
) => void;

export type StorageContextType = {
  uploadFile: (
    alias: string,
    path: string,
    file: Blob | Uint8Array | ArrayBuffer,
    metadata: UploadMetadata,
    onUploaded: OnUploadedType
  ) => void;
  uploadString: (
    alias: string,
    path: string,
    string: string,
    type: StringFormat,
    metadata: UploadMetadata,
    onUploaded: OnUploadedType
  ) => void;
  uploadTask: (
    alias: string,
    uploadTask: UploadTask,
    onUploaded: OnUploadedType
  ) => void;
  isUploading: (path: string) => boolean;
  getDownloadURL: (path: string) => string | null;
  clearUpload: (path: string) => void;
  clearAllUploads: () => void;
  hasUploadError: (path: string) => boolean;
  getUploadError: (path: string) => string | Error;
  getUploadProgress: (path: string) => number;
};
export const Context = React.createContext<StorageContextType | undefined>(
  undefined
);

export default Context;
