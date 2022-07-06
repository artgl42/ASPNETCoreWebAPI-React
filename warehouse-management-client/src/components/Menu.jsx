import React from 'react';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import Logo from './imgs/warehouse.svg';
import { useReducerContext } from './hooks/useReducerContext';

export default function Menu() {
  const { dispatch } = useReducerContext();

  return (
    <Navbar bg="dark" variant="dark" className="py-2">
      <Container>
        <Nav.Link onClick={() => dispatch({ type: 'Null' })} className="px-2 py-0">
          <img
            src={Logo}
            alt="Logo"
            width="50"
            height="50"
          />
        </Nav.Link>
        <Nav className="me-auto">
          <Nav.Link onClick={() => dispatch({ type: 'ProductsTable' })}>Products</Nav.Link>
          <Nav.Link onClick={() => dispatch({ type: 'WarehousesTable' })}>Warehouses</Nav.Link>
          <Nav.Link onClick={() => dispatch({ type: 'TransactionsTable' })}>Transactions</Nav.Link>
          <NavDropdown title="Reports" className="m-0">
            <NavDropdown.Item
              onClick={() => dispatch({ type: 'WarehouseCards', dispatch: { dispatch } })}
            >
              Balance (Products)
            </NavDropdown.Item>
            <NavDropdown.Item disabled>
              Report 2
            </NavDropdown.Item>
            <NavDropdown.Item disabled>
              Report 3
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
