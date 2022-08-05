// @ts-nocheck
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useMemo } from "react";
import { Stack, ListGroup, Button, ButtonGroup, Alert } from "react-bootstrap";
import { API_URL_PRODUCTS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";
import ProductCreate from "./ProductCreate";
import ProductUpdate from "./ProductUpdate";
import ProductsFilter from "../../UI/Filter";
import PaginationUI from "../../UI/PaginationUI";

export default function Products({ startPage, productsPerPage }) {
  const { pagination, data, loading, error, fetchData } = useFetch();
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
    } else getProducts(startPage, productsPerPage);
  }, [data]);

  function getProducts(page, itemPerPage) {
    fetchData(`${API_URL_PRODUCTS}?Page=${page}&ItemsPerPage=${itemPerPage}`);
  }

  function createProductCallback(product) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetchData(API_URL_PRODUCTS, options);
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
    fetchData(API_URL_PRODUCTS, options);
  }

  function deleteProductCallback(productId) {
    const options = {
      method: "DELETE",
    };
    const api = `${API_URL_PRODUCTS}/${productId}`;
    fetchData(api, options);
    getProducts(startPage, productsPerPage);
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
    if (Array.isArray(sortedProducts)) {
      return sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(filterOpt.searchQuery.toLowerCase())
      );
    }
    return sortedProducts;
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
      <ListGroup as="ol" variant="flush">
        {sortedAndSearchedProducts !== null &&
        Array.isArray(sortedAndSearchedProducts) &&
        sortedAndSearchedProducts.length === 0 ? (
          <Stack className="m-auto mt-2">
            <h5>The products table is empty.</h5>
          </Stack>
        ) : Array.isArray(sortedAndSearchedProducts) ? (
          sortedAndSearchedProducts.map((product) => (
            <ListGroup.Item as="li" key={product.id} className="d-flex">
              <Stack className="ms-2">{`${product.id}`}</Stack>
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
        ) : (
          <Alert variant="success" className="m-auto mt-2">
            <Alert.Heading>Completed successfully</Alert.Heading>
            <hr />
            <p>
              Product: <b>{sortedAndSearchedProducts.name}</b>
            </p>
            <p>
              Price: <b>{sortedAndSearchedProducts.price}</b>
            </p>
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => getProducts(startPage, productsPerPage)}
                variant="outline-success"
              >
                Ok
              </Button>
            </div>
          </Alert>
        )}
      </ListGroup>
      <PaginationUI
        startPage={startPage}
        itemsPerPage={productsPerPage}
        pagination={pagination}
        getItems={getProducts}
      />
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => getProducts(1, productsPerPage)}
        >
          Get products
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
