import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack, ListGroup, Badge, Breadcrumb,
} from 'react-bootstrap';
import { API_URL_GET_ALL_PRODUCTS_ON_DATE } from '../constants/API';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../UI/LoadSpinner';
import ErrorAlert from '../UI/ErrorAlert';

export default function WarehouseProducts({ id }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);

  function getFormatedDate(fdate) {
    return `${new Date(fdate).getFullYear()}-${new Date(fdate).getMonth() + 1}-${new Date(fdate).getDate()}`;
  }

  const {
    data, loading, error, fetchData,
  } = useFetch(`${API_URL_GET_ALL_PRODUCTS_ON_DATE}/${getFormatedDate(date)}/${id}`);

  useEffect(() => {
    if (!loading) {
      setProducts(data);
    }
  }, [loading, data]);

  function handleChangeDate(e) {
    setDate(e.target.value);
    fetchData(`${API_URL_GET_ALL_PRODUCTS_ON_DATE}/${getFormatedDate(e.target.value)}/${id}`);
  }

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack className="my-2">
      <Breadcrumb>
        <Breadcrumb.Item active>
          <Badge bg="dark">
            <input type="date" value={date} onChange={handleChangeDate} />
          </Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Badge bg="dark">
            Warehouse (id):
            {' '}
            <Badge pill bg="info">{id}</Badge>
          </Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Badge bg="dark">
            Products (count):
            {' '}
            <Badge pill bg="info">{Array.isArray(products) ? products.length : 0}</Badge>
          </Badge>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Stack>
        <ListGroup as="ol" numbered variant="flush">
          {Array.isArray(products) && products.map((product) => (
            <ListGroup.Item as="li" key={product.product.id} className="d-flex">
              <Stack className="ms-2 me-auto">
                {`${product.product.name}`}
              </Stack>
              <Badge bg="primary">
                {`${product.count}`}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Stack>
    </Stack>
  );
}
WarehouseProducts.propTypes = {
  id: PropTypes.number.isRequired,
};
