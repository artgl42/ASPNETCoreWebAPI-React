import React, { useState } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../util/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../util/LoadSpinner';
import TransactionRow from './TransactionRow';

export default function TransactionTable() {
  const { data, loading, error } = useFetch(Urls.API_URL_GET_ALL_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error!!!', error);
    return null;
  }
  if (loading) return <LoadSpinner />;
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
          {transactions !== null && transactions.map((transaction) => (
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
          onClick={() => setTransactions(data)}
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
