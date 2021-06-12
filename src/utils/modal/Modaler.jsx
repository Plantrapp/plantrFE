import React from "react";
import Modal from "react-bootstrap/Modal";

export default function Modaler(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={props.info.url}
          alt=""
          style={{ margin: "0 auto", width: "100%" }}
        />
        <p>{props.info.description}</p>
        {props.children}
      </Modal.Body>
    </Modal>
  );
}
