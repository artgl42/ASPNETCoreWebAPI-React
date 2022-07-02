import React, { useState } from "react";
import Urls from "../../Urls";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";
import TransactionRow from "./TransactionRow";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const url = Urls.API_URL_GET_ALL_TRANSACTIONS;

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
            <TransactionRow key={transaction.id} transaction={{
              id: transaction.id,
              date: transaction.dateTime,
              from: transaction.warehouseFrom.name,
              in: transaction.warehouseIn.name,
              product: transaction.product.name,
              count: transaction.count
            }} />
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
          onClick={() => setTransactions([])}>
          Create transactions
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setTransactions([])}>
          Clear
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
