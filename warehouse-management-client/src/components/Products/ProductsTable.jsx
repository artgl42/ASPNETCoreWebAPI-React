import React, { useState } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../util/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../util/LoadSpinner';
import ProductRow from './ProductRow';

export default function ProductsTable() {
  const { data, loading, error } = useFetch(Urls.API_URL_GET_ALL_PRODUCTS);
  const [products, setProducts] = useState([]);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error!!!', error);
    return null;
  }
  if (loading) return <LoadSpinner />;
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
          {products !== null && products.map((product) => (
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
          onClick={() => setProducts(data)}
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
