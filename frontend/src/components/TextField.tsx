import type { IconCategory } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Icon } from "./Icon";
import { Input } from "./ui/input";

type InputProps = {
  hasError?: boolean;
  helperMessage?: string;
  icon?: IconCategory;
  label: string;
} & React.ComponentProps<"input">;

export const TextField = ({
  hasError,
  helperMessage,
  icon,
  label,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-2 group" data-error={hasError}>
      <Label className="text-md font-medium group-focus-within:text-green-base group-data-[error=true]:text-danger transition-colors duration-200">
        {label}
      </Label>
      <div className="flex items-center border border-input rounded-md px-3 py-1 shadow-sm content-box">
        {icon && (
          <Icon
            color="none"
            icon={icon}
            size={32}
            className="group-focus-within:text-green-base group-data-[error=true]:text-danger group-disabled-within:text-gray-400 transition-colors duration-200"
          />
        )}
        <Input
          className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none"
          {...props}
        />
      </div>
      {helperMessage && (
        <span className="text-gray-500 text-xs">{helperMessage}</span>
      )}
    </div>
  );
};
