import { createContext, useContext as useReactContext } from "react";

export const contextFactory = <T>(initialValue: T | null = null) => {
  const Context = createContext(initialValue);
  const useContext = () => {
    const context = useReactContext(Context);
    if (context) return context;
    throw new Error("No context available.");
  };
  return { Provider: Context.Provider, useContext };
};
