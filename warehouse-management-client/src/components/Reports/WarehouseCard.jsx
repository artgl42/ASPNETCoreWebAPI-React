import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import WarehouseImage from '../imgs/warehouse.png';

export default function WarehouseCard({
  id, name, address,
}) {
  return (
    <Card>
      <Card.Img variant="top" src={WarehouseImage} />
      <Card.Body>
        <Card.Title>{id}</Card.Title>
        <Card.Text>{`${name} : ${address}`}</Card.Text>
        <Button
          variant="outline-success"
          size="sm"
        >
          Products...
        </Button>
      </Card.Body>
    </Card>
  );
}
WarehouseCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};
