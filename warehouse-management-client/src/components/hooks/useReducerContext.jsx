import { createContext, useContext } from 'react';

const ReducerContext = createContext();

export function useReducerContext() {
  return useContext(ReducerContext);
}

export default ReducerContext;
