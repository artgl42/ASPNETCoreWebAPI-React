// @ts-nocheck
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalWindow from "../../UI/ModalWindow";

export default function WarehouseCreate({
  visible,
  setVisible,
  createWarehouseCallback,
}) {
  const [warehouse, setWarehouse] = useState({ name: "", address: "" });
  const [errors, setErrors] = useState({});

  function findFormErrors() {
    const formErrors = {};
    if (warehouse.name === "")
      formErrors.warehouseNameEmpty = "Warehouse name can't be empty";
    if (warehouse.address === "")
      formErrors.warehouseAddressEmpty = "Warehouse address can't be empty";
    return formErrors;
  }
  function createHandler() {
    const formErrors = findFormErrors();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      createWarehouseCallback(warehouse);
      setVisible(false);
    }
  }

  return (
    <ModalWindow
      title="Add warehouse"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-3" controlId="WarehouseName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={warehouse.name}
            isInvalid={!!errors.warehouseNameEmpty}
            onChange={(e) =>
              setWarehouse({ ...warehouse, name: e.target.value })
            }
            type="text"
            placeholder="Name of warehouse"
          />
          <Form.Control.Feedback type="invalid">
            {errors.warehouseNameEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="WarehouseAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={warehouse.address}
            isInvalid={!!errors.warehouseAddressEmpty}
            onChange={(e) =>
              setWarehouse({ ...warehouse, address: e.target.value })
            }
            type="text"
            placeholder="Address of warehouse"
          />
          <Form.Control.Feedback type="invalid">
            {errors.warehouseAddressEmpty}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={() => createHandler()}>
          Add
        </Button>
      </Form>
    </ModalWindow>
  );
}
