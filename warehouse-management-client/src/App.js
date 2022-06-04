import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import TransactionTable from "./components/TransactionTable";
import WarehouseTable from "./components/WarehouseTable";

export default function App() {
  const [content, setContent] = useState(null);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col d-flex flex-column">
          <button
            onClick={() => setContent(<ProductTable />)}
            className="btn btn-outline-success btn-lg mx-1 my-1"
          >
            Show products
          </button>
        </div>
        <div className="col d-flex flex-column">
          <button
            onClick={() => setContent(<WarehouseTable />)}
            className="btn btn-outline-success btn-lg mx-1 my-1"
          >
            Show warehouses
          </button>
        </div>
        <div className="col d-flex flex-column">
          <button
            onClick={() => setContent(<TransactionTable />)}
            className="btn btn-outline-success btn-lg mx-1 my-1"
          >
            Show transaction
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {content}
        </div>
      </div>
    </div>
  );
}
