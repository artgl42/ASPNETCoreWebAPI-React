import React, { useState, useEffect } from 'react';
import { Stack, Row, Col } from 'react-bootstrap';
import Urls from '../util/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../util/LoadSpinner';
import WarehouseCard from './WarehouseCard';

export default function WarehouseCards() {
  const { data, loading, error } = useFetch(Urls.API_URL_GET_ALL_WAREHOUSES);
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
          <Col className="ms-0 my-1 me-1 p-0">
            <WarehouseCard
              key={w.id}
              id={w.id}
              name={w.name}
              address={w.address}
            />
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
