import { useAppDispatch } from "../../../app/slices/hooks";
import {
  closeDeleteModal,
  closeSomeModal,
} from "../../../app/slices/modal/modal.types";
import { myIcons } from "../icons";
import { CancelIcon, InformationIcon, TrashIcon } from "../icons/util-icons";
import Loading from "../styles/loading";
import { mergeCssClass } from "../utils";

export default function DeleteModal(props: {
  props: {
    id: string;
    confirm: (id: string) => void;
    metadata: string[];
    isLoading?: boolean;
    modalId?: string;
  };
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="w-[100%] h-[100%] mb-2">
      <div className="text-[20px] font-semibold text-center mb-2">
        Are you sure you want to delete this?
      </div>
      <div className="text-[14px] text-center">
        <div className="text-[14px]  flex items-center justify-center ">
          <div className="text-[hsla(48,_77%,_40%,_1)]">
            {" "}
            <InformationIcon />
          </div>{" "}
          <div className="text-[16px] text-center ">
            {" "}
            This action cannot be undone.
          </div>
        </div>
        <div className="text-[14px] text-center">
          This will permanently delete :
        </div>
        <div className="text-[14px] text-start mb-4 flex justify-center align-middle items-center flex-col ">
          {props.props.metadata &&
            props.props.metadata?.map((item, index) => {
              return (
                <div
                  className="text-[hsla(3,77%,20%,1)] flex justify-center text-[16px]  align-middle p-3 items-center"
                  key={index}
                >
                  {<myIcons.FaceFrownMiniIconBold />}
                  <div className="pl-1">{item}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex space-x-4 justify-center align-[bottom] w-[100%] h-[100%] items-end">
        <div className="div">
          <button
            disabled={props.props.isLoading}
            onClick={() => props.props.confirm(props.props.id)}
            className={mergeCssClass(
              "bg-[hsla(15,_70%,_40%,_1)]  transition-all duration-700 ease-in-out  hover:bg-[hsla(15,_90%,_40%,_1)] text-white px-4 py-2 rounded flex items-center",
              props.props.isLoading ? "disabled:opacity-50  " : ""
            )}
          >
            <div className="text-[14px]"> Yes, Delete </div>
            {"  "}
            {props.props.isLoading ? (
              <Loading transparent size={24} />
            ) : (
              <span className="h-[16px]  w-[16px] px-1 transition-all duration-700 ease-in-out hover:h-[20px] hover:w-[20px]">
                <TrashIcon />
              </span>
            )}
          </button>
        </div>
        <div className="div">
          <button
            onClick={() => {
              dispatch(closeDeleteModal());
              if(props.props.modalId)  dispatch(closeSomeModal(props.props.modalId));
            }}
            className="btn-secondary  px-4 py-2 rounded flex transition-all duration-700 ease-in-out items-center justify-between"
          >
            <div className="text-[14px] ">Cancel</div>
            <span className="h-[20px] hover:h-[22px] transition-all duration-700 ease-in-out hover:w-[22px] w-[20px] px-1">
              <CancelIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
