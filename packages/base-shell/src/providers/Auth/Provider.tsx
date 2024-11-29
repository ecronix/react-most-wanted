import React, { useEffect, useReducer } from "react";
import Context from "./Context";

interface AuthState {
  [key: string]: any;
}

interface AuthAction {
  type: "SET_AUTH" | "UPDATE_AUTH";
  auth: AuthState;
}

function reducer(state: AuthState, action: AuthAction): AuthState {
  const { type, auth } = action;
  switch (type) {
    case "SET_AUTH":
      return auth;
    case "UPDATE_AUTH":
      return { ...state, ...auth };
    default:
      throw new Error();
  }
}

interface ProviderProps {
  persistKey?: string;
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ persistKey = "auth", children }) => {
  const persistAuth = JSON.parse(
    localStorage.getItem(persistKey)?.replace("undefined", "{}") || "{}"
  );

  const [auth, dispatch] = useReducer(reducer, persistAuth || {});

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(auth));
    } catch (error) {
      console.warn(error);
    }
  }, [auth, persistKey]);

  const setAuth = (auth: AuthState) => {
    dispatch({ type: "SET_AUTH", auth });
  };

  const updateAuth = (auth: AuthState) => {
    dispatch({ type: "UPDATE_AUTH", auth });
  };

  return (
    <Context.Provider value={{ auth, setAuth, updateAuth }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
