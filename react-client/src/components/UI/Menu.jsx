import React from "react";
// @ts-ignore
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import Logo from "../imgs/warehouse.svg";
import Products from "../views/Products/Products";
import Transactions from "../views/Transactions/Transactions";
import Warehouses from "../views/Warehouses/Warehouses";
import { PaginationOpt } from "../constants/PaginationOpt";

export default function Menu({ setView }) {
  return (
    <Navbar bg="dark" variant="dark" className="py-2" expand="sm">
      <Container>
        <Navbar.Brand>
          <Nav.Link className="px-2 py-0" onClick={() => setView(null)}>
            <Image src={Logo} alt="Logo" width="50" height="50" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() =>
                setView(
                  <Transactions
                    startPage={PaginationOpt.TRANSACTIONS_START_PAGE}
                    transactionsPerPage={PaginationOpt.TRANSACTIONS_PER_PAGE}
                  />
                )
              }
            >
              Transactions
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                setView(
                  <Products
                    startPage={PaginationOpt.PRODUCTS_START_PAGE}
                    productsPerPage={PaginationOpt.PRODUCTS_PER_PAGE}
                  />
                )
              }
            >
              Products
            </Nav.Link>
            <Nav.Link onClick={() => setView(<Warehouses setView={setView} />)}>
              Warehouses
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
