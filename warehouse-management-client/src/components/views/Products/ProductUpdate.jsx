// @ts-nocheck
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ProductUpdate({
  updateForm,
  setUpdateForm,
  updateProductCallback,
}) {
  const [product, setProduct] = useState({ id: "", name: "", price: "" });

  function updateHandler() {
    updateProductCallback({ ...product, id: updateForm.product.id });
    setUpdateForm({ ...updateForm, visible: false });
  }

  if (updateForm.product === null) return;
  return (
    <Modal
      show={updateForm.visible}
      onHide={() => setUpdateForm({ ...updateForm, visible: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="ProductName">
            <Form.Label>
              Name (Id): {updateForm.product.name} ({updateForm.product.id})
            </Form.Label>
            <Form.Control
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              type="text"
              placeholder="New name of product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ProductPrice">
            <Form.Label>Price: {updateForm.product.price}</Form.Label>
            <Form.Control
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              type="number"
              placeholder="New price of product"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setUpdateForm({ ...updateForm, visible: false })}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => updateHandler()}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
