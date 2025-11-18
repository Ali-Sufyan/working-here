import { ButtonHTMLAttributes, ReactNode } from "react";
import { mergeCssClass } from "../utils";

type Props = ButtonHTMLAttributes<HTMLDivElement> & { children?: ReactNode };
const StyledButton = ({ children, className = "", ...rest }: Props) => {
  const isGhost = className.includes("ghost");
  const noBorder = className.includes("border_less");
  const isCancel = className.includes("cancel");
  const isDanger = className.includes("danger");
  const isSmall = className.includes("small");
  const isMini = className.includes("mini");
  const isFull = className.includes("flex");
  const IsSubmerged = className.includes("submerged");
  const isElevated = className.includes("elevated");
  const isElated = className.includes("elate");

  return (
    <div
      className={mergeCssClass(
        `  break-keep  flex align-middle flex-row cursor-pointer justify-center place-content-center place-items-center  px-6 py-2 h-full md:hover:bg-primary-500 min-w-[100px]  active:bg-primary-500 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:hover:cursor-not-allowed`,
        isFull && "w-full text-center justify-center",
        isGhost &&
          " !text-gray-700 dark:!text-gray-100  !border !border-solid !border-gray-300 dark:!border-gray-500 !bg-transparent",
        isCancel &&
          "!bg-transparent !text-black dark:!text-gray-50 !border !border-solid !border-gray-200",
        isSmall && "!h-auto !py-2",
        noBorder && "!shadow-none !border-none",
        isMini && "!h-auto !px-2.5 !py-1 !text-xs",
        isDanger &&
          "!bg-red-500 disabled:!bg-gray-300 md:hover:!bg-red-500/80 active:bg-red-700",
        IsSubmerged && "submerged-paper",
        isElevated && "elevated-paper",
        isElated && "elated-paper",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
export default StyledButton;
