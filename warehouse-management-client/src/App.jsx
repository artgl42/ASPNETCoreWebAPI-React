import React, { useReducer, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Slider from './components/utils/Slider';
import Menu from './components/Menu';
import ReducerContext from './components/hooks/useReducerContext';
import reducer from './components/utils/reducer';

export default function App() {
  const initialState = { data: null };
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerDispatch = useMemo(() => ({ dispatch }), []);

  return (
    <Container>
      <Slider />
      <ReducerContext.Provider value={providerDispatch}>
        <Menu />
        {state.data}
      </ReducerContext.Provider>
    </Container>
  );
}
