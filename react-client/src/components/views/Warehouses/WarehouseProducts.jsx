/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
// @ts-ignore
import { Stack, ListGroup, Badge } from "react-bootstrap";
import { API_URL_REPORTS } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import ErrorAlert from "../../UI/ErrorAlert";

export default function WarehouseProducts({ id }) {
  const { status, fetchGet } = useFetch();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);

  function getFormatedDate(fdate) {
    return `${new Date(fdate).getFullYear()}-${
      new Date(fdate).getMonth() + 1
    }-${new Date(fdate).getDate()}`;
  }

  useEffect(() => {
    if (status.data !== null) {
      setProducts(status.data);
    } else getProducts();
  }, [status.data]);

  const getProducts = useCallback(() => {
    fetchGet(`${API_URL_REPORTS}/${getFormatedDate(date)}/${id}`);
  }, [fetchGet, date, id]);

  function handleChangeDate(e) {
    setDate(e.target.value);
    fetchGet(`${API_URL_REPORTS}/${getFormatedDate(e.target.value)}/${id}`);
  }

  if (status.error != null)
    return <ErrorAlert message={status.error.message} />;
  if (status.loading) return <LoadSpinner />;
  return (
    <Stack className="my-2">
      <Stack direction="horizontal" gap={1}>
        <Badge bg="dark">
          <h6>
            <input type="date" value={date} onChange={handleChangeDate} />
          </h6>
        </Badge>
        <Badge bg="dark">
          <h6>Warehouse (id): {id}</h6>
        </Badge>
        <Badge bg="dark">
          <h6>
            Products (count): {Array.isArray(products) ? products.length : 0}
          </h6>
        </Badge>
      </Stack>
      <Stack>
        <ListGroup as="ol" numbered variant="flush">
          {Array.isArray(products) &&
            products.map((product) => (
              <ListGroup.Item
                as="li"
                key={product.product.id}
                className="d-flex"
              >
                <Stack className="ms-2 me-auto">
                  {`${product.product.name}`}
                </Stack>
                {`${product.count}`}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Stack>
    </Stack>
  );
}
