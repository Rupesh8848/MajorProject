import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { modalContext } from "../Context/modalContext";
import { DropZone } from "./DropZone";
import "./Modal.css";

export default function Modal({ children }) {
  const { setModalState } = React.useContext(modalContext);
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
          {children}
          {/* <DropZone /> */}
        </div>
      </div>
    </div>
  );
}
