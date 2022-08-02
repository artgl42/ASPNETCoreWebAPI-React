import React, { useState, useEffect } from "react";
// @ts-ignore
import { Stack, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { API_URL_GET_ALL_TRANSACTIONS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import TransactionCreate from "./TransactionCreate";

export default function Transactions() {
  const { data, loading, error, fetchData } = useFetch(
    API_URL_GET_ALL_TRANSACTIONS
  );
  const [transactions, setTransactions] = useState([]);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);

  useEffect(() => {
    if (data !== null) {
      setTransactions(data.filter((transaction) => transaction.count > 0));
    }
  }, [data]);

  function createTransactionCallback(transaction) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    };
    fetchData(API_URL_GET_ALL_TRANSACTIONS, options);
  }

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <TransactionCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createTransactionCallback={createTransactionCallback}
      />
      <ListGroup as="ol" numbered variant="flush">
        {transactions !== null &&
          transactions.map((transaction) => (
            <ListGroup.Item as="li" key={transaction.id} className="d-flex">
              <Stack className="ms-2">
                {`${transaction.dateTime.slice(0, 10)}`}
              </Stack>
              <Stack>{`${transaction.warehouseFrom.name}`}</Stack>
              <Stack>{`${transaction.warehouseIn.name}`}</Stack>
              <Stack>{`${transaction.product.name}`}</Stack>
              <Stack>{`${transaction.count}`}</Stack>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setTransactions(data)}
        >
          Show all transactions
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            setTransactions(data.filter((transaction) => transaction.count > 0))
          }
        >
          Show debit transactions
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            setTransactions(data.filter((transaction) => transaction.count < 0))
          }
        >
          Show credit transactions
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setVisibleCreateForm(true)}
        >
          Create transaction
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
