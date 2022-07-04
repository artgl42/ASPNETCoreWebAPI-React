import React, { useState } from 'react';
import {
  Container, Stack, Nav, NavDropdown, Alert,
} from 'react-bootstrap';
import ProductTable from './Products/ProductTable';
import WarehouseTable from './Warehouses/WarehouseTable';
import TransactionTable from './Transactions/TransactionTable';
import WarehouseCards from './Reports/WarehouseCards';
import Header from './Header';

export default function MainMenu() {
  const [content, setContent] = useState(null);
  const [help, setHelp] = useState(false);

  return (
    <Container>
      <Header />
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
      <Nav variant="tabs" fill justify>
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
        <NavDropdown title="Reports" style={{ margin: 0 }}>
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
          <Nav.Link eventKey="Help" onClick={() => (help ? setHelp(false) : setHelp(true))}>
            ?
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Stack>
        {content}
      </Stack>
    </Container>
  );
}
