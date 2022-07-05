import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import ProductTable from '../Products/ProductTable';
import WarehouseTable from '../Warehouses/WarehouseTable';
import TransactionTable from '../Transactions/TransactionTable';
import WarehouseCards from '../Reports/WarehouseCards';
import Logo from '../imgs/warehouse.svg';

export default function Menu({ setContent, help, setHelp }) {
  return (
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
          <Nav.Link onClick={() => setHelp(!help)}>?</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
Menu.propTypes = {
  help: PropTypes.bool.isRequired,
  setContent: PropTypes.func.isRequired,
  setHelp: PropTypes.func.isRequired,
};
