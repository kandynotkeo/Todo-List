import { createContext, useContext as useReactContext } from "react";

const contextFactory = (initialValue = null) => {
  const Context = createContext(initialValue);
  const useContext = () => {
    const context = useReactContext(Context);
    if (context) return context;
    throw Error("Context not found.");
  };
  return { Provider: Context.Provider, useContext };
};

export default contextFactory;
