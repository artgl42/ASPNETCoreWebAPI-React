import React, { useState } from "react";
import Constants from "../Constants";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const url = Constants.API_URL_GET_ALL_TRANSACTIONS;

  function getTransactions() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setTransactions(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Stack>
      <Table striped bordered hover size="sm">
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
                <Button
                  className="mx-1 my-0"
                  variant="outline-success"
                  size="sm"
                  onClick={() => console.log("Button Update")}
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => console.log("Button Delete")}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button variant="outline-primary" size="sm" onClick={getTransactions}>
          Get transactions from server
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setTransactions([])}
        >
          Create transactions
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setTransactions([])}
        >
          Clear
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
