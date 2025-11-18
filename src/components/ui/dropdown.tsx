import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface DropdownProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: (string | number)[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="space-y-2 ">
      <Label>{label}</Label>
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent
         
          className="!bg-neutral-100  dark:!bg-neutral-800"
        >
          {options.map((option) => (
            <SelectItem
              style={{
                color: "black",
                padding: "2px",
              }}
              className="!text-black dark:!text-white"
              key={option}
              value={String(option)}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { Dropdown };

