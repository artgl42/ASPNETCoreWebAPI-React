// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function ProductUpdate({
  visible,
  setVisible,
  productForUpdate,
  updateProductCallback,
}) {
  const [product, setProduct] = useState({ id: "", name: "", price: "" });
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

  function updateHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      updateProductCallback({ ...product, id: productForUpdate.id });
      setVisible(false);
    }
  }

  if (productForUpdate === null) return;
  return (
    <ModalWindow
      title="Update product"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-3" controlId="ProductName">
          <Form.Label>Name: {productForUpdate.name}</Form.Label>
          <Form.Control
            value={product.name}
            isInvalid={!!errors.productNameEmpty}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="New name of product"
          />
          <Form.Control.Feedback type="invalid">
            {errors.productNameEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ProductPrice">
          <Form.Label>Price: {productForUpdate.price}</Form.Label>
          <Form.Control
            value={product.price}
            isInvalid={!!errors.productPriceEmptyOrZero}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            placeholder="New price of product"
          />
          <Form.Control.Feedback type="invalid">
            {errors.productPriceEmptyOrZero}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={() => updateHandler()}>
          Update
        </Button>
      </Form>
    </ModalWindow>
  );
}
