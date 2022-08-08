/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback } from "react";
// @ts-ignore
import { Stack, ListGroup, Button, ButtonGroup, Alert } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { API_URL_TRANSACTIONS } from "../../constants/API";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import TransactionCreate from "./TransactionCreate";
import TransactionsFilter from "../../UI/Filter";
import PaginationUI from "../../UI/PaginationUI";

export default function Transactions({ startPage, transactionsPerPage }) {
  const { status, fetchGet, fetchCreate } = useFetch();
  const [transactions, setTransactions] = useState([]);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [filterOpt, setFilterOpt] = useState({
    selectedSort: "",
    searchQuery: "",
  });

  useEffect(() => {
    if (status.data !== null) {
      setTransactions(status.data);
    } else getTransactions(startPage, transactionsPerPage);
  }, [status.data, startPage, transactionsPerPage]);

  const getTransactions = useCallback(
    (page, itemPerPage) => {
      fetchGet(API_URL_TRANSACTIONS, page, itemPerPage);
    },
    [fetchGet]
  );

  const createTransaction = useCallback(
    (product) => {
      fetchCreate(API_URL_TRANSACTIONS, product);
    },
    [fetchCreate]
  );

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
    if (Array.isArray(sortedTransactions)) {
      return sortedTransactions.filter((transaction) =>
        transaction.product.name
          .toLowerCase()
          .includes(filterOpt.searchQuery.toLowerCase())
      );
    }
    return sortedTransactions;
  }, [sortedTransactions, filterOpt.searchQuery]);

  if (status.error != null)
    return <ErrorAlert message={status.error.message} />;
  if (status.loading) return <LoadSpinner />;
  return (
    <Stack>
      <TransactionCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createTransaction={createTransaction}
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
      <ListGroup as="ol" variant="flush">
        {Array.isArray(sortedAndSearchedTransactions) &&
        sortedAndSearchedTransactions.length === 0 ? (
          <Stack className="m-auto mt-2">
            <h5>The transactions table is empty.</h5>
          </Stack>
        ) : Array.isArray(sortedAndSearchedTransactions) ? (
          sortedAndSearchedTransactions.map((transaction) => (
            <ListGroup.Item as="li" key={transaction.id} className="d-flex">
              <Stack className="ms-2">{`${transaction.id}`}</Stack>
              <Stack className="w-100 ms-2">
                {`${transaction.dateTime.slice(0, 10)}`}
              </Stack>
              <Stack className="w-100">
                {transaction.count >= 0
                  ? `${transaction.warehouseFrom.name}`
                  : `${transaction.warehouseIn.name}`}
              </Stack>
              <Stack className="w-100">
                {transaction.count < 0
                  ? `${transaction.warehouseFrom.name}`
                  : `${transaction.warehouseIn.name}`}
              </Stack>
              <Stack className="w-100">{`${transaction.product.name}`}</Stack>
              <Stack className="w-100">{`${transaction.count}`}</Stack>
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="success" className="m-auto mt-2">
            <Alert.Heading>Completed successfully</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => getTransactions(startPage, transactionsPerPage)}
                variant="outline-success"
              >
                Ok
              </Button>
            </div>
          </Alert>
        )}
      </ListGroup>
      <PaginationUI
        startPage={startPage}
        itemsPerPage={transactionsPerPage}
        pagination={status.pagination}
        onClick={getTransactions}
      />
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setTransactions(status.data)}
        >
          Show all transactions
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            setTransactions(
              status.data.filter((transaction) => transaction.count > 0)
            )
          }
        >
          Show debit transactions
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            setTransactions(
              status.data.filter((transaction) => transaction.count < 0)
            )
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
