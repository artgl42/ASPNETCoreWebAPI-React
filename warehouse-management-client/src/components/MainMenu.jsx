import React, { useState } from "react";
import ProductTable from "./ProductTable";
import WarehouseTable from "./WarehouseTable";
import TransactionTable from "./TransactionTable";
import WarehouseCards from "./WarehouseCards";
import { Container, Row, Col, Nav, NavDropdown, Alert } from "react-bootstrap";

export default function MainMenu() {
  const [content, setContent] = useState(null);
  const [help, setHelp] = useState(true);

  return (
    <Container>
      <Nav justify variant="tabs">
        <Nav.Item>
          <Nav.Link
            eventKey="ProductTable"
            onClick={() => setContent(<ProductTable />)}
          >
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="WarehouseTable"
            onClick={() => setContent(<WarehouseTable />)}
          >
            Warehouses
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="TransactionTable"
            onClick={() => setContent(<TransactionTable />)}
          >
            Transactions
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Reports" id="nav-dropdown">
          <NavDropdown.Item
            eventKey="WarehouseCards"
            onClick={() => setContent(<WarehouseCards />)}
          >
            Warehouse (products)
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="NameReport-2" disabled>
            Report 2
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="NameReport-3" disabled>
            Report 3
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="Help" onClick={() => setHelp(true)}>
            ?
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        <Col>
          {content}
          {help && (
            <Alert variant="success" onClose={() => setHelp(false)} dismissible>
              <Alert.Heading>Help</Alert.Heading>
              <p>API 1 - ...</p>
              <hr />
              <p>API 2 - ...</p>
              <hr />
              <p>API 3 - ...</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
