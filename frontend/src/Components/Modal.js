import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DropZone } from "./DropZone";
import "./Modal.css";

export default function Modal({ setModalState }) {
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <span
            className="modal-close-btn"
            onClick={() => setModalState("hide")}
          >
            <IoMdCloseCircleOutline />
          </span>
          <DropZone />
        </div>
      </div>
    </div>
  );
}
