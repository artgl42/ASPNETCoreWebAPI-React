import React, { useState, useEffect } from "react";
import Constants from "../Constants";
import { Row, Col, Card } from "react-bootstrap";
import image from "../warehouse.png";
import WarehouseProducts from "./WarehouseProducts";

export default function WarehouseCards() {
  const [content, setContent] = useState(null);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const url = Constants.API_URL_GET_ALL_WAREHOUSES;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setWarehouses(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {content === null &&
    <Row xs={1} md={4} className="g-2">
      {warehouses.map((warehouse) => (
        <Col>
          <Card key={warehouse.id}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{warehouse.name}</Card.Title>
              <Card.Text>{warehouse.address}</Card.Text>
              <button
                onClick={() => setContent(<WarehouseProducts value={warehouse.id} />)}
                className="btn btn-outline-success btn-sm mx-1 my-1"
              >
                Products
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>}
    {content}
    </div>
  );
}
