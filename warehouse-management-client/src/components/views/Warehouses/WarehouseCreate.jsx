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

  function createHandler() {
    createWarehouseCallback(warehouse);
    setVisible(false);
  }

  return (
    <ModalWindow
      title="Create warehouse"
      visible={visible}
      setVisible={setVisible}
    >
      <Form>
        <Form.Group className="mb-3" controlId="WarehouseName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={warehouse.name}
            onChange={(e) =>
              setWarehouse({ ...warehouse, name: e.target.value })
            }
            type="text"
            placeholder="Name of warehouse"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="WarehouseAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={warehouse.address}
            onChange={(e) =>
              setWarehouse({ ...warehouse, address: e.target.value })
            }
            type="text"
            placeholder="Address of warehouse"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => createHandler()}>
          Add
        </Button>
      </Form>
    </ModalWindow>
  );
}
