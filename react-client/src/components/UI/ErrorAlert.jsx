// @ts-nocheck
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

export default function ErrorAlert({ message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oops, something went wrong!</Alert.Heading>
        <p>{message !== "" && `Error: ${message}`}</p>
      </Alert>
    );
  }
}
ErrorAlert.propTypes = {
  message: PropTypes.string,
};

ErrorAlert.defaultProps = {
  message: "",
};
