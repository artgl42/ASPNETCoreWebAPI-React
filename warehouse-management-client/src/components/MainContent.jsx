import React, { useState } from "react";
import ProductTable from "./ProductTable";
import WarehouseTable from "./WarehouseTable";
import TransactionTable from "./TransactionTable";
import { Nav } from "react-bootstrap";

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
      </Nav>

      <div className="row mt-2">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {content}
        </div>
      </div>
    </div>
  );
}
