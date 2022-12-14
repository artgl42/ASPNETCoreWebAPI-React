import React from "react";
// @ts-ignore
import { Stack, Spinner } from "react-bootstrap";

export default function LoadSpinner() {
  return (
    <Stack>
      <Stack className="mx-auto my-2">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Stack>
    </Stack>
  );
}
