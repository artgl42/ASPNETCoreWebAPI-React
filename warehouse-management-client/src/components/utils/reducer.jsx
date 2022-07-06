import React from 'react';
import ProductsTable from '../ProductsTable';
import WarehousesTable from '../WarehousesTable';
import TransactionsTable from '../TransactionsTable';
import WarehouseCards from '../reports/WarehouseCards';
import BalanceProducts from '../reports/BalanceProducts';

export default function reducer(state, action) {
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
