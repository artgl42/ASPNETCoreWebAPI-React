import React, { useState } from "react";
import Constants from "../Constants";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const url = Constants.API_URL_GET_ALL_TRANSACTIONS;

  function getTransactions() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setTransactions(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">From</th>
            <th scope="col">In</th>
            <th scope="col">Product</th>
            <th scope="col">Count</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <th scope="row">{transaction.id}</th>
              <td>{transaction.dateTime}</td>
              <td>{transaction.warehouseFrom.name}</td>
              <td>{transaction.warehouseIn.name}</td>
              <td>{transaction.product.name}</td>
              <td>{transaction.count}</td>
              <td>
                <button
                  onClick={() => console.log("Button Update")}
                  className="btn btn-outline-success btn-sm mx-1 my-1"
                >
                  Update
                </button>
                <button
                  onClick={() => console.log("Button Delete")}
                  className="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={getTransactions} className="btn btn-outline-primary btn-sm w-100">
          Get transactions from server
        </button>
        <button
          onClick={() => setTransactions([])}
          className="btn btn-outline-success btn-sm w-100"
        >
          Create transactions
        </button>
        <button
          onClick={() => setTransactions([])}
          className="btn btn-outline-danger btn-sm w-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
