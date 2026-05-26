"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locations = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"];

export function LocationSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex items-center flex-1 z-[10000px]">
      <MapPin className="mr-2 text-muted-foreground" size={18} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-sm font-normal px-0 hover:bg-transparent text-foreground"
          >
            {value || "Chọn khu vực"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-62.5 p-0 z-50 bg-primary-foreground">
          <Command>
            <CommandInput placeholder="Tìm khu vực..." />
            <CommandEmpty>Không tìm thấy</CommandEmpty>

            <CommandGroup>
              {locations.map((loc) => (
                <CommandItem
                  key={loc}
                  value={loc}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {loc}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === loc ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
