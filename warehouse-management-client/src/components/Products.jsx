import React, { useState, useEffect } from 'react';
import {
  Stack, ListGroup, Button, ButtonGroup,
} from 'react-bootstrap';
import { API_URL_GET_ALL_PRODUCTS } from './constants/API';
import useFetch from './hooks/useFetch';
import LoadSpinner from './UI/LoadSpinner';

export default function Products() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      setProducts(data);
    }
  }, [loading, data]);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error!!!', error);
    return null;
  }
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <ListGroup as="ol" numbered variant="flush">
        {products !== null && products.map((product) => (
          <ListGroup.Item as="li" key={product.id} className="d-flex">
            <Stack className="ms-2 me-auto">
              {`${product.name}`}
            </Stack>
            <Stack>
              {`${product.price}`}
            </Stack>
            <Button
              size="sm"
              variant="outline-success"
              className="mx-1 my-0"
            >
              Update
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
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
