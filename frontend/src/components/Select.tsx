import {
  Select as UiSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

type SelectItem = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  items?: SelectItem[];
  helperMessage?: string;
  onValueChange: (value: string) => void;
} & React.ComponentProps<"select">;

export const Select = ({
  label,
  items,
  helperMessage,
  onValueChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col w-full gap-2 group">
      <Label className="text-md font-medium group-focus-within:text-green-base group-data-[error=true]:text-danger transition-colors duration-200">
        {label}
      </Label>
      <UiSelect onValueChange={onValueChange}>
        <SelectTrigger className="w-full shadow-sm p-5.5">
          <SelectValue placeholder="Todas" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </UiSelect>
      {helperMessage && (
        <span className="text-gray-500 text-xs">{helperMessage}</span>
      )}
    </div>
  );
};
