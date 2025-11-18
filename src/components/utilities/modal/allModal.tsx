import { ModalProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/slices/hooks";
import { closeSomeModal, handleModalFunc } from "../../../app/slices/modal/modal.types";
import { myIcons } from "../icons";
import { isMobile, mergeCssClass } from "../utils";
import "./modal.css";

const AllCustomModal: React.FC<
  Omit<ModalProps, "open"> & {
    modalId: string;
    transparent?: boolean;
    nav?: string;
    func?: () => void;
    width?: string;
  }
> = ({ children, modalId, transparent = false, nav, width }) => {
  const modal = useAppSelector((state) => state.modal.openSomeModal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  return (
    <>
      {modal[modalId]?.value && (
        <div
          className={mergeCssClass(transparent ? "modal-transparent" : "modal-background")}
          /*         onClick={() => dispatch(closeDeleteModal())} */
        >
          <div
            className={mergeCssClass(
              "modal-container pointer-events-auto",
              width ? width : isMobile() ? "w-[320px]" : "w-[400px]"
            )}
          >
            <span
              className="close-icon"
              onClick={() => {
                dispatch(closeSomeModal(modalId));

                if (nav) {
                  if (nav === "go-back") {
                    navigate(-1);
                  } else {
                    navigate(nav);
                  }
                }
              }}
            >
              &times;
            </span>{" "}
            {modal[modalId] && modal[modalId].arrow && (
              <span
                className={mergeCssClass(
                  "back-icon",
                  modal[modalId].arrow === 1
                    ? "text-gray-400 cursor-not-allowed "
                    : "text-gray-700 ppd-cursor-pointer"
                )}
                onClick={() => {
                  if (modal[modalId] && modal[modalId].arrow) {
                    const x = modal[modalId].arrow ?? 1;
                    if (x > 1) {
                      dispatch(
                        handleModalFunc({
                          name: modalId,
                          arrow: x - 1,
                        })
                      );
                    }
                  } else {
                    dispatch(
                      handleModalFunc({
                        name: modalId,
                        arrow: 1,
                      })
                    );
                  }
                }}
              >
                <myIcons.IconBxLeftArrowAlt />
              </span>
            )}
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export const PositionedAllCustomModal: React.FC<
  Omit<ModalProps, "open"> & {
    modalId: string;
    transparent?: boolean;
    func?: () => void;
    position: "left" | "right" | "center";
  }
> = ({ children, modalId, transparent = false, position = "center" }) => {
  const modal = useAppSelector((state) => state.modal.openSomeModal);

  const dispatch = useAppDispatch();

  return (
    <>
      {modal[modalId]?.value && (
        <div
          id={transparent ? "p-modal-transparent" : "p-modal-background"}
          className={mergeCssClass(
            transparent ? "modal-transparent" : "modal-background",
            position === "left"
              ? "justify-start place-items-start"
              : "",
            position === "right" ? "justify-end place-items-end" : "",
            position === "center"
              ? "justify-center place-items-center"
              : "",
            "align-middle  flex-row"
          )}
          /*         onClick={() => dispatch(closeDeleteModal())} */
        >
          <div className="modal-container mb-5">
            <span
              className="close-icon"
              onClick={() => dispatch(closeSomeModal(modalId))}
            >
              &times;
            </span>
            {modal[modalId] && modal[modalId].arrow && (
              <span
                className="back-icon"
                onClick={() => {
                  if (modal[modalId] && modal[modalId].arrow) {
                    const x = modal[modalId].arrow ?? 1;
                    if (x > 1) {
                      dispatch(
                        handleModalFunc({
                          name: modalId,
                          arrow: x - 1,
                        })
                      );
                    }
                  } else {
                    dispatch(
                      handleModalFunc({
                        name: modalId,
                        arrow: 1,
                      })
                    );
                  }
                }}
              >
                <myIcons.IconBxLeftArrowAlt />
              </span>
            )}
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export const SmallCustomModal: React.FC<
  Omit<ModalProps, "open"> & {
    modalId: string;
    transparent?: boolean;
    func?: () => void;
    position: "left" | "right" | "center";
  }
> = ({ children, modalId, transparent = false, position = "center" }) => {
  const modal = useAppSelector((state) => state.modal.openSomeModal);

  const dispatch = useAppDispatch();

  return (
    <>
      {modal[modalId]?.value && (
        <div
          id={transparent ? "p-modal-transparent" : "p-modal-background"}
          className={mergeCssClass(
            transparent ? "modal-transparent" : "modal-background",
            position === "left"
              ? "justify-start place-items-start"
              : "",
            position === "right" ? "justify-end place-items-end" : "",
            position === "center"
              ? "justify-center place-items-center"
              : "",
            "align-middle  flex-row"
          )}
          /*         onClick={() => dispatch(closeDeleteModal())} */
        >
          <div className="modal-container mb-5">
            <span
              className="close-icon"
              onClick={() => dispatch(closeSomeModal(modalId))}
            >
              &times;
            </span>
            {modal[modalId] && modal[modalId].arrow && (
              <span
                className="back-icon"
                onClick={() => {
                  if (modal[modalId] && modal[modalId].arrow) {
                    const x = modal[modalId].arrow ?? 1;
                    if (x > 1) {
                      dispatch(
                        handleModalFunc({
                          name: modalId,
                          arrow: x - 1,
                        })
                      );
                    }
                  } else {
                    dispatch(
                      handleModalFunc({
                        name: modalId,
                        arrow: 1,
                      })
                    );
                  }
                }}
              >
                <myIcons.IconBxLeftArrowAlt />
              </span>
            )}
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCustomModal;
