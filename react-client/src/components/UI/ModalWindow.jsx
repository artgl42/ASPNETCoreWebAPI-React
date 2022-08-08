// @ts-nocheck
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalWindow({ title, children, visible, setVisible }) {
  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
