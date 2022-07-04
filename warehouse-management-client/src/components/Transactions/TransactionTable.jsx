import React, { useState, useEffect } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../../Urls';
import TransactionRow from './TransactionRow';
import LoadSpinner from '../LoadSpinner';

export default function TransactionTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_TRANSACTIONS)
      .then((result) => result.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTransactions(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [isLoaded]);

  if (error) {
    return (
      <Stack>
        Ошибка:
        {error.message}
      </Stack>
    );
  }
  if (!isLoaded) return <LoadSpinner />;
  return (
    <Stack>
      <Table striped hover size="sm">
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
            <TransactionRow
              key={transaction.id}
              id={transaction.id}
              date={transaction.dateTime}
              warehouseFrom={transaction.warehouseFrom.name}
              warehouseIn={transaction.warehouseIn.name}
              product={transaction.product.name}
              count={transaction.count}
            />
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setIsLoaded(false)}
        >
          Show transactions
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setTransactions([])}
        >
          Add transaction
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setTransactions([])}
        >
          Clear table
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
