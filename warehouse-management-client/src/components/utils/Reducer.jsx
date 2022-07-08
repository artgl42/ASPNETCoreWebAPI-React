import React from 'react';
import Products from '../Products';
import Transactions from '../Transactions';
import WarehouseCards from '../WarehouseCards';
import ProductsInWarehouse from '../ProductsInWarehouse';

export default function Reducer(_view, action) {
  switch (action.type) {
    case 'Null':
      return {
        dataView: null,
      };
    case 'ProductsTable':
      return {
        dataView: <Products />,
      };
    case 'WarehouseCards':
      return {
        dataView: <WarehouseCards />,
      };
    case 'TransactionsTable':
      return {
        dataView: <Transactions />,
      };
    case 'BalanceProducts':
      return {
        dataView: <ProductsInWarehouse id={action.id} />,
      };
    default:
      throw new Error();
  }
}
