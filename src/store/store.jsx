import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State
export const initialState = {
  users: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {}, [state.users]);

  // Actions
  const removeUser = (id) => {
    dispatch({
      type: "REMOVE_USER",
      payload: id,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        removeUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
