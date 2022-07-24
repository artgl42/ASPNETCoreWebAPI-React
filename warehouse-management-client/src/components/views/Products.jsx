// @ts-nocheck
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Stack, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { API_URL_GET_ALL_PRODUCTS } from "../constants/API";
import useFetch from "../hooks/useFetch";
import LoadSpinner from "../UI/LoadSpinner";
import ErrorAlert from "../UI/ErrorAlert";
import ProductForm from "./ProductForm";

export default function Products() {
  const { data, loading, error, fetchData } = useFetch(
    API_URL_GET_ALL_PRODUCTS
  );
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!loading) {
      setProducts(data);
    }
  }, [loading, data]);

  function createProduct(newProduct) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    };
    fetchData(API_URL_GET_ALL_PRODUCTS, options);
    setProducts([...products, newProduct]);
  }

  function deleteProduct(productId) {
    const options = {
      method: "DELETE",
    };
    const api = `${API_URL_GET_ALL_PRODUCTS}/${productId}`;
    fetchData(api, options);
  }

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <ProductForm
        show={show}
        setShow={setShow}
        createProduct={createProduct}
      />
      <ListGroup as="ol" numbered variant="flush">
        {products !== null &&
          products.map((product, index) => (
            <ListGroup.Item as="li" key={index} className="d-flex">
              <Stack className="ms-2 me-auto">{`${product.name}`}</Stack>
              <Stack>{`${product.price}`}</Stack>
              <Button size="sm" variant="outline-success" className="mx-1 my-0">
                Update
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setProducts(data)}
        >
          Show products
        </Button>
        <Button variant="outline-success" size="sm" onClick={handleShow}>
          Add product
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setProducts([])}
        >
          Clear table
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
