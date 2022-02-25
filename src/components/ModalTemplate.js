import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalTemplate({ config }) {
  return (
    <Modal show={config.showBool} onHide={config.handleCloseFunc}>
      <Modal.Header closeButton>
        <Modal.Title>{config.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{config.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={config.handleCloseFunc}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalTemplate;
