import { useState } from "react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar as CalendarShadcn } from "./ui/calendar";
import { dateFormatter } from "@/utils/DateFormatter";

type CalendarProps = {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
};

export const Calendar = ({
  label,
  value = undefined,
  onChange,
}: CalendarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2 group">
      <Label className="text-md font-medium group-focus-within:text-green-base group-data-[error=true]:text-danger transition-colors duration-200">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            id="date"
            className="w-full justify-between font-normal border border-input rounded-md px-3 py-1 shadow-sm content-box">
            {value ? dateFormatter(value) : "Selecione"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <CalendarShadcn
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (!date) return;
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
