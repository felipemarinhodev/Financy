import { cn } from "@/lib/utils";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

type TypePros = {
  type: "income" | "expense";
  onlyIcon?: boolean;
};

export const Type = ({ type, onlyIcon = false }: TypePros) => {
  const className = type === "income" ? "text-green-500" : "text-red-500";
  const icon =
    type === "income" ? (
      <CircleArrowUp size={16} />
    ) : (
      <CircleArrowDown size={16} />
    );

  return (
    <div className={cn("flex flex-row justify-center gap-2 ", className)}>
      {icon}
      {!onlyIcon && (
        <span className="font-medium text-md">
          {type === "income" ? "Entrada" : "Saída"}
        </span>
      )}
    </div>
  );
};
