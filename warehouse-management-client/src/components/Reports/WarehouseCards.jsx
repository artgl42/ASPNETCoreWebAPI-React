import React, { useState, useEffect } from "react";
import Urls from "../../Urls";
import ProductsOfWarehouse from "./ProductsOfWarehouse";
import WarehouseCard from "./WarehouseCard";
import { Row, Container, Accordion } from "react-bootstrap";

export default function WarehouseCards() {
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState(null);
  const [warehouse, setwarehouse] = useState("");

  function showProductsForWarehouse(warehouseID, warehouseName) {
    setProducts(null);
    setProducts(<ProductsOfWarehouse id={warehouseID} />);
    setwarehouse(warehouseName);
  }

  useEffect(() => {
    const url = Urls.API_URL_GET_ALL_WAREHOUSES;

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
  }, []);

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Warehouses</Accordion.Header>
          <Accordion.Body>
            <Row md={4} className="g-1">
              {warehouses.map((warehouse) => (
                <WarehouseCard key={warehouse.id} func={showProductsForWarehouse} warehouse={{
                  id: warehouse.id,
                  name: warehouse.name,
                  address: warehouse.address
                }} />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {warehouse === "" ? "Select warehouse..." : warehouse}
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {products}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
