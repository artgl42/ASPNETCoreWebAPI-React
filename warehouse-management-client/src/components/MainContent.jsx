import React, { useState } from "react";
import ProductTable from "./ProductTable";
import WarehouseTable from "./WarehouseTable";
import TransactionTable from "./TransactionTable";
import WarehouseCards from "./WarehouseCards";
import { Nav, NavDropdown } from "react-bootstrap";

export default function MainContent() {
  const [content, setContent] = useState(null);

  return (
    <div className="container">
      <Nav justify variant="tabs">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => setContent(<ProductTable />)}
          >
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => setContent(<WarehouseTable />)}
          >
            Warehouses
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => setContent(<TransactionTable />)}
          >
            Transactions
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Reports" id="nav-dropdown">
          <NavDropdown.Item 
          eventKey="link-4.1"
          onClick={() => setContent(<WarehouseCards />)}>
            Warehouse (products)
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="link-4.2">Report 2</NavDropdown.Item>
          <NavDropdown.Item eventKey="link-4.3">Report 3</NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <div className="row mt-2">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {content}
        </div>
      </div>
    </div>
  );
}
