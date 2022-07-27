import React from "react";
import Products from "../views/Products/Products";
import Transactions from "../views/Warehouses/Transactions";
import Warehouses from "../views/Warehouses/Warehouses";
import WarehouseProducts from "../views/WarehouseProducts";

export default function Reducer(_view, action) {
  switch (action.type) {
    case "Null":
      return {
        dataView: null,
      };
    case "ProductsTable":
      return {
        dataView: <Products />,
      };
    case "WarehouseCards":
      return {
        dataView: <Warehouses />,
      };
    case "TransactionsTable":
      return {
        dataView: <Transactions />,
      };
    case "BalanceProducts":
      return {
        dataView: <WarehouseProducts id={action.id} />,
      };
    default:
      throw new Error();
  }
}
