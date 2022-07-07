import React, { useState, useEffect } from 'react';
import {
  Stack, Row, Col, Card,
} from 'react-bootstrap';
import { API_URL_GET_ALL_WAREHOUSES } from './constants/API';
import useFetch from './hooks/useFetch';
import LoadSpinner from './utils/LoadSpinner';
import WarehouseImage from './imgs/warehouse.png';
import ButtonsGroup from './ButtonsGroup';

export default function WarehouseCards() {
  const { data, loading, error } = useFetch(API_URL_GET_ALL_WAREHOUSES);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    if (!loading) {
      setWarehouses(data);
    }
  }, [loading, data]);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error!!!', error);
    return null;
  }
  if (loading) return <LoadSpinner />;
  return (
    <Stack>
      <Row className="ms-1 my-0 me-0 p-0">
        {warehouses !== null && warehouses.map((w) => (
          <Col key={w.id} className="ms-0 my-1 me-1 p-0">
            <Card>
              <Card.Img variant="top" src={WarehouseImage} />
              <Card.Body>
                <Card.Title>{w.id}</Card.Title>
                <Card.Text>{`${w.name} : ${w.address}`}</Card.Text>
                <ButtonsGroup warehouseId={w.id} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
