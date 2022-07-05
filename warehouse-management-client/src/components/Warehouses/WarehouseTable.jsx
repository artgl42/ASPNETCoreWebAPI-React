import React, { useState } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../util/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../util/LoadSpinner';
import WarehouseRow from './WarehouseRow';

export default function WarehouseTable() {
  const { data, loading, error } = useFetch(Urls.API_URL_GET_ALL_WAREHOUSES);
  const [warehouses, setWarehouses] = useState([]);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error!!!', error);
    return null;
  }
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {warehouses !== null && warehouses.map((warehouse) => (
            <WarehouseRow
              key={warehouse.id}
              id={warehouse.id}
              name={warehouse.name}
              address={warehouse.address}
            />
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setWarehouses(data)}
        >
          Show warehouses
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setWarehouses([])}
        >
          Add warehouse
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setWarehouses([])}
        >
          Clear table
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
