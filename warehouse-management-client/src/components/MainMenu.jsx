import React, { useState } from 'react';
import {
  Container, Stack, Nav, Navbar, Alert, NavDropdown,
} from 'react-bootstrap';
import ProductTable from './Products/ProductTable';
import WarehouseTable from './Warehouses/WarehouseTable';
import TransactionTable from './Transactions/TransactionTable';
import WarehouseCards from './Reports/WarehouseCards';
import Header from './Header';
import Logo from './imgs/warehouse.svg';

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
      <Navbar bg="dark" variant="dark" className="py-2">
        <Container>
          <Nav.Link onClick={() => setContent(null)} className="px-2 py-0">
            <img
              src={Logo}
              alt="Logo"
              width="50"
              height="50"
            />
          </Nav.Link>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setContent(<ProductTable />)}>Products</Nav.Link>
            <Nav.Link onClick={() => setContent(<WarehouseTable />)}>Warehouses</Nav.Link>
            <Nav.Link onClick={() => setContent(<TransactionTable />)}>Transactions</Nav.Link>
            <NavDropdown title="Reports" style={{ margin: 0 }}>
              <NavDropdown.Item
                onClick={() => setContent(<WarehouseCards />)}
              >
                Products in Warehouse
              </NavDropdown.Item>
              <NavDropdown.Item disabled>
                Report 2
              </NavDropdown.Item>
              <NavDropdown.Item disabled>
                Report 3
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => (help ? setHelp(false) : setHelp(true))}>?</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack>
        {content}
      </Stack>
    </Container>
  );
}
