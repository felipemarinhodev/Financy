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
  | "baggage_claim"
  | "book_open"
  | "briefcase_business"
  | "car_front"
  | "dumbbell"
  | "gift"
  | "heart_pulse"
  | "house"
  | "lock"
  | "mailbox"
  | "paw_print"
  | "piggy_bank"
  | "receipt_text"
  | "shopping_cart"
  | "ticket"
  | "tool_case"
  | "user"
  | "utensils";

export type Category = {
  id: string;
  title: string;
  color: ColorOptions;
  description: string;
  icon: IconCategory;
  user?: {
    id?: string;
    name?: string;
  };
  detail: {
    categoryId: string;
    totalAmount: number;
    transactionCount: number;
  };
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: Date;
  user?: User;
};
