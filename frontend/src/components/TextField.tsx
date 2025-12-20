  import { Label } from "@radix-ui/react-label";
  import { Input } from "./ui/input";

  type InputProps = {
    icon?: React.ReactNode;
    label: string;
  } & React.ComponentProps<"input">;

  export const TextField = ({ icon, label, ...props }: InputProps) => {
    return (
      <div className="flex flex-col w-full">
        <Label className="text-md mb-2 font-medium">{label}</Label>
        <div className="flex items-center border border-input rounded-md px-3 py-1 shadow-sm">
          {icon && icon}
          <Input
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none"
            {...props}
          />
        </div>
      </div>
    );
  };
