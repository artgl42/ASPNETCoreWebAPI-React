/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
// @ts-ignore
import { Stack, Row, Col, Card, Button } from "react-bootstrap";
import { API_URL_WAREHOUSES } from "../../constants/API";
import useFetch from "../../hooks/useFetch";
import LoadSpinner from "../../UI/LoadSpinner";
import WarehouseImage from "../../imgs/warehouse.png";
import WarehouseDebitImage from "../../imgs/debit_of_warehouses.png";
import WarehouseCreditImage from "../../imgs/credit_of_warehouses.png";
import ErrorAlert from "../../UI/ErrorAlert";
import WarehouseCreate from "./WarehouseCreate";
import WarehouseUpdate from "./WarehouseUpdate";
import WarehouseProducts from "./WarehouseProducts";

export default function Warehouses({ setView }) {
  const { status, fetchGet, fetchCreate, fetchUpdate, fetchDelete } =
    useFetch();
  const [warehouses, setWarehouses] = useState([]);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [warehouseForUpdate, setWarehouseForUpdate] = useState(null);

  useEffect(() => {
    if (status.data !== null) {
      setWarehouses(status.data);
    } else getWarehouses();
  }, [status.data]);

  const getWarehouses = useCallback(() => {
    fetchGet(API_URL_WAREHOUSES);
  }, [fetchGet]);

  const createWarehouses = useCallback(
    (warehouse) => {
      fetchCreate(API_URL_WAREHOUSES, warehouse);
    },
    [fetchCreate]
  );

  const updateWarehouses = useCallback(
    (warehouse) => {
      fetchUpdate(API_URL_WAREHOUSES, warehouse);
    },
    [fetchUpdate]
  );

  const deleteWarehouses = useCallback(
    (id) => {
      fetchDelete(API_URL_WAREHOUSES, id);
    },
    [fetchDelete]
  );

  function updateHandler(warehouse) {
    setVisibleUpdateForm(true);
    setWarehouseForUpdate(warehouse);
  }

  if (status.error != null)
    return <ErrorAlert message={status.error.message} />;
  if (status.loading) return <LoadSpinner />;
  return (
    <>
      <WarehouseCreate
        visible={visibleCreateForm}
        setVisible={setVisibleCreateForm}
        createWarehouses={createWarehouses}
      />
      <WarehouseUpdate
        visible={visibleUpdateForm}
        setVisible={setVisibleUpdateForm}
        warehouseForUpdate={warehouseForUpdate}
        updateWarehouses={updateWarehouses}
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
                        setView(<WarehouseProducts id={warehouse.id} />)
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
                      onClick={() => deleteWarehouses(warehouse.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Stack>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setVisibleCreateForm(true)}
        >
          Add warehouse
        </Button>
      </Stack>
    </>
  );
}
