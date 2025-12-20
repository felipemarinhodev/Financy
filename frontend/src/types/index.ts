export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type ColorOptions =
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow";

export type IconCategory =
  | "briefcase_business"
  | "car_front"
  | "heart_pulse"
  | "piggy_bank"
  | "shopping_cart"
  | "ticket"
  | "tool_case"
  | "utensils"
  | "paw_print"
  | "house"
  | "gift"
  | "dumbbell"
  | "book_open"
  | "baggage_claim"
  | "mailbox"
  | "receipt_text";
