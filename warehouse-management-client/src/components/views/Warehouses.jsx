import React, { useState, useEffect } from "react";
// @ts-ignore
import { Stack, Row, Col, Card, Button } from "react-bootstrap";
import { useReducerContext } from "../hooks/useReducerContext";
import { API_URL_GET_ALL_WAREHOUSES } from "../constants/API";
import useFetch from "../hooks/useFetch";
import LoadSpinner from "../UI/LoadSpinner";
import WarehouseImage from "../imgs/warehouse.png";
import ErrorAlert from "../UI/ErrorAlert";

export default function Warehouses() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_WAREHOUSES);
  const [warehouses, setWarehouses] = useState([]);
  const { dispatch } = useReducerContext();

  useEffect(() => {
    if (!loading) {
      setWarehouses(data);
    }
  }, [loading, data]);

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <Row className="ms-1 my-0 me-0 p-0">
        {warehouses !== null &&
          warehouses.map((w) => (
            <Col key={w.id} className="ms-0 my-1 me-1 p-0">
              <Card>
                <Card.Img variant="top" src={WarehouseImage} />
                <Card.Body>
                  <Card.Title>{w.name}</Card.Title>
                  <Card.Text>{w.address}</Card.Text>
                  <Stack gap={1}>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() =>
                        dispatch({ type: "BalanceProducts", id: w.id })
                      }
                    >
                      Show products
                    </Button>
                    <Button size="sm" variant="outline-success">
                      Update
                    </Button>
                    <Button size="sm" variant="outline-danger">
                      Delete
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Stack>
  );
}
