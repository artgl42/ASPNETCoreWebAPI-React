// @ts-nocheck
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Stack, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { API_URL_GET_ALL_PRODUCTS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import ProductCreate from "./ProductCreate";
import ProductUpdate from "./ProductUpdate";

export default function Products() {
  const { data, loading, error, fetchData } = useFetch(
    API_URL_GET_ALL_PRODUCTS
  );
  const [products, setProducts] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    visible: false,
    product: null,
  });

  useEffect(() => {
    if (!loading) {
      setProducts(data);
    }
  }, [loading, data]);

  function createProductCallback(product) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetchData(API_URL_GET_ALL_PRODUCTS, options);
    setProducts([...products, product]);
  }

  function updateProductCallback(product) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetchData(API_URL_GET_ALL_PRODUCTS, options);
  }

  function deleteProductCallback(productId) {
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
      <ProductCreate
        createForm={createForm}
        setCreateForm={setCreateForm}
        createProductCallback={createProductCallback}
      />
      <ProductUpdate
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        updateProductCallback={updateProductCallback}
      />
      <ListGroup as="ol" numbered variant="flush">
        {products !== null &&
          products.map((product, index) => (
            <ListGroup.Item as="li" key={index} className="d-flex">
              <Stack className="ms-2 me-auto">{`${product.name}`}</Stack>
              <Stack>{`${product.price}`}</Stack>
              <Button
                size="sm"
                variant="outline-success"
                className="mx-1 my-0"
                onClick={() =>
                  setUpdateForm({ visible: true, product: product })
                }
              >
                Update
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteProductCallback(product.id)}
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
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setCreateForm(true)}
        >
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
