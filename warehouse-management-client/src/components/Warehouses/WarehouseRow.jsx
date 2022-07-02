import React from 'react';
import { Button } from "react-bootstrap";

export default function WarehouseRow(props) {

  return (
    <tr>
      <td>{props.warehouse.id}</td>
      <td>{props.warehouse.name}</td>
      <td>{props.warehouse.address}</td>
      <td>
        <Button
          className="mx-1 my-0"
          variant="outline-success"
          size="sm"
          onClick={() => console.log("Button Update")}>
          Update
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => console.log("Button Delete")}>
          Delete
        </Button>
      </td>
    </tr>
  )
}
