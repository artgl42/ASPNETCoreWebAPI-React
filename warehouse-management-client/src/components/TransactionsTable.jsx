import React, { useState, useEffect } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import { API_URL_GET_ALL_TRANSACTIONS } from './utils/API';
import useFetch from './hooks/useFetch';
import LoadSpinner from './utils/LoadSpinner';

export default function TransactionsTable() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!loading) {
      setTransactions(data);
    }
  }, [loading, data]);

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
            <th>ID</th>
            <th>Date</th>
            <th>From</th>
            <th>In</th>
            <th>Product</th>
            <th>Count</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {transactions !== null && transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.dateTime}</td>
              <td>{t.warehouseFrom.name}</td>
              <td>{t.warehouseIn.name}</td>
              <td>{t.product.name}</td>
              <td>{t.coun}</td>
              <td>
                <Button
                  className="mx-1 my-0"
                  variant="outline-success"
                  size="sm"
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
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
