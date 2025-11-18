"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Status = {
  value: string;
  label: string;
};



export function ComboboxPopover (
  { onSelect, statuses, value, Icon, className = '', 
    disabled = false,
    }:{   statuses: Status[],
    value: string | null,
    Icon: JSX.Element|undefined,
    onSelect: (value: string) => void,
    className?: string;
  disabled?: boolean;
  }
) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
  
  
    value ? statuses.find((status) => status.value === value) || null : null
  );

  return (
    <div className={cn("flex items-center space-x-4", className)}
    
    aria-disabled={disabled}
    >
    
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-center align-middle">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
      {Icon}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={status.value}
                    value={status.value}
                        onSelect={(value) => {
                        onSelect(value);
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
