import React, { createContext, useContext } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const contextValue = {};
  const Component = GlobalContext.Provider;

  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
