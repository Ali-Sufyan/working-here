import React from "react";

import { useAppDispatch, useAppSelector } from "../../../app/slices/hooks";
import { closeDeleteModal } from "../../../app/slices/modal/modal.types";
import "./modal.css";// Import your CSS file

interface ModalProps {
  children: JSX.Element;
}

const CustomModal: React.FC<ModalProps> = ({ children }) => {
  const modal = useAppSelector((state) => state.modal.openDeleteModal);
  const dispatch = useAppDispatch();
  return (
    <>
      {modal && (
        <div
          className="modal-background"
          /*         onClick={() => dispatch(closeDeleteModal())} */
        >
          <div className="modal-container">
            <span
              className="close-icon"
              onClick={() => dispatch(closeDeleteModal())}
            >
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
