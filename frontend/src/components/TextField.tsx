  import { Label } from "@radix-ui/react-label";
  import { Input } from "./ui/input";

  type InputProps = {
    icon: React.ReactNode;
    label: string;
  } & React.ComponentProps<"input">;

  export const TextField = ({ icon, label, ...props }: InputProps) => {
    return (
      <div className="flex flex-col w-full p-3">
        <Label className="text-label mb-2">{label}</Label>
        <div className="flex items-center border border-input rounded-md px-3 py-1 shadow-sm">
          {icon}
        <Input {...props} />
        </div>
      </div>
    );
  };
