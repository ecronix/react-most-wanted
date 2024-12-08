/* eslint-disable default-case */
import Context from "./Context";
import React, { useCallback, useEffect, useReducer } from "react";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { IProviderProps } from "@ecronix/material-ui-shell";
import { ActionTypeBase } from "../..";

enum ActionTypes {
  LOADING_CHANGED = "LOADING_CHANGED",
  ERROR = "ERROR",
  VALUE_CHANGE = "VALUE_CHANGED",
  CLEAR = "CLEAR",
  CLEAR_ALL = "CLEAR_ALL",
  CHILD_ADDED = "CHILD_ADDED",
  CHILD_CHANGED = "CHILD_CHANGED",
  CHILD_REMOVED = "CHILD_REMOVED",
}

type ActionType = ActionTypeBase & {
  type: ActionTypes;
};

function list(list: DocumentData[] = [], action: ActionType) {
  const { payload, type } = action;
  switch (type) {
    case ActionTypes.CHILD_ADDED:
      return list.findIndex((d) => d.id === payload.id) === -1
        ? [...list, payload]
        : [...list];

    case ActionTypes.CHILD_CHANGED:
      return list.map((child) => (payload.id === child.id ? payload : child));

    case ActionTypes.CHILD_REMOVED:
      return list.filter((child) => payload.id !== child.id);
  }
}

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
    case ActionTypes.ERROR:
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
    case ActionTypes.CHILD_ADDED:
    case ActionTypes.CHILD_CHANGED:
    case ActionTypes.CHILD_REMOVED:
      return {
        ...state,
        [path]: {
          ...state[path],

          value: list(state[path].value, action),
        },
      };
    case ActionTypes.CLEAR_ALL:
      return {};
    default:
      throw new Error();
  }
}

function getInitState(persistKey: string) {
  let persistedValues = {};
  try {
    const pkString = localStorage.getItem(persistKey);
    persistedValues = pkString ? JSON.parse(pkString) : null;
  } catch (error) {
    console.warn(error);
  }
  return persistedValues;
}

const inits: DocumentData = {};

const setInit = (path: string, unsub: any): void => {
  inits[path] = unsub;
};

const removeInit = (path: string): void => {
  inits[path] = false;
};

const getPath = (ref: any): string => {
  return ref.path;
};

const getLocation = (
  path: string | CollectionReference<DocumentData, DocumentData>
): string => {
  if (typeof path === "string") {
    return path;
  } else {
    return getPath(path);
  }
};

const unwatchCol = (
  reference: CollectionReference<DocumentData, DocumentData>
): void => {
  const path = getLocation(reference);
  inits[path] && inits[path]();
  removeInit(path);
};

const Provider = ({
  children,
  persistKey = "firebase_cols",
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey));
  const db = getFirestore();

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state));
    } catch (error) {
      console.warn(error);
    }
  }, [state, persistKey]);

  const getRef = useCallback(
    (path: string) => {
      if (typeof path === "string") {
        return collection(db, path);
      } else {
        return path;
      }
    },
    [db]
  );

  const watchCol = useCallback(
    async (reference: string, alias: string) => {
      const ref = getRef(reference);
      const path = alias || getLocation(reference);

      if (path.length < 1) {
        return;
      }

      if (inits[path]) {
        // we skip multiple listeners
        // only one should be active
        return;
      }

      const handleError = (error: Error): void => {
        dispatch({
          type: ActionTypes.ERROR,
          path,
          isLoading: false,
          error,
          hasError: true,
        });
        removeInit(path);
      };

      const handleChange = (doc: any, type: ActionTypes): void => {
        dispatch({
          type,
          payload: { id: doc.id, data: doc.data() },
          path: "",
        });
      };

      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isLoading: true,
      });

      try {
        const unsub = onSnapshot(
          ref,
          (snapshot: QuerySnapshot) => {
            setInit(path, unsub);
            dispatch({
              type: ActionTypes.LOADING_CHANGED,
              path,
              isLoading: false,
            });
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                handleChange(change.doc, ActionTypes.CHILD_ADDED);
              }
              if (change.type === "modified") {
                handleChange(change.doc, ActionTypes.CHILD_CHANGED);
              }
              if (change.type === "removed") {
                handleChange(change.doc, ActionTypes.CHILD_REMOVED);
              }
            });
          },
          handleError
        );
      } catch (error) {
        handleError(error as Error);
      }
    },
    [getRef]
  );

  const getCol = useCallback(
    (path: string) => {
      return state[path] && state[path].value ? state[path].value : [];
    },
    [state]
  );

  const isColLoading = useCallback(
    (path: string) => {
      return state[path] ? state[path].isLoading : false;
    },
    [state]
  );

  const getColError = useCallback(
    (path: string) => {
      return state[path] ? state[path].error : false;
    },
    [state]
  );

  const hasColError = useCallback(
    (path: string) => {
      return state[path] ? state[path].hasError : false;
    },
    [state]
  );

  const clearCol = useCallback(
    (reference: string) => {
      const ref: CollectionReference<DocumentData, DocumentData> =
        getRef(reference);
      const path = getLocation(reference);

      unwatchCol(ref);
      dispatch({ type: ActionTypes.CLEAR, path });
    },
    [getRef]
  );

  const clearAllCols = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ALL, path: "" });
  }, []);

  return (
    <Context.Provider
      value={{
        watchCol,
        unwatchCol,
        getCol,
        clearCol,
        clearAllCols,
        isColLoading,
        hasColError,
        getColError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
