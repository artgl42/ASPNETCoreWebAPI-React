import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function TransactionRow({
  id, date, warehouseFrom, warehouseIn, product, count,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{warehouseFrom}</td>
      <td>{warehouseIn}</td>
      <td>{product}</td>
      <td>{count}</td>
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
TransactionRow.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  warehouseFrom: PropTypes.string.isRequired,
  warehouseIn: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
