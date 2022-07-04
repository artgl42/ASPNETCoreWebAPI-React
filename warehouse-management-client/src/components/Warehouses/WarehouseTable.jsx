import React, { useState, useEffect } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import Urls from '../../Urls';
import WarehouseRow from './WarehouseRow';
import LoadSpinner from '../LoadSpinner';

export default function WarehouseTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_WAREHOUSES)
      .then((result) => result.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWarehouses(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [isLoaded]);

  if (error) {
    return (
      <Stack>
        Ошибка:
        {error.message}
      </Stack>
    );
  }
  if (!isLoaded) return <LoadSpinner />;
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
          {warehouses.map((warehouse) => (
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
          onClick={() => setIsLoaded(false)}
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
