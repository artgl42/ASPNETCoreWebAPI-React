import React from 'react';
import { Button } from "react-bootstrap";

export default function TransactionRow(props) {

  return (
    <tr>
      <td>{props.transaction.id}</td>
      <td>{props.transaction.date}</td>
      <td>{props.transaction.from}</td>
      <td>{props.transaction.in}</td>
      <td>{props.transaction.product}</td>
      <td>{props.transaction.count}</td>
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
