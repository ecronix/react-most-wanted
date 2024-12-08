import React, { useCallback, useReducer } from "react";
import Context, { OnUploadedType } from "./Context.js";
import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString as uploadStringFirebase,
  getDownloadURL as getDownloadURLFirebase,
  UploadTask,
  UploadMetadata,
  StringFormat,
} from "firebase/storage";
import { ActionTypeBase } from "../../index.js";
import { IProviderProps } from "@ecronix/material-ui-shell";
import { DocumentData } from "firebase/firestore";

enum ActionTypes {
  LOADING_CHANGED = "LOADING_CHANGED",
  PROGRESS_CHANGED = "PROGRESS_CHANGED",
  ERROR = "ERROR",
  DOWNLOAD_URL_CHANGE = "DOWNLOAD_URL_CHANGE",
  CLEAR = "CLEAR",
  CLEAR_ALL = "CLEAR_ALL",
}

type ActionType = ActionTypeBase & {
  type: ActionTypes;
  path: string;
  downloadURL?: string;
  isUploading?: boolean;
  progress?: number;
};

// type StateType = {
//   type?: string;
//   path?: string;
//   isUploading?: boolean;
//   progress?: number;
//   error?: string;
//   hasError?: boolean;
//   downloadURL?: string;
// };

function reducer(state: DocumentData, action: ActionType) {
  const {
    type,
    path,
    downloadURL,
    isUploading = false,
    error = false,
    hasError = false,
    progress = 0,
  } = action;
  switch (type) {
    case ActionTypes.LOADING_CHANGED:
    case ActionTypes.PROGRESS_CHANGED:
      return { ...state, [path]: { ...state[path], isUploading, progress } };
    case ActionTypes.ERROR:
      return {
        ...state,
        [path]: { ...state[path], error, hasError, isUploading, progress },
      };
    case ActionTypes.DOWNLOAD_URL_CHANGE:
      return {
        ...state,
        [path]: {
          ...state[path],
          downloadURL,
          isUploading,
          error,
          hasError,
          progress,
        },
      };
    case ActionTypes.CLEAR:
      const { [path]: clearedKey, ...rest } = state;
      return { ...rest };
    case ActionTypes.CLEAR_ALL:
      return {};
    default:
      throw new Error();
  }
}

const Provider = ({ children }: IProviderProps) => {
  const initState: DocumentData = {};
  const [state, dispatch] = useReducer(reducer, initState);

  const upload = useCallback(
    (path: string, uploadTask: UploadTask, onUploaded: OnUploadedType) => {
      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isUploading: true,
        progress: 0,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch({
            type: ActionTypes.PROGRESS_CHANGED,
            path,
            isUploading: true,
            progress,
          });
        },
        (error) => {
          dispatch({
            type: ActionTypes.ERROR,
            path,
            isUploading: false,
            error,
            hasError: true,
          });
        },
        async () => {
          const downloadURL = await getDownloadURLFirebase(
            uploadTask.snapshot.ref
          );
          dispatch({
            type: ActionTypes.DOWNLOAD_URL_CHANGE,
            path,
            downloadURL,
            isUploading: false,
            progress: 100,
          });

          if (onUploaded) {
            onUploaded(downloadURL, uploadTask.snapshot);
          }
        }
      );
    },
    []
  );

  const uploadFile = useCallback(
    (
      alias: string,
      path: string,
      file: Blob | Uint8Array | ArrayBuffer,
      metadata: UploadMetadata,
      onUploaded: OnUploadedType
    ) => {
      const uploadTask = uploadBytesResumable(
        ref(getStorage(getApp()), path),
        file,
        metadata
      );
      upload(alias, uploadTask, onUploaded);
    },
    [upload]
  );

  const uploadString = useCallback(
    async (
      alias: string,
      path: string,
      string: string,
      type: StringFormat,
      metadata: UploadMetadata,
      onUploaded: OnUploadedType
    ) => {
      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isUploading: true,
        progress: 0,
      });

      const snap = await uploadStringFirebase(
        ref(getStorage(getApp()), path),
        string,
        type,
        metadata
      );

      const downloadURL = await getDownloadURLFirebase(snap.ref);
      dispatch({
        type: ActionTypes.DOWNLOAD_URL_CHANGE,
        path,
        downloadURL,
        isUploading: false,
        progress: 100,
      });

      if (onUploaded) {
        onUploaded(downloadURL, snap);
      }
    },
    []
  );

  const uploadTask = useCallback(
    (alias: string, uploadTask: UploadTask, onUploaded: OnUploadedType) => {
      upload(alias, uploadTask, onUploaded);
    },
    [upload]
  );

  const getDownloadURL = useCallback(
    (path: string) => {
      return state[path] ? state[path].downloadURL : null;
    },
    [state]
  );

  const isUploading = useCallback(
    (path: string) => {
      return state[path] ? state[path].isUploading : false;
    },
    [state]
  );

  const getUploadError = useCallback(
    (path: string) => {
      return state[path] ? state[path].error : false;
    },
    [state]
  );

  const hasUploadError = useCallback(
    (path: string) => {
      return state[path] ? state[path].hasError : false;
    },
    [state]
  );

  const getUploadProgress = useCallback(
    (path: string) => {
      return state[path] ? state[path].progress : 0;
    },
    [state]
  );

  const clearUpload = useCallback((path: string) => {
    dispatch({ type: ActionTypes.CLEAR, path });
  }, []);

  const clearAllUploads = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ALL, path: "" });
  }, []);

  return (
    <Context.Provider
      value={{
        uploadFile,
        uploadString,
        uploadTask,
        isUploading,
        getDownloadURL,
        clearUpload,
        clearAllUploads,
        hasUploadError,
        getUploadError,
        getUploadProgress,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
