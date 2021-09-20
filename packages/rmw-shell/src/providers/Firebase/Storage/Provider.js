import PropTypes from 'prop-types'
import React, { useCallback, useReducer } from 'react'
import Context from './Context'
import { getApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString as uploadStringFirebase,
  getDownloadURL as getDownloadURLFirebase,
} from 'firebase/storage'

const LOADING_CHANGED = 'LOADING_CHANGED'
const PROGRESS_CHANGED = 'PROGRESS_CHANGED'
const ERROR = 'ERROR'
const DOWNLOAD_URL_CHANGE = 'DOWNLOAD_URL_CHANGE'
const CLEAR = 'CLEAR'
const CLEAR_ALL = 'CLEAR_ALL'

function reducer(state, action) {
  const {
    type,
    path,
    downloadURL,
    isUploading = false,
    error = false,
    hasError = false,
    progress = 0,
  } = action
  switch (type) {
    case LOADING_CHANGED:
      return { ...state, [path]: { ...state[path], isUploading, progress } }
    case PROGRESS_CHANGED:
      return { ...state, [path]: { ...state[path], isUploading, progress } }
    case ERROR:
      return {
        ...state,
        [path]: { ...state[path], error, hasError, isUploading, progress },
      }
    case DOWNLOAD_URL_CHANGE:
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
      }
    case CLEAR:
      const { [path]: clearedKey, ...rest } = state
      return { ...rest }
    case CLEAR_ALL:
      return {}
    default:
      throw new Error()
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})

  const upload = useCallback((path, uploadTask, onUploaded) => {
    dispatch({
      type: LOADING_CHANGED,
      path,
      isUploading: true,
      progress: 0,
    })

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        dispatch({
          type: PROGRESS_CHANGED,
          path,
          isUploading: true,
          progress,
        })
      },
      (error) => {
        dispatch({
          type: ERROR,
          path,
          isUploading: false,
          error,
          hasError: true,
        })
      },
      async () => {
        const downloadURL = await getDownloadURLFirebase(
          uploadTask.snapshot.ref
        )
        dispatch({
          type: DOWNLOAD_URL_CHANGE,
          path,
          downloadURL,
          isUploading: false,
          progress: 100,
        })

        if (onUploaded) {
          onUploaded(downloadURL, uploadTask.snapshot)
        }
      }
    )
  }, [])

  const uploadFile = useCallback(
    (alias, path, file, metadata, onUploaded) => {
      const uploadTask = uploadBytesResumable(
        ref(getStorage(getApp()), path),
        file,
        metadata
      )
      upload(alias, uploadTask, onUploaded)
    },
    [upload]
  )

  const uploadString = useCallback(
    (alias, path, string, type, metadata, onUploaded) => {
      const uploadTask = uploadStringFirebase(
        ref(getStorage(getApp()), path),
        string,
        type,
        metadata
      )
      upload(alias, uploadTask, onUploaded)
    },
    [upload]
  )

  const uploadTask = useCallback(
    (alias, uploadTask, onUploaded) => {
      upload(alias, uploadTask, onUploaded)
    },
    [upload]
  )

  const getDownloadURL = useCallback(
    (path) => {
      return state[path] ? state[path].downloadURL : false
    },
    [state]
  )

  const isUploading = useCallback(
    (path) => {
      return state[path] ? state[path].isUploading : false
    },
    [state]
  )

  const getUploadError = useCallback(
    (path) => {
      return state[path] ? state[path].error : false
    },
    [state]
  )

  const hasUploadError = useCallback(
    (path) => {
      return state[path] ? state[path].hasError : false
    },
    [state]
  )

  const getUploadProgress = useCallback(
    (path) => {
      return state[path] ? state[path].progress : 0
    },
    [state]
  )

  const clearUpload = useCallback((path) => {
    dispatch({ type: CLEAR, path })
  }, [])

  const clearAllUploads = useCallback(() => {
    dispatch({ type: CLEAR_ALL })
  }, [])

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
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
