import React, { useEffect, useReducer } from "react";
import Context from "./Context";

type ReducerAction = {
  type: string;
  key?: string;
  value?: any;
  persist?: boolean;
};

function reducer(state: any, action: ReducerAction) {
  const { type, key, value, persist } = action;
  switch (type) {
    case "add":
      if (!key)
        throw new Error("Reducer Error: Key must be present when adding");
      return { ...state, [key]: { value, persist } };
    case "clear":
      if (!key)
        throw new Error("Reducer Error: Key must be present when clearing");
      const { [key]: clearedKey, ...rest } = state;
      return { ...rest };
    case "clear_all":
      return {};
    default:
      throw new Error();
  }
}

function getInitState(persistKey: string) {
  let persistedValues = {};
  try {
    persistedValues =
      JSON.parse(
        localStorage.getItem(persistKey)?.replace("undefined", "{}") || "{}"
      ) || {};
  } catch (error) {
    console.warn(error);
  }
  return persistedValues;
}

const Provider: React.FC<{
  children: React.ReactNode;
  persistKey?: string;
}> = ({ children, persistKey = "simple_values" }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey));

  useEffect(() => {
    try {
      const persistValues: Record<string, any> = {};

      Object.keys(state).map((k) => {
        if (state[k].persist) {
          persistValues[k] = { value: state[k].value, persist: true };
        }

        return k;
      });

      localStorage.setItem(persistKey, JSON.stringify(persistValues));
    } catch (error) {
      console.warn(error);
    }
  }, [state, persistKey]);

  const setValue = (key: string, value: any, persist = false) => {
    dispatch({ type: "add", key, value, persist });
  };

  const getValue = (key: string, defaultValue: any) => {
    if (state[key] !== undefined) {
      return state[key].value;
    } else {
      return defaultValue;
    }
  };

  const clearValue = (key: string) => {
    dispatch({ type: "clear", key });
  };

  const clearAll = () => {
    dispatch({ type: "clear_all" });
  };

  return (
    <Context.Provider value={{ setValue, getValue, clearValue, clearAll }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
