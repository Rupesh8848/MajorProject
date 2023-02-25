import React from "react";
import { DropZone } from "./DropZone";
import Modal from "./Modal";

export default function UploadModal({ modalVisToggler }) {
  return (
    <div>
      <Modal modalVisToggler={modalVisToggler}>
        <DropZone />
      </Modal>
    </div>
  );
}
