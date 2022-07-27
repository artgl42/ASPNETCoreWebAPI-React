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

  function updateHandler() {
    updateWarehouseCallback({
      ...warehouse,
      id: warehouseForUpdate.id,
    });
    setVisible(false);
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
          <Form.Label>
            Name (Id): {warehouseForUpdate.name} ({warehouseForUpdate.id})
          </Form.Label>
          <Form.Control
            value={warehouse.name}
            onChange={(e) =>
              setWarehouse({ ...warehouse, name: e.target.value })
            }
            type="text"
            placeholder="New name of warehouse"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="WarehouseAddress">
          <Form.Label>Address: {warehouseForUpdate.address}</Form.Label>
          <Form.Control
            value={warehouse.address}
            onChange={(e) =>
              setWarehouse({ ...warehouse, address: e.target.value })
            }
            type="text"
            placeholder="New address of warehouse"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => updateHandler()}>
          Update
        </Button>
      </Form>
    </ModalWindow>
  );
}
