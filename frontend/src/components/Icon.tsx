import { cn } from "@/lib/utils";
import type { ColorOptions, IconCategory } from "@/types";
import {
  BaggageClaim,
  BookOpen,
  Briefcase,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Lock,
  Mail,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  User,
  Utensils,
} from "lucide-react";
import { useMemo } from "react";

type IconProps = {
  color: ColorOptions | "none";
  icon: IconCategory;
  size?: number;
  className?: string;
};

export const Icon = ({
  color = "none",
  icon,
  size = 32,
  className = "",
}: IconProps) => {
  const classNames = cn(
    `rounded-md p-2 ${
      color !== "none" ? `bg-${color}-light text-${color}-base` : ""
    }`,
    className
  );

  const IconComponent = useMemo(() => {
    switch (icon) {
      case "briefcase_business": {
        return <Briefcase size={size} className={classNames} />;
      }
      case "car_front": {
        return <CarFront size={size} className={classNames} />;
      }
      case "heart_pulse": {
        return <HeartPulse size={size} className={classNames} />;
      }
      case "piggy_bank": {
        return <PiggyBank size={size} className={classNames} />;
      }
      case "shopping_cart": {
        return <ShoppingCart size={size} className={classNames} />;
      }
      case "ticket": {
        return <Ticket size={size} className={classNames} />;
      }
      case "tool_case": {
        return <ToolCase size={size} className={classNames} />;
      }
      case "utensils": {
        return <Utensils size={size} className={classNames} />;
      }
      case "paw_print": {
        return <PawPrint size={size} className={classNames} />;
      }
      case "house": {
        return <House size={size} className={classNames} />;
      }
      case "gift": {
        return <Gift size={size} className={classNames} />;
      }
      case "dumbbell": {
        return <Dumbbell size={size} className={classNames} />;
      }
      case "book_open": {
        return <BookOpen size={size} className={classNames} />;
      }
      case "baggage_claim": {
        return <BaggageClaim size={size} className={classNames} />;
      }
      case "mailbox": {
        return <Mail size={size} className={classNames} />;
      }
      case "receipt_text": {
        return <ReceiptText size={size} className={classNames} />;
      }
      case "user": {
        return <User size={size} className={classNames} />;
      }
      case "lock": {
        return <Lock size={size} className={classNames} />;
      }
      default:
        return null;
    }
  }, [icon, classNames, size]);

  return <>{IconComponent}</>;
};
