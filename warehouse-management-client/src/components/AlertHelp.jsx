import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export default function AlertHelp({ help, setHelp }) {
  if (help) {
    return (
      <Alert variant="success" onClose={() => setHelp(false)} dismissible>
        <Alert.Heading>Help</Alert.Heading>
        <p>API 1 - ...</p>
        <hr />
        <p>API 2 - ...</p>
        <hr />
        <p>API 3 - ...</p>
      </Alert>
    );
  }
}
AlertHelp.propTypes = {
  help: PropTypes.bool.isRequired,
  setHelp: PropTypes.func.isRequired,
};
