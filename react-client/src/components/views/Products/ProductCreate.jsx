// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function ProductCreate({ visible, setVisible, createProduct }) {
  const [product, setProduct] = useState({ name: "", price: 0 });
  const [formErrors, setFormErrors] = useState({});

  function findFormErrors() {
    const errors = {};
    if (product.name === "")
      errors.productNameEmpty = "Product name can't be empty";
    if (product.price === "" || product.price <= 0)
      errors.productPriceEmptyOrZero = "Product price can't be empty or zero";
    return errors;
  }

  function createHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setFormErrors(formErrors);
    } else {
      createProduct(product);
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
            isInvalid={!!formErrors.productNameEmpty}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="Name of product"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.productNameEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={product.price}
            isInvalid={!!formErrors.productPriceEmptyOrZero}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            placeholder="Price of product"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.productPriceEmptyOrZero}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={() => createHandler()}>
          Add
        </Button>
      </Form>
    </ModalWindow>
  );
}
