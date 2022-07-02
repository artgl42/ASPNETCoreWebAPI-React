import React, { useState, useEffect } from "react";
import Urls from "../../Urls";
import { Table, Stack, Button, Badge } from "react-bootstrap";

export default function ProductsOfWarehouse(props) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState("");

  function handleChange(e) {
    setDate(e.target.value);
  }

  function ClearProductsTable() {
    setProducts([]);
    setProductsCount("");
  }

  useEffect(() => {
    setProducts([]);
    setProductsCount("");
  }, [props]);

  function getProducts() {
    setProducts([]);
    const formatedDate = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1
      }-${new Date(date).getDate()}`;
    const url = `${Urls.API_URL_GET_ALL_PRODUCTS_ON_DATE}/${formatedDate}/${props.id}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setProducts(response);
        setProductsCount(response.length);
      })
      .catch((error) => {
        console.log(error);
        setProductsCount(0);
      });
  }

  return (
    <Stack className="col-md-12 mx-auto">
      <Stack className="col-md-6 mx-auto">
        <input type="date" value={date} onChange={handleChange} />
        <Button variant="outline-success" size="sm" onClick={getProducts}>
          Show <Badge bg="secondary">{productsCount}</Badge>
        </Button>
        <Button variant="outline-danger" size="sm" onClick={ClearProductsTable}>
          Clear
        </Button>
        <br />
      </Stack>
      {productsCount === 0 && <h2>No products</h2>}
      {productsCount !== 0 && productsCount !== "" && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product.id}>
                <td>{product.product.name}</td>
                <td>{product.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
}
