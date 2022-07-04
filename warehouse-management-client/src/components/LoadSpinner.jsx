import React from 'react';
import { Stack, Spinner } from 'react-bootstrap';

export default function LoadSpinner() {
  return (
    <Stack className="mx-auto my-2">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Stack>
  );
}
