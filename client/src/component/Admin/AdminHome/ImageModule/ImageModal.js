import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ImageModal({ image }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        src={image}
        alt="issue_image"
        className="img-fluid"
        id="issue_image_in_table"
        style={{ maxHeight: "500px" }}
        onClick={() => setShowModal(true)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Body className="text-center">
          <img
            src={image}
            alt="issue_image"
            className="enlarge-image"
            style={{ maxWidth: "100%", maxHeight: "700px" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
