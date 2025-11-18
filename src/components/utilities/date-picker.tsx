import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date |null) => void;
  placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const CustomDatePicker = ({
  date,
  onChange,
  placeholder = "Select date",
  className,disabled = false
}: DatePickerProps) => {


  const CustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <Button
      variant="outline"
      onClick={onClick}
      ref={ref}
      className={cn(
        "w-full justify-start text-left font-normal",
        !value && "text-muted-foreground",
        className
          )}
          disabled={disabled}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value || placeholder}
    </Button>
  ));

  return (
    <ReactDatePicker
          selected={date}
          
      onChange={onChange}
      customInput={<CustomInput />}
      dateFormat="MMM dd, yyyy"
      wrapperClassName="w-full"
      popperClassName="react-datepicker-right"
      calendarClassName="!bg-background !border !border-border !rounded-lg !font-sans !shadow-md"
      dayClassName={(date) =>
        cn(
          "!rounded !m-1 !w-8 !h-8 !leading-8 !text-center hover:!bg-accent",
          date.getMonth() === new Date().getMonth()
            ? "!text-foreground"
            : "!text-muted-foreground"
        )
      }
      className={cn(
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        "placeholder:text-muted-foreground focus:outline-none focus:ring-2",
        "focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
};

export default CustomDatePicker;
