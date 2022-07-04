import React, { useState, useEffect } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../../Urls';
import ProductRow from './ProductRow';
import LoadSpinner from '../LoadSpinner';

export default function ProductTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_PRODUCTS)
      .then((result) => result.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [isLoaded]);

  if (error) {
    return (
      <Stack>
        Ошибка:
        {error.message}
      </Stack>
    );
  }
  if (!isLoaded) return <LoadSpinner />;
  return (
    <Stack>
      <Table striped hover size="sm">
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
            <ProductRow
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setIsLoaded(false)}
        >
          Show products
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setProducts([])}
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
