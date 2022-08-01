import React, { useState, useEffect } from "react";
// @ts-ignore
import { Stack, ListGroup, Badge } from "react-bootstrap";
import { API_URL_GET_ALL_PRODUCTS_ON_DATE } from "../constants/API";
import useFetch from "../hooks/useFetch";
import LoadSpinner from "../UI/LoadSpinner";
import ErrorAlert from "../UI/ErrorAlert";

export default function WarehouseProducts({ id }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);

  function getFormatedDate(fdate) {
    return `${new Date(fdate).getFullYear()}-${
      new Date(fdate).getMonth() + 1
    }-${new Date(fdate).getDate()}`;
  }

  const { data, loading, error, fetchData } = useFetch(
    `${API_URL_GET_ALL_PRODUCTS_ON_DATE}/${getFormatedDate(date)}/${id}`
  );

  useEffect(() => {
    if (data !== null) {
      setProducts(data);
    }
  }, [data]);

  function handleChangeDate(e) {
    setDate(e.target.value);
    fetchData(
      `${API_URL_GET_ALL_PRODUCTS_ON_DATE}/${getFormatedDate(
        e.target.value
      )}/${id}`
    );
  }

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
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
