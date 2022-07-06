/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Stack, Row, Col, Card, Button,
} from 'react-bootstrap';
import Urls from '../utils/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../utils/LoadSpinner';
import WarehouseImage from '../imgs/warehouse.png';
import BalanceProducts from './BalanceProducts';

export default function WarehouseCards({ setContent }) {
  const { data, loading, error } = useFetch(Urls.API_URL_GET_ALL_WAREHOUSES);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    if (!loading) {
      setWarehouses(data);
    }
  }, [loading, data]);

  function onClick(e) {
    setContent(<BalanceProducts id={e.target.value} />);
  }

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
                <Button
                  value={w.id}
                  variant="outline-success"
                  size="sm"
                  onClick={(e) => onClick(e)}
                >
                  Products...
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
