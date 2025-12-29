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
  | "search"
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

export type MostUsedCategory = {
  id: string;
  title: string;
  color: ColorOptions;
  description: string;
  icon: IconCategory;
  usageCount: number;
};

export type TypeTransaction = "income" | "expense";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TypeTransaction;
  date: Date;
  user?: User;
  category?: Category;
};

export type Pagination = {
  totalItems: number;
};

export type Transactions = {
  transactions: Transaction[];
  pagination: Pagination;
};

export interface BalanceTransactions {
  income: number;
  expense: number;
  balance: number;
}

export type TransactionParamsInput = {
  type?: TypeTransaction;
  description?: string;
  categoryId?: string;
  period?: Date;
  limit?: number;
  page?: number;
};
