import { Label } from "@/components/ui/label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4  relative  shrink-0 bg-transparent rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "absolute  top-[0px] left-2 flex flex-row   align-middle  items-center  justify-center  "
      )}
   
    >
      <CheckIcon
        className="h-6 w-6 z-20  " stroke="currentColor" strokeWidth={1.5}
      
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName


interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  label?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value,
  onChange,
  options,
  label
}) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(item => item !== option));
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={value.includes(option)}
              onCheckedChange={(checked) => 
                handleCheckboxChange(option, checked as boolean)
              }
            />
            <Label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};



export { Checkbox, CheckboxGroup };
