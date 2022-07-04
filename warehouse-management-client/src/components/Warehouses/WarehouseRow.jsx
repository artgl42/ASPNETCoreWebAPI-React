import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function WarehouseRow({ id, name, address }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{address}</td>
      <td>
        <Button
          className="mx-1 my-0"
          variant="outline-success"
          size="sm"
        >
          Update
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
WarehouseRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};
