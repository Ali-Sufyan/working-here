import clsx from "clsx";
import { HTMLAttributes } from "react";

const StyledToggle = (
  props: Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    checked?: boolean;
    disabled?: boolean;
  }
) => {
  const { checked = true, disabled = false } = props;
  return (
    <div
      {...props}
      className={clsx(
        `cursor-pointer relative w-14 h-7  rounded-3xl`,
        checked ? "bg-primary" : "bg-gray-300",
        disabled && "cursor-not-allowed bg-gray-300 pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "rounded-full bg-white w-7 h-7 absolute top-0 right-0 transition-all",
          !checked && "-translate-x-full"
        )}
      ></div>
    </div>
  );
};
export default StyledToggle;
