import React, { useState, useEffect } from 'react';
import {
  Stack, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import { API_URL_GET_ALL_WAREHOUSES } from './constants/API';
import useFetch from './hooks/useFetch';
import LoadSpinner from './utils/LoadSpinner';

export default function WarehousesTable() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_WAREHOUSES);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    if (!loading) {
      setWarehouses(data);
    }
  }, [loading, data]);

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
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {warehouses !== null && warehouses.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.name}</td>
              <td>{w.address}</td>
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
