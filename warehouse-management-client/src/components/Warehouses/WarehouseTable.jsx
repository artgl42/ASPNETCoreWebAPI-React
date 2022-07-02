import React, { useState } from "react";
import Urls from "../../Urls";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";
import WarehouseRow from "./WarehouseRow";

export default function WarehouseTable() {
  const [warehouses, setWarehouses] = useState([]);
  const url = Urls.API_URL_GET_ALL_WAREHOUSES;

  function getWarehouses() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setWarehouses(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Stack>
      <Table striped bordered hover size="sm">
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
            <WarehouseRow key={warehouse.id} warehouse={{
              id: warehouse.id,
              name: warehouse.name,
              address: warehouse.address
            }} />
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button variant="outline-primary" size="sm" onClick={getWarehouses}>
          Get warehouses from server
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setWarehouses([])}>
          Create product
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setWarehouses([])}>
          Clear
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
