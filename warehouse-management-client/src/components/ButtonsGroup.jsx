import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { useReducerContext } from './hooks/useReducerContext';

export default function ButtonsGroup({ warehouseId }) {
  const { dispatch } = useReducerContext();

  return (
    <ListGroup variant="flush">
      <ListGroup.Item
        action
        onClick={() => dispatch({ type: 'BalanceProducts', id: warehouseId })}
      >
        Show products
      </ListGroup.Item>
      <ListGroup.Item
        action
      >
        Update
      </ListGroup.Item>
      <ListGroup.Item
        action
      >
        Delete
      </ListGroup.Item>
    </ListGroup>
  );
}
ButtonsGroup.propTypes = {
  warehouseId: PropTypes.number.isRequired,
};
