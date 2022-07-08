import React, { useReducer, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Slider from './components/UI/Slider';
import Menu from './components/UI/Menu';
import ReducerContext from './components/hooks/useReducerContext';
import reducer from './components/utils/Reducer';

export default function App() {
  const initView = { dataView: null };
  const [view, dispatch] = useReducer(reducer, initView);
  const viewManager = useMemo(() => ({ view, dispatch }), [view]);

  return (
    <Container>
      <Slider />
      <ReducerContext.Provider value={viewManager}>
        <Menu />
        {view.dataView}
      </ReducerContext.Provider>
    </Container>
  );
}
