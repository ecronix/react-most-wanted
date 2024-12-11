import React, { useEffect, useReducer, useCallback } from "react";
import Context from "./Context";
import {
  getDatabase,
  ref,
  onValue,
  off,
  DataSnapshot,
} from "firebase/database";
import { IProviderProps } from "@ecronix/material-ui-shell";
import { DocumentData } from "firebase/firestore";
import { ActionTypeBase } from "../..";

enum ActionTypes {
  LOADING_CHANGED = "loading_changed",
  ERROR_CHANGED = "error_changed",
  VALUE_CHANGE = "value_changed",
  CLEAR = "clear",
  CLEAR_ALL = "clear_all",
}

type ActionType = ActionTypeBase & {
  type: ActionTypes;
  path: string;
};
type StateType = {
  error?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  value: {
    admins?: any;
    members?: any;
    name?: string;
  };
};
function reducer(state: DocumentData, action: ActionType) {
  const {
    type,
    path,
    value,
    isLoading = false,
    error = false,
    hasError = false,
  } = action;
  switch (type) {
    case ActionTypes.LOADING_CHANGED:
      return { ...state, [path]: { ...state[path], isLoading } };
    case ActionTypes.ERROR_CHANGED:
      return {
        ...state,
        [path]: { ...state[path], error, hasError, isLoading },
      };
    case ActionTypes.VALUE_CHANGE:
      return {
        ...state,
        [path]: { ...state[path], value, isLoading, error, hasError },
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

function getInitState(persistKey: string): DocumentData {
  let persistedValues = {};
  try {
    const pkString = localStorage.getItem(persistKey);
    persistedValues = pkString ? JSON.parse(pkString) : null;
  } catch (error) {
    console.warn(error);
  }
  return persistedValues;
}

const Provider = ({
  children,
  persistKey = "firebase_paths",
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey));
  const db = getDatabase();

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state));
    } catch (error) {
      console.warn(error);
    }
  }, [state, persistKey]);

  const watchPath = useCallback(
    (
      path: string,
      onChange?: (data: Object | string | number | boolean | null) => void
    ) => {
      if (path.length < 1) {
        return;
      }
      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isLoading: true,
      });

      onValue(
        ref(db, path),
        (snapshot: DataSnapshot) => {
          dispatch({
            type: ActionTypes.VALUE_CHANGE,
            path,
            value: snapshot.val(),
            isLoading: false,
          });

          if (onChange) {
            onChange(snapshot.val());
          }
        },
        (error) => {
          dispatch({
            type: ActionTypes.ERROR_CHANGED,
            path,
            isLoading: false,
            error,
            hasError: true,
          });
        }
      );
    },
    [db]
  );

  const unwatchPath = useCallback(
    (path: string) => {
      if (path.length < 1) {
        return;
      }
      off(ref(db, path));
    },
    [db]
  );

  const getPath = useCallback(
    (path: string, defaultValue?: any): any => {
      return state[path] ? state[path].value : defaultValue;
    },
    [state]
  );

  const isPathLoading = useCallback(
    (path: string): boolean => {
      return state[path] ? state[path].isLoading : false;
    },
    [state]
  );

  const getPathError = useCallback(
    (path: string) => {
      return state[path] ? state[path].error : false;
    },
    [state]
  );

  const hasPathError = useCallback(
    (path: string): boolean => {
      return state[path] ? state[path].hasError : false;
    },
    [state]
  );

  const clearPath = useCallback(
    (path: string) => {
      unwatchPath(path);
      dispatch({ type: ActionTypes.CLEAR, path });
    },
    [unwatchPath]
  );

  const clearAllPaths = useCallback(() => {
    off(ref(db));
    dispatch({ type: ActionTypes.CLEAR_ALL, path: "" });
  }, [db]);

  return (
    <Context.Provider
      value={{
        watchPath,
        unwatchPath,
        getPath,
        clearPath,
        clearAllPaths,
        isPathLoading,
        hasPathError,
        getPathError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
