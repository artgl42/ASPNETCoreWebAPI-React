// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";
import {
  API_URL_GET_ALL_WAREHOUSES,
  API_URL_GET_ALL_PRODUCTS,
} from "../../constants/API";

export default function TransactionCreate({
  visible,
  setVisible,
  createTransactionCallback,
}) {
  const [error, setError] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState({
    dateTime: "",
    warehouseIdFrom: "",
    warehouseIdIn: "",
    productId: "",
    productCount: "",
  });

  function fetchData(url, setDate) {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else return response.json();
      })
      .then((result) => {
        setDate(result);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    fetchData(API_URL_GET_ALL_WAREHOUSES, setWarehouses);
    fetchData(API_URL_GET_ALL_PRODUCTS, setProducts);
  }, []);

  function createHandler() {
    console.log(transaction);
    //createTransactionCallback(transaction);
    //setVisible(false);
  }

  function handleClickFrom(warehouseId) {
    setTransaction({ ...transaction, warehouseIdFrom: warehouseId });
  }

  function handleClickIn(warehouseId) {
    setTransaction({ ...transaction, warehouseIdIn: warehouseId });
  }

  function handleClickProduct(productId) {
    setTransaction({ ...transaction, productId: productId });
  }

  if (error === null)
    return (
      <ModalWindow
        title="Create transaction"
        visible={visible}
        setVisible={setVisible}
      >
        <Form>
          <Form.Group className="mb-3" controlId="TransactionDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              value={transaction.dateTime}
              onChange={(e) =>
                setTransaction({ ...transaction, dateTime: e.target.value })
              }
              type="date"
              placeholder="Date"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="TransactionFrom">
            <Form.Label>From</Form.Label>
            <DropdownButton
              size="sm"
              menuVariant="dark"
              title={warehouses
                .filter((w) => w.id === transaction.warehouseIdFrom)
                .map((w) => w.name)}
            >
              {warehouses !== null &&
                warehouses.map((warehouse, index) => (
                  <Dropdown.Item
                    key={index}
                    value={warehouse.id}
                    onClick={() => handleClickFrom(warehouse.id)}
                  >
                    {warehouse.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="mb-3" controlId="TransactionIn">
            <Form.Label>In</Form.Label>
            <DropdownButton
              size="sm"
              menuVariant="dark"
              title={warehouses
                .filter((w) => w.id === transaction.warehouseIdIn)
                .map((w) => w.name)}
            >
              {warehouses !== null &&
                warehouses.map((warehouse, index) => (
                  <Dropdown.Item
                    key={index}
                    value={warehouse.id}
                    onClick={() => handleClickIn(warehouse.id)}
                  >
                    {warehouse.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ProductName">
            <Form.Label>Product</Form.Label>
            <DropdownButton
              size="sm"
              menuVariant="dark"
              title={products
                .filter((p) => p.id === transaction.productId)
                .map((p) => p.name)}
            >
              {products !== null &&
                products.map((product, index) => (
                  <Dropdown.Item
                    key={index}
                    value={product.id}
                    onClick={() => handleClickProduct(product.id)}
                  >
                    {product.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ProductCount">
            <Form.Label>Count</Form.Label>
            <Form.Control
              value={transaction.productCount}
              onChange={(e) =>
                setTransaction({ ...transaction, productCount: e.target.value })
              }
              type="number"
              placeholder="Product count"
            />
          </Form.Group>
          <Button variant="success" onClick={() => createHandler()}>
            Add
          </Button>
        </Form>
      </ModalWindow>
    );
}
