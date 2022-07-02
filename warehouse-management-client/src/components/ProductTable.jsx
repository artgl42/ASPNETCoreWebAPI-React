import React, { useState } from "react";
import Constants from "../Constants";
import { Stack, Table, Button, ButtonGroup } from "react-bootstrap";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const url = Constants.API_URL_GET_ALL_PRODUCTS;

  function getProducts() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setProducts(response);
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
            <th scope="col">Price</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  className="mx-1 my-0"
                  variant="outline-success"
                  size="sm"
                  onClick={() => console.log("Button Update")}
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => console.log("Button Delete")}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup vertical>
        <Button variant="outline-primary" size="sm" onClick={getProducts}>
          Get products from server
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => setProducts([])}
        >
          Create product
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setProducts([])}
        >
          Clear
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
