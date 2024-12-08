/* eslint-disable default-case */
import Context from "./Context";
import React, { useEffect, useReducer, useCallback } from "react";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  get,
  off,
  DatabaseReference,
  Query,
} from "firebase/database";
import { DocumentData } from "firebase/firestore";
import { ActionTypeBase } from "../..";
import { IProviderProps } from "@ecronix/material-ui-shell";

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
  path: string;
};

const inits: DocumentData = {};

const setInit = (path: string) => {
  inits[path] = true;
};

const removeInit = (path: string) => {
  inits[path] = false;
};

function list(list: DocumentData[] = [], action: ActionType) {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.CHILD_ADDED:
      return list.findIndex((d) => d.key === payload.key) === -1
        ? [...list, payload]
        : [...list];

    case ActionTypes.CHILD_CHANGED:
      return list.map((child) => (payload.key === child.key ? payload : child));

    case ActionTypes.CHILD_REMOVED:
      return list.filter((child) => payload.key !== child.key);
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
      console.log("state[path]", state[path]);
      if (state[path]) {
        return {
          ...state,
          //TO DO: a bug happens if state[path] is undefined
          [path]: { ...state[path], value: list(state[path].value, action) },
        };
      } else {
        return state;
      }

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

const Provider = ({
  children,
  persistKey = "firebase_lists",
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

  const getRef = useCallback(
    (path: string | DatabaseReference | Query) => {
      if (typeof path === "string") {
        return ref(db, path);
      } else {
        return path;
      }
    },
    [db]
  );

  const getLocation = useCallback(
    (path: string | DatabaseReference | Query) => {
      if (typeof path === "string") {
        return path;
      } else {
        return path.toString().substring(ref(db).root.toString().length);
      }
    },
    [db]
  );

  const watchList = useCallback(
    async (reference: string | DatabaseReference | Query, alias?: string) => {
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

      let listenForChanges = false;
      // We can't awaid that the single child listeners get calld for every chils
      // but we can use this to not change the state after the inital call
      // because we already have all data we got trough the once call

      const handleError = (error: Error) => {
        dispatch({
          type: ActionTypes.ERROR,
          path,
          isLoading: false,
          error,
          hasError: true,
        });
        removeInit(path);
      };

      const handleChange = (s: DocumentData, type: ActionTypes) => {
        if (listenForChanges) {
          dispatch({
            type,
            path,
            payload: { key: s.key, val: s.val() },
          });
        }
      };

      setInit(path);

      dispatch({
        type: ActionTypes.LOADING_CHANGED,
        path,
        isLoading: true,
      });

      onChildAdded(
        ref,
        (s) => handleChange(s, ActionTypes.CHILD_ADDED),
        handleError
      );
      onChildChanged(
        ref,
        (s) => handleChange(s, ActionTypes.CHILD_CHANGED),
        handleError
      );
      onChildRemoved(
        ref,
        (s) => handleChange(s, ActionTypes.CHILD_REMOVED),
        handleError
      );

      try {
        try {
          const list: DocumentData[] = [];

          const snapshot = await get(getRef(reference));
          snapshot.forEach((snap) => {
            list.push({ key: snap.key, val: snap.val() });
          });

          dispatch({
            type: ActionTypes.VALUE_CHANGE,
            path,
            value: list,
            isLoading: false,
          });
        } catch (error) {
          console.log("Error loading inital data", error);
        } finally {
          dispatch({
            type: ActionTypes.LOADING_CHANGED,
            isLoading: false,
            path, // TODO check if path should be here
          });
        }

        listenForChanges = true;
      } catch (error) {
        handleError(error as Error);
      }
    },
    [getLocation, getRef]
  );

  const unwatchList = useCallback(
    (reference: string | DatabaseReference | Query) => {
      const ref = getRef(reference);
      const path = getLocation(reference);

      if (path.length < 1) {
        return;
      }
      off(ref);
      removeInit(path);
    },
    [getRef, getLocation]
  );

  const getList = useCallback(
    (path: string): any[] => {
      return state[path] && state[path].value ? state[path].value : [];
    },
    [state]
  );

  const isListLoading = useCallback(
    (path: string) => {
      return state[path] ? state[path].isLoading : false;
    },
    [state]
  );

  const getListError = useCallback(
    (path: string) => {
      return state[path] ? state[path].error : false;
    },
    [state]
  );

  const hasListError = useCallback(
    (path: string) => {
      return state[path] ? state[path].hasError : false;
    },
    [state]
  );

  const clearList = useCallback(
    (reference: string) => {
      const ref = getRef(reference);
      const path = getLocation(reference);

      unwatchList(ref);
      dispatch({ type: ActionTypes.CLEAR, path });
    },
    [getRef, getLocation, unwatchList]
  );

  const clearAllLists = useCallback(() => {
    off(ref(db));
    dispatch({ type: ActionTypes.CLEAR_ALL, path: "" });
  }, [db]);

  return (
    <Context.Provider
      value={{
        watchList,
        unwatchList,
        getList,
        clearList,
        clearAllLists,
        isListLoading,
        hasListError,
        getListError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
