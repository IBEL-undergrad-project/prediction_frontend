import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalTemplate({ config }) {
  return (
    <Modal size="lg" show={config.showBool} onHide={config.handleCloseFunc}>
      <Modal.Header closeButton>
        <Modal.Title>{config.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        {config.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={config.handleCloseFunc}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalTemplate;
