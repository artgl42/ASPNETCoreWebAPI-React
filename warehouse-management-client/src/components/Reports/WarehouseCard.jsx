import React from "react";
import WarehouseImage from "./warehouse.png";
import { Button, Card } from "react-bootstrap";

export default function WarehouseCard(props) {

  function handleClick() {
    props.func(props.warehouse.id, props.warehouse.name);
  }

  return (
    <Card>
      <Card.Img variant="top" src={WarehouseImage} />
      <Card.Body>
        <Card.Title>{props.warehouse.name}</Card.Title>
        <Card.Text>{props.warehouse.address}</Card.Text>
        <Button
          variant="outline-success"
          size="sm"
          onClick={handleClick}>
          Products...
        </Button>
      </Card.Body>
    </Card>
  );
}
