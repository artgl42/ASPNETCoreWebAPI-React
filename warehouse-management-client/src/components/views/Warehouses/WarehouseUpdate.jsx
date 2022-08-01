// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function WarehouseUpdate({
  visible,
  setVisible,
  warehouseForUpdate,
  updateWarehouseCallback,
}) {
  const [warehouse, setWarehouse] = useState({ id: "", name: "", address: "" });
  const [errors, setErrors] = useState({});

  function findFormErrors() {
    const formErrors = {};
    if (warehouse.name === "")
      formErrors.warehouseNameEmpty = "Warehouse name can't be empty";
    if (warehouse.address === "")
      formErrors.warehouseAddressEmpty = "Warehouse address can't be empty";
    return formErrors;
  }
  function updateHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      updateWarehouseCallback({
        ...warehouse,
        id: warehouseForUpdate.id,
      });
      setVisible(false);
    }
  }

  if (warehouseForUpdate === null) return;
  return (
    <ModalWindow
      title="Update warehouse"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-3" controlId="WarehouseName">
          <Form.Label>Name: {warehouseForUpdate.name}</Form.Label>
          <Form.Control
            value={warehouse.name}
            isInvalid={!!errors.warehouseNameEmpty}
            onChange={(e) =>
              setWarehouse({ ...warehouse, name: e.target.value })
            }
            type="text"
            placeholder="New name of warehouse"
          />
          <Form.Control.Feedback type="invalid">
            {errors.warehouseNameEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="WarehouseAddress">
          <Form.Label>Address: {warehouseForUpdate.address}</Form.Label>
          <Form.Control
            value={warehouse.address}
            isInvalid={!!errors.warehouseAddressEmpty}
            onChange={(e) =>
              setWarehouse({ ...warehouse, address: e.target.value })
            }
            type="text"
            placeholder="New address of warehouse"
          />
          <Form.Control.Feedback type="invalid">
            {errors.warehouseAddressEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={() => updateHandler()}>
          Update
        </Button>
      </Form>
    </ModalWindow>
  );
}
