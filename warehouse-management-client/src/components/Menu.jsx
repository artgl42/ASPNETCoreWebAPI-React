import React from 'react';
import {
  Container, Nav, Navbar, Image,
} from 'react-bootstrap';
import Logo from './imgs/warehouse.svg';
import { useReducerContext } from './hooks/useReducerContext';

export default function Menu() {
  const { dispatch } = useReducerContext();

  return (
    <Navbar bg="dark" variant="dark" className="py-2" expand="sm">
      <Container>
        <Navbar.Brand>
          <Nav.Link
            className="px-2 py-0"
            onClick={() => dispatch({ type: 'Null' })}
          >
            <Image
              src={Logo}
              alt="Logo"
              width="50"
              height="50"
            />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => dispatch({ type: 'TransactionsTable' })}>Transactions</Nav.Link>
            <Nav.Link onClick={() => dispatch({ type: 'ProductsTable' })}>Products</Nav.Link>
            <Nav.Link onClick={() => dispatch({ type: 'WarehouseCards', dispatch: { dispatch } })}>Warehouses</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
