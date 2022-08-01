import React, { useState, useEffect } from "react";
// @ts-ignore
import { Stack, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { useReducerContext } from "../../hooks/useReducerContext";
import { API_URL_GET_ALL_WAREHOUSES } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import WarehouseImage from "../../imgs/warehouse.png";
import WarehouseDebitImage from "../../imgs/debit_of_warehouses.png";
import WarehouseCreditImage from "../../imgs/credit_of_warehouses.png";
import ErrorAlert from "../../UI/ErrorAlert";
import WarehouseCreate from "./WarehouseCreate";
import WarehouseUpdate from "./WarehouseUpdate";

export default function Warehouses() {
  const { data, loading, error, fetchData } = useFetch(
    API_URL_GET_ALL_WAREHOUSES
  );
  const [warehouses, setWarehouses] = useState([]);
  const { dispatch } = useReducerContext();
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [warehouseForUpdate, setWarehouseForUpdate] = useState(null);

  useEffect(() => {
    if (data !== null) {
      setWarehouses(data);
    }
  }, [data]);

  function createWarehouseCallback(warehouse) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouse),
    };
    fetchData(API_URL_GET_ALL_WAREHOUSES, options);
  }

  function updateHandler(warehouse) {
    setVisibleUpdateForm(true);
    setWarehouseForUpdate(warehouse);
  }

  function updateWarehouseCallback(warehouse) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouse),
    };
    fetchData(API_URL_GET_ALL_WAREHOUSES, options);
  }

  function deleteWarehouseCallback(warehouseId) {
    const options = {
      method: "DELETE",
    };
    const api = `${API_URL_GET_ALL_WAREHOUSES}/${warehouseId}`;
    fetchData(api, options);
  }

  if (error != null) return <ErrorAlert message={error.message} />;
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <WarehouseCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createWarehouseCallback={createWarehouseCallback}
      />
      <WarehouseUpdate
        visible={visibleUpdateForm}
        setVisible={setVisibleUpdateForm}
        warehouseForUpdate={warehouseForUpdate}
        updateWarehouseCallback={updateWarehouseCallback}
      />
      <Row className="ms-1 my-0 me-0 p-0">
        {warehouses !== null &&
          warehouses.map((warehouse, index) => (
            <Col key={index} className="ms-0 my-1 me-1 p-0">
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    index === 0
                      ? WarehouseDebitImage
                      : index === 1
                      ? WarehouseCreditImage
                      : WarehouseImage
                  }
                />
                <Card.Body>
                  <Card.Title>{warehouse.name}</Card.Title>
                  <Card.Text>{warehouse.address}</Card.Text>
                  <Stack gap={1}>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() =>
                        dispatch({ type: "BalanceProducts", id: warehouse.id })
                      }
                    >
                      Show products
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => updateHandler(warehouse)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteWarehouseCallback(warehouse.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <ButtonGroup vertical>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setVisibleCreateForm(true)}
        >
          Add warehouse
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
