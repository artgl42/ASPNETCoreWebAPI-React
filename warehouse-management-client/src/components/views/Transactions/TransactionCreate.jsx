// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";
import { API_URL_WAREHOUSES, API_URL_PRODUCTS } from "../../constants/API";

export default function TransactionCreate({
  visible,
  setVisible,
  createTransactionCallback,
}) {
  const initTransaction = {
    dateTime: new Date().toISOString().slice(0, 10),
    warehouseFromId: 0,
    warehouseInId: 0,
    productId: 0,
    count: 0,
  };
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState(initTransaction);
  const [errors, setErrors] = useState({});

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
        return error;
      });
  }

  useEffect(() => {
    fetchData(API_URL_WAREHOUSES, setWarehouses);
    fetchData(API_URL_PRODUCTS, setProducts);
  }, []);

  function findFormErrors() {
    const formErrors = {};
    if (transaction.warehouseFromId === 0)
      formErrors.warehouseIdFromEmpty = "WarehouseFrom can't be empty";
    if (transaction.warehouseInId === 0)
      formErrors.warehouseIdInEmpty = "WarehouseIn can't be empty";
    if (transaction.warehouseFromId === transaction.warehouseInId)
      formErrors.warehousesEqual = "Warehouses can't be equal";
    if (transaction.productId === 0)
      formErrors.productIdEmpty = "Product can't be empty";
    if (transaction.count <= 0)
      formErrors.productCountEmptyOrZero =
        "Product count can't be empty or zero";
    return formErrors;
  }

  function createHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setVisible(false);
      setTransaction(initTransaction);
      createTransactionCallback(transaction);
    }
  }

  function handleClickFrom(warehouseId) {
    setTransaction({ ...transaction, warehouseFromId: warehouseId });
  }

  function handleClickIn(warehouseId) {
    setTransaction({ ...transaction, warehouseInId: warehouseId });
  }

  function handleClickProduct(productId) {
    setTransaction({ ...transaction, productId: productId });
  }

  return (
    <ModalWindow
      title="Create transaction"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-4">
          <FloatingLabel label="Transaction date" className="mb-3">
            <Form.Control
              size="sm"
              value={transaction.dateTime}
              onChange={(e) =>
                setTransaction({ ...transaction, dateTime: e.target.value })
              }
              type="date"
              placeholder="Transaction date"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-2">
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="From warehouse" className="mb-3">
                <Form.Control
                  as="select"
                  size="sm"
                  isInvalid={!!errors.warehouseIdFromEmpty}
                  onChange={(e) => handleClickFrom(e.target.value)}
                  required
                >
                  <option></option>
                  {warehouses !== null &&
                    warehouses.map((warehouse, index) => (
                      <option key={index} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.warehouseIdFromEmpty}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="To warehouse" className="mb-3">
                <Form.Control
                  as="select"
                  size="sm"
                  isInvalid={
                    !!errors.warehouseIdInEmpty || !!errors.warehousesEqual
                  }
                  onChange={(e) => handleClickIn(e.target.value)}
                  required
                >
                  <option></option>
                  {warehouses !== null &&
                    warehouses.map((warehouse, index) => (
                      <option key={index} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.warehouseIdInEmpty}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.warehousesEqual}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-4">
          <FloatingLabel label="Product" className="mb-3">
            <Form.Control
              as="select"
              size="sm"
              isInvalid={!!errors.productIdEmpty}
              onChange={(e) => handleClickProduct(e.target.value)}
            >
              <option></option>
              {products !== null &&
                products.map((product, index) => (
                  <option key={index} value={product.id}>
                    {product.name}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.productIdEmpty}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Count" className="mb-3">
            <Form.Control
              size="sm"
              isInvalid={!!errors.productCountEmptyOrZero}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  count: e.target.value,
                })
              }
              type="number"
              placeholder="Product count"
            />
            <Form.Control.Feedback type="invalid">
              {errors.productCountEmptyOrZero}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Button onClick={() => createHandler()}>Create</Button>
      </Form>
    </ModalWindow>
  );
}
