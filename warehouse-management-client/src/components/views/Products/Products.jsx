// @ts-nocheck
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useMemo } from "react";
import { Stack, ListGroup, Button, ButtonGroup, Alert } from "react-bootstrap";
import { API_URL_GET_ALL_PRODUCTS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import ProductCreate from "./ProductCreate";
import ProductUpdate from "./ProductUpdate";
import ProductsFilter from "../../UI/Filter";

export default function Products() {
  const { data, loading, error, fetchData } = useFetch(
    API_URL_GET_ALL_PRODUCTS
  );
  const [products, setProducts] = useState([]);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [productForUpdate, setProductForUpdate] = useState(null);
  const [filterOpt, setFilterOpt] = useState({
    selectedSort: "",
    searchQuery: "",
  });

  useEffect(() => {
    if (data !== null) {
      setProducts(data);
    }
  }, [data]);

  function createProductCallback(product) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetchData(API_URL_GET_ALL_PRODUCTS, options);
  }

  function updateHandler(product) {
    setVisibleUpdateForm(true);
    setProductForUpdate(product);
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

  const sortedProducts = useMemo(() => {
    if (filterOpt.selectedSort !== "") {
      switch (filterOpt.selectedSort) {
        case "Name":
          return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case "Price (ascending)":
          return [...products].sort(function (a, b) {
            return a.price - b.price;
          });

        case "Price (descending)":
          return [...products].sort(function (a, b) {
            return b.price - a.price;
          });
        default:
          break;
      }
    }
    return products;
  }, [products, filterOpt.selectedSort]);

  const sortedAndSearchedProducts = useMemo(() => {
    return sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(filterOpt.searchQuery.toLowerCase())
    );
  }, [sortedProducts, filterOpt.searchQuery]);

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <ProductCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createProductCallback={createProductCallback}
      />
      <ProductUpdate
        visible={visibleUpdateForm}
        setVisible={setVisibleUpdateForm}
        productForUpdate={productForUpdate}
        updateProductCallback={updateProductCallback}
      />
      <ProductsFilter
        selectOpt={[
          { value: "Name" },
          { value: "Price (ascending)" },
          { value: "Price (descending)" },
        ]}
        filterOpt={filterOpt}
        setFilterOpt={setFilterOpt}
      />
      <ListGroup as="ol" numbered variant="flush">
        {sortedAndSearchedProducts !== null &&
        sortedAndSearchedProducts.length === 0 ? (
          <Stack className="m-auto mt-2">
            <Alert variant="info">
              <Alert.Heading>Products not found.</Alert.Heading>
            </Alert>
          </Stack>
        ) : (
          sortedAndSearchedProducts.map((product, index) => (
            <ListGroup.Item as="li" key={index} className="d-flex">
              <Stack className="w-100 ms-2">{`${product.name}`}</Stack>
              <Stack className="w-100">{`${product.price}`}</Stack>
              <Button
                size="sm"
                variant="outline-success"
                className="mx-1 my-0"
                onClick={() => updateHandler(product)}
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
          ))
        )}
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
          onClick={() => setVisibleCreateForm(true)}
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
