import React, { useEffect, useReducer } from "react";
import Context from "./Context";

type ReducerAction = {
  type: string;
  auth: any;
};

function reducer(state: any, action: ReducerAction) {
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

const Provider: React.FC<{
  children: React.ReactNode;
  persistKey: string;
}> = ({ persistKey = "auth", children }) => {
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

  const setAuth = (auth: any) => {
    dispatch({ type: "SET_AUTH", auth });
  };

  const updateAuth = (auth: any) => {
    dispatch({ type: "UPDATE_AUTH", auth });
  };

  return (
    <Context.Provider value={{ auth, setAuth, updateAuth }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
