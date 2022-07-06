/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  Table, Stack, Row, Col,
} from 'react-bootstrap';
import { API_URL_GET_ALL_PRODUCTS_ON_DATE } from '../utils/API';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../utils/LoadSpinner';

export default function BalanceProducts({ id }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);

  function getFormatedDate(fdate) {
    return `${new Date(fdate).getFullYear()}-${new Date(fdate).getMonth() + 1}-${new Date(fdate).getDate()}`;
  }

  const {
    data, loading, fetchData,
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

  if (loading) return <LoadSpinner />;
  return (
    <Stack className="col-md-12 mx-auto mt-2">
      <Row className="justify-content-md-center my-2">
        <Col className="col-md-2">
          <input type="date" value={date} onChange={handleChangeDate} />
        </Col>
        <Col className="col-md-4">
          <h4>{`Warehouse (id): ${id}`}</h4>
          <h4>{`Date (selected): ${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`}</h4>
          <h4>{`Products (count): ${Array.isArray(products) ? products.length : 0}`}</h4>
        </Col>
      </Row>
      {Array.isArray(products) && (
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product.id}>
                <td>{product.product.name}</td>
                <td>{product.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
}
