import React, { useState, useEffect, useCallback } from 'react';
import { Stack, Row, Accordion } from 'react-bootstrap';
import Urls from '../../Urls';
import ProductsOfWarehouse from './ProductsOfWarehouse';
import WarehouseCard from './WarehouseCard';
import LoadSpinner from '../LoadSpinner';

export default function WarehouseCards() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState(null);

  const showProductsForWarehouse = useCallback((warehouseId) => {
    setProducts(null);
    setProducts(<ProductsOfWarehouse id={warehouseId} />);
  }, [setProducts]);

  useEffect(() => {
    fetch(Urls.API_URL_GET_ALL_WAREHOUSES)
      .then((result) => result.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWarehouses(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, []);

  if (error) {
    return (
      <Stack>
        Ошибка:
        {error.message}
      </Stack>
    );
  }
  if (!isLoaded) return <LoadSpinner />;
  return (
    <Stack>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Warehouses</Accordion.Header>
          <Accordion.Body>
            <Row md={4} className="g-1">
              {warehouses.map((w) => (
                <WarehouseCard
                  key={w.id}
                  id={w.id}
                  name={w.name}
                  address={w.address}
                  func={showProductsForWarehouse}
                />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Row className="mt-4">
          {products}
        </Row>
      </Accordion>
    </Stack>
  );
}
