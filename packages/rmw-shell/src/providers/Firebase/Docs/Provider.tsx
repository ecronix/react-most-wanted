import React, { useEffect, useReducer, useCallback } from "react";
import Context from "./Context.js";
import {
  doc,
  onSnapshot,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import { IProviderProps } from "@ecronix/material-ui-shell";
import { ActionTypeBase } from "../../index.js";

enum ActionTypes {
  LOADING_CHANGED = "LOADING_CHANGED",
  ERROR = "ERROR",
  VALUE_CHANGE = "VALUE_CHANGED",
  CLEAR = "CLEAR",
  CLEAR_ALL = "CLEAR_ALL",
}

type ActionType = ActionTypeBase & {
  type: ActionTypes;
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

const setInit = (path: string, unsub: any) => {
  inits[path] = unsub;
};

const removeInit = (path: string) => {
  inits[path] = false;
};

const Provider = ({
  children,
  persistKey = "firebase_docs",
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey));

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state));
    } catch (error) {
      console.warn(error);
    }
  }, [state, persistKey]);

  const getRef = useCallback((path: string | string[]) => {
    const db = getFirestore();
    if (typeof path === "string") {
      return doc(db, "/", ...path.split("/"));
    } else if (path instanceof Array) {
      return doc(db, "/", ...path); // TODO how to test this = added "/" as starting path per docs
    } else {
      return path;
    }
  }, []);

  const getLocation = useCallback((path: string | string[]) => {
    if (typeof path === "string") {
      return path;
    } else if (path instanceof Array) {
      return path.join("/");
    } else {
      return doc(path).path;
    }
  }, []);

  const watchDoc = useCallback(
    (reference: string | string[], alias: string) => {
      const ref = getRef(reference);
      const path = alias || getLocation(reference);

      if (path.length < 1) {
        return;
      }

      if (inits[path]) {
        return;
      }

      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isLoading: true,
      });

      let unsub = onSnapshot(
        ref,
        (snapshot) => {
          dispatch({
            type: ActionTypes.VALUE_CHANGE,
            path,
            value: snapshot.data(),
            isLoading: false,
          });
        },
        (error) => {
          dispatch({
            type: ActionTypes.ERROR,
            path,
            isLoading: false,
            error,
            hasError: true,
          });
        }
      );
      setInit(path, unsub);
    },
    [getLocation, getRef]
  );

  const unwatchDoc = useCallback(
    (reference: string) => {
      const path = getLocation(reference);
      inits[path] && inits[path]();
      removeInit(path);
    },
    [getLocation]
  );

  const getDoc = useCallback(
    (path: string, defaultValue: string | DocumentData) => {
      return state[path] ? state[path].value : defaultValue;
    },
    [state]
  );

  const isDocLoading = useCallback(
    (path: string) => {
      return state[path] ? state[path].isLoading : false;
    },
    [state]
  );

  const getDocError = useCallback(
    (path: string) => {
      return state[path] ? state[path].error : false;
    },
    [state]
  );

  const hasDocError = useCallback(
    (path: string) => {
      return state[path] ? state[path].hasError : false;
    },
    [state]
  );

  const clearDoc = useCallback(
    (reference: string) => {
      const path = getLocation(reference);
      unwatchDoc(path);
      dispatch({ type: ActionTypes.CLEAR, path });
    },
    [getLocation, unwatchDoc]
  );

  const clearAllDocs = useCallback(() => {
    Object.keys(inits).map((k) => {
      inits[k].unsub && inits[k].unsub();
      return k;
    });
    dispatch({ type: ActionTypes.CLEAR_ALL, path: "" });
  }, []);

  return (
    <Context.Provider
      value={{
        watchDoc,
        unwatchDoc,
        getDoc,
        clearDoc,
        clearAllDocs,
        isDocLoading,
        hasDocError,
        getDocError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
