// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function ProductCreate({
  visible,
  setVisible,
  createProductCallback,
}) {
  const [product, setProduct] = useState({ name: "", price: 0 });
  const [errors, setErrors] = useState({});

  function findFormErrors() {
    const formErrors = {};
    if (product.name === "")
      formErrors.productNameEmpty = "Product name can't be empty";
    if (product.price === "" || product.price <= 0)
      formErrors.productPriceEmptyOrZero =
        "Product count can't be empty or zero";
    return formErrors;
  }

  function createHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      createProductCallback(product);
      setVisible(false);
    }
  }

  return (
    <ModalWindow title="Add product" visible={visible} setVisible={setVisible}>
      <Form>
        <Form.Group className="mb-3" controlId="ProductName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={product.name}
            isInvalid={!!errors.productNameEmpty}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="Name of product"
          />
          <Form.Control.Feedback type="invalid">
            {errors.productNameEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={product.price}
            isInvalid={!!errors.productPriceEmptyOrZero}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            placeholder="Price of product"
          />
          <Form.Control.Feedback type="invalid">
            {errors.productPriceEmptyOrZero}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={() => createHandler()}>
          Add
        </Button>
      </Form>
    </ModalWindow>
  );
}
