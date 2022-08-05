import React, { useState, useEffect, useMemo } from "react";
// @ts-ignore
import { Stack, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { API_URL_TRANSACTIONS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import TransactionCreate from "./TransactionCreate";
import TransactionsFilter from "../../UI/Filter";

export default function Transactions() {
  const { data, loading, error, fetchData } = useFetch(API_URL_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [filterOpt, setFilterOpt] = useState({
    selectedSort: "",
    searchQuery: "",
  });

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
    fetchData(API_URL_TRANSACTIONS, options);
  }

  const sortedTransactions = useMemo(() => {
    if (filterOpt.selectedSort !== "") {
      switch (filterOpt.selectedSort) {
        case "Date":
          return [...transactions].sort(function (a, b) {
            return (
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
          });
        case "Warehouse (from)":
          return [...transactions].sort((a, b) =>
            a.warehouseFrom.name.localeCompare(b.warehouseFrom.name)
          );
        case "Warehouse (to)":
          return [...transactions].sort((a, b) =>
            a.warehouseIn.name.localeCompare(b.warehouseIn.name)
          );
        case "Product":
          return [...transactions].sort((a, b) =>
            a.product.name.localeCompare(b.product.name)
          );
        case "Count (ascending)":
          return [...transactions].sort(function (a, b) {
            return a.count - b.count;
          });
        case "Count (descending)":
          return [...transactions].sort(function (a, b) {
            return b.count - a.count;
          });
        default:
          break;
      }
    }
    return transactions;
  }, [transactions, filterOpt.selectedSort]);

  const sortedAndSearchedTransactions = useMemo(() => {
    return sortedTransactions.filter((transaction) =>
      transaction.product.name
        .toLowerCase()
        .includes(filterOpt.searchQuery.toLowerCase())
    );
  }, [sortedTransactions, filterOpt.searchQuery]);

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <TransactionCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createTransactionCallback={createTransactionCallback}
      />
      <TransactionsFilter
        selectOpt={[
          { value: "Date" },
          { value: "Warehouse (from)" },
          { value: "Warehouse (to)" },
          { value: "Product" },
          { value: "Count (ascending)" },
          { value: "Count (descending)" },
        ]}
        filterOpt={filterOpt}
        setFilterOpt={setFilterOpt}
      />
      <ListGroup as="ol" numbered variant="flush">
        {sortedAndSearchedTransactions !== null &&
        sortedAndSearchedTransactions.length === 0 ? (
          <Stack className="m-auto mt-2">
            <h5>The transactions table is empty.</h5>
          </Stack>
        ) : (
          sortedAndSearchedTransactions.map((transaction) => (
            <ListGroup.Item as="li" key={transaction.id} className="d-flex">
              <Stack className="w-100 ms-2">
                {`${transaction.dateTime.slice(0, 10)}`}
              </Stack>
              <Stack className="w-100">{`${transaction.warehouseFrom.name}`}</Stack>
              <Stack className="w-100">{`${transaction.warehouseIn.name}`}</Stack>
              <Stack className="w-100">{`${transaction.product.name}`}</Stack>
              <Stack className="w-100">{`${transaction.count}`}</Stack>
            </ListGroup.Item>
          ))
        )}
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
