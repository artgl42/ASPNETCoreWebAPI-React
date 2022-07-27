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

  function updateHandler() {
    updateProductCallback({ ...product, id: productForUpdate.id });
    setVisible(false);
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
          <Form.Label>
            Name (Id): {productForUpdate.name} ({productForUpdate.id})
          </Form.Label>
          <Form.Control
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="New name of product"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ProductPrice">
          <Form.Label>Price: {productForUpdate.price}</Form.Label>
          <Form.Control
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            placeholder="New price of product"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => updateHandler()}>
          Update
        </Button>
      </Form>
    </ModalWindow>
  );
}
