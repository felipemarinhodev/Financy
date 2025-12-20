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
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from "lucide-react";
import { useMemo } from "react";

type Category = {
  title: string;
  color: ColorOptions;
  icon?: IconCategory;
};

type TagCategoryProps = {
  category: Omit<Category, "icon">;
};

export const TagCategory = ({ category }: TagCategoryProps) => {
  const { title, color } = category;

  return (
    <span
      className={`bg-${color}-light text-${color}-base px-2 py-1 rounded-md text-xs font-medium`}>
      {title}
    </span>
  );
};

type TagCategoryIconProps = {
  category: Category;
};
export const TagCategoryIcon = ({ category }: TagCategoryIconProps) => {
  const { color, icon } = category;

  const classNames = `bg-${color}-light text-${color}-base rounded-md w-7 h-7 p-2`;

  const Icon = useMemo(() => {
    switch (icon) {
      case "briefcase_business": {
        return <Briefcase className={classNames} />;
      }
      case "car_front": {
        return <CarFront className={classNames} />;
      }
      case "heart_pulse": {
        return <HeartPulse className={classNames} />;
      }
      case "piggy_bank": {
        return <PiggyBank className={classNames} />;
      }
      case "shopping_cart": {
        return <ShoppingCart className={classNames} />;
      }
      case "ticket": {
        return <Ticket className={classNames} />;
      }
      case "tool_case": {
        return <ToolCase className={classNames} />;
      }
      case "utensils": {
        return <Utensils className={classNames} />;
      }
      case "paw_print": {
        return <PawPrint className={classNames} />;
      }
      case "house": {
        return <House className={classNames} />;
      }
      case "gift": {
        return <Gift className={classNames} />;
      }
      case "dumbbell": {
        return <Dumbbell className={classNames} />;
      }
      case "book_open": {
        return <BookOpen className={classNames} />;
      }
      case "baggage_claim": {
        return <BaggageClaim className={classNames} />;
      }
      case "mailbox": {
        return <Mailbox className={classNames} />;
      }
      case "receipt_text": {
        return <ReceiptText className={classNames} />;
      }
      default:
        return null;
    }
  }, [icon, classNames]);

  return <>{Icon}</>;
};
