import React, { useState, useEffect } from 'react';
import {
  Stack, ListGroup, Button, ButtonGroup,
} from 'react-bootstrap';
import { API_URL_GET_ALL_TRANSACTIONS } from '../constants/API';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../UI/LoadSpinner';
import ErrorAlert from '../UI/ErrorAlert';

export default function Transactions() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!loading) {
      setTransactions(data);
    }
  }, [loading, data]);

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <ListGroup as="ol" numbered variant="flush">
        {transactions !== null && transactions.map((transaction) => (
          <ListGroup.Item as="li" key={transaction.id} className="d-flex">
            <Stack className="ms-2 me-auto">
              {`${transaction.dateTime}`}
            </Stack>
            <Stack>
              {`${transaction.warehouseFrom.name}`}
            </Stack>
            <Stack className="ms-2 me-auto">
              {`${transaction.warehouseIn.name}`}
            </Stack>
            <Stack>
              {`${transaction.product.name}`}
            </Stack>
            <Stack>
              {`${transaction.count}`}
            </Stack>
            <Button
              size="sm"
              variant="outline-success"
              className="mx-1 my-0"
            >
              Update
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
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
