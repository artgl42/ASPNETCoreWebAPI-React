// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function ProductCreate({
  visible,
  setVisible,
  createProductCallback,
}) {
  const [product, setProduct] = useState({ name: "", price: "" });

  function createHandler() {
    createProductCallback(product);
    setVisible(false);
  }

  return (
    <ModalWindow
      title="Create warehouse"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-3" controlId="ProductName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="Name of product"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            placeholder="Price of product"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => createHandler()}>
          Add
        </Button>
      </Form>
    </ModalWindow>
  );
}
