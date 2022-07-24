// @ts-nocheck
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ProductForm({ show, setShow, createProduct }) {
  const [product, setProduct] = useState({ name: "", price: "" });
  const handleClose = () => setShow(false);

  function createNewProduct() {
    createProduct(product);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              type="number"
              placeholder="Price of product"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => createNewProduct()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
