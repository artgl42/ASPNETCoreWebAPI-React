import React, { useReducer, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Slider from './components/utils/Slider';
import Menu from './components/Menu';
import ReducerContext from './components/hooks/useReducerContext';
import ProductsTable from './components/ProductsTable';
import WarehousesTable from './components/WarehousesTable';
import TransactionsTable from './components/TransactionsTable';
import WarehouseCards from './components/reports/WarehouseCards';
import BalanceProducts from './components/reports/BalanceProducts';

function reducer(state, action) {
  switch (action.type) {
    case 'Null':
      return {
        ...state,
        data: null,
      };
    case 'ProductsTable':
      return {
        ...state,
        data: <ProductsTable />,
      };
    case 'WarehousesTable':
      return {
        ...state,
        data: <WarehousesTable />,
      };
    case 'TransactionsTable':
      return {
        ...state,
        data: <TransactionsTable />,
      };
    case 'WarehouseCards':
      return {
        ...state,
        data: <WarehouseCards />,
      };
    case 'BalanceProducts':
      return {
        ...state,
        data: <BalanceProducts id={action.id} />,
      };
    default:
      throw new Error();
  }
}

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
