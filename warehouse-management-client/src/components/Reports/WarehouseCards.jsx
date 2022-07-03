import React, { useState, useEffect } from "react";
import { Stack, Row, Accordion } from "react-bootstrap";
import Urls from "../../Urls";
import ProductsOfWarehouse from "./ProductsOfWarehouse";
import WarehouseCard from "./WarehouseCard";
import LoadSpinner from "../LoadSpinner";

export default function WarehouseCards() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState(null);
  const [warehouse, setwarehouse] = useState("");

  function showProductsForWarehouse(warehouseID, warehouseName) {
    setProducts(null);
    setProducts(<ProductsOfWarehouse id={warehouseID} />);
    setwarehouse(warehouseName);
  }

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_WAREHOUSES)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWarehouses(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <Stack>Ошибка: {error.message}</Stack>;
  } else if (!isLoaded) {
    return <LoadSpinner />;
  } else {
    return (
      <Stack>
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
      </Stack>
    )
  };
}
