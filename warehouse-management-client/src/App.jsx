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
import DataView from './components/DataView';

function reducer(_view, action) {
  switch (action.type) {
    case 'Null':
      return {
        dataView: null,
      };
    case 'ProductsTable':
      return {
        dataView: <ProductsTable />,
      };
    case 'WarehousesTable':
      return {
        dataView: <WarehousesTable />,
      };
    case 'TransactionsTable':
      return {
        dataView: <TransactionsTable />,
      };
    case 'WarehouseCards':
      return {
        dataView: <WarehouseCards />,
      };
    case 'BalanceProducts':
      return {
        dataView: <BalanceProducts id={action.id} />,
      };
    default:
      throw new Error();
  }
}

export default function App() {
  const initView = { dataView: null };
  const [view, dispatch] = useReducer(reducer, initView);
  const viewManager = useMemo(() => ({ view, dispatch }), [view]);

  return (
    <Container>
      <Slider />
      <ReducerContext.Provider value={viewManager}>
        <Menu />
        <DataView />
      </ReducerContext.Provider>
    </Container>
  );
}
