import React, { useState, useEffect } from "react";
import Constants from "../Constants";
import WarehouseProducts from "./WarehouseProducts";
import WarehouseImage from "../warehouse.png";
import { Row, Col, Card, Container, Accordion, Button } from "react-bootstrap";

export default function WarehouseCards() {
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState(null);
  const [warehouse, setwarehouse] = useState("");

  function showProductsForWarehouse(warehouseID, warehouseName) {
    setProducts(null);
    setProducts(<WarehouseProducts id={warehouseID} />);
    setwarehouse(warehouseName);
  }

  useEffect(() => {
    const url = Constants.API_URL_GET_ALL_WAREHOUSES;

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
                <Col>
                  <Card key={warehouse.id}>
                    <Card.Img variant="top" src={WarehouseImage} />
                    <Card.Body>
                      <Card.Title>{warehouse.name}</Card.Title>
                      <Card.Text>{warehouse.address}</Card.Text>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() =>
                          showProductsForWarehouse(warehouse.id, warehouse.name)
                        }
                      >
                        Products...
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
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
              <Col>{products}</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
