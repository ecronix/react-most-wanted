import React, { useEffect, useReducer } from "react";
import Context from "./Context";

interface SimpleValue {
  value: any;
  persist: boolean;
}

interface SimpleValuesState {
  [key: string]: SimpleValue;
}

interface SimpleValuesAction {
  type: "add" | "clear" | "clear_all";
  key?: string;
  value?: any;
  persist?: boolean;
}

function reducer(state: SimpleValuesState, action: SimpleValuesAction): SimpleValuesState {
  const { type, key, value, persist } = action;
  switch (type) {
    case "add":
      if (key) {
        return { ...state, [key]: { value, persist } };
      }
      return state;
    case "clear":
      if (key) {
        const { [key]: clearedKey, ...rest } = state;
        return { ...rest };
      }
      return state;
    case "clear_all":
      return {};
    default:
      throw new Error();
  }
}

function getInitState(persistKey: string): SimpleValuesState {
  let persistedValues: SimpleValuesState = {};
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

interface ProviderProps {
  children: React.ReactNode;
  persistKey?: string;
}

const Provider: React.FC<ProviderProps> = ({ children, persistKey = "simple_values" }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey));

  useEffect(() => {
    try {
      const persistValues: SimpleValuesState = {};

      Object.keys(state).forEach((k) => {
        if (state[k].persist) {
          persistValues[k] = { value: state[k].value, persist: true };
        }
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
