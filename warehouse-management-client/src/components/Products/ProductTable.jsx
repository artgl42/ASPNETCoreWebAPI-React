import React, { useState } from "react";
import Urls from "../../Urls";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";
import ProductRow from "./ProductRow";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const url = Urls.API_URL_GET_ALL_PRODUCTS;

  function getProducts() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Stack>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={{
              id: product.id,
              name: product.name,
              price: product.price
            }} />
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button variant="outline-primary" size="sm" onClick={getProducts}>
          Get products from server
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setProducts([])}>
          Create product
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setProducts([])}>
          Clear
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
