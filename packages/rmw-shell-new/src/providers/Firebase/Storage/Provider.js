import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'

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
  switch (action.type) {
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

const Provider = ({ children, firebaseApp }) => {
  const [state, dispatch] = useReducer(reducer, {})

  const upload = (path, uploadTask, onUploaded) => {
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
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
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
  }

  const uploadFile = (alias, path, file, metadata, onUploaded) => {
    const uploadTask = firebaseApp.storage().ref(path).put(file, metadata)
    upload(alias, uploadTask, onUploaded)
  }

  const uploadString = (alias, path, string, type, metadata, onUploaded) => {
    const uploadTask = firebaseApp.storage().ref(path).putString(string, type)
    upload(alias, uploadTask, onUploaded)
  }

  const uploadTask = (alias, uploadTask, onUploaded) => {
    upload(alias, uploadTask, onUploaded)
  }

  const getDownloadURL = (path) => {
    return state[path] ? state[path].downloadURL : false
  }

  const isUploading = (path) => {
    return state[path] ? state[path].isUploading : false
  }

  const getUploadError = (path) => {
    return state[path] ? state[path].error : false
  }

  const hasUploadError = (path) => {
    return state[path] ? state[path].hasError : false
  }
  const getUploadProgress = (path) => {
    return state[path] ? state[path].progress : 0
  }

  const clearUpload = (path) => {
    dispatch({ type: CLEAR, path })
  }

  const clearAllUploads = () => {
    dispatch({ type: CLEAR_ALL })
  }

  return (
    <Context.Provider
      value={{
        firebaseApp,
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
  firebaseApp: PropTypes.any,
}

export default Provider
