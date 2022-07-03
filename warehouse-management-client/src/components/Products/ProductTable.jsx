import React, { useState, useEffect } from "react";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";
import Urls from "../../Urls";
import ProductRow from "./ProductRow";
import LoadSpinner from "../LoadSpinner";

export default function ProductTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_PRODUCTS)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded])

  if (error) {
    return <Stack>Ошибка: {error.message}</Stack>;
  } else if (!isLoaded) {
    return <LoadSpinner />
  } else {
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
          <Button variant="outline-primary" size="sm" onClick={() => setIsLoaded(false)}>
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
    )
  };
}
