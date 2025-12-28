import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from "type-graphql";
import { CategoryModel, UserModel } from "../models";

export enum TransactionType {
  income = "income",
  expense = "expense",
}

registerEnumType(TransactionType, {
  name: "TransactionType",
  description: "Types of transactions",
});

@ObjectType()
export class PaginationModel {
  @Field(() => Number)
  totalItems!: number;
}

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;
  @Field(() => String)
  description!: string;
  @Field(() => TransactionType)
  type!: string;
  @Field(() => Number)
  amount!: number;
  @Field(() => String)
  categoryId!: string;
  @Field(() => String)
  userId!: string;
  @Field(() => GraphQLISODateTime)
  date!: Date;
  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;
}
@ObjectType()
export class TransactionsModel {
  @Field(() => PaginationModel, { nullable: true })
  pagination?: PaginationModel;
  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[];
}
  @ObjectType()
  export class TransactionDetailModel {
    @Field(() => String, { nullable: true })
    categoryId?: string;
    @Field(() => Number, { nullable: true })
    totalAmount?: number;
    @Field(() => Number, { nullable: true })
    transactionCount?: number;
  }
  @ObjectType()
  export class BalanceDetailModel {
    @Field(() => Number)
    income: number;
    @Field(() => Number)
    expense: number;
    @Field(() => Number)
    balance: number;
  }

  @ObjectType()
  export class TransactionPeriodsModel {
    @Field(() => GraphQLISODateTime)
    oldestDate: Date;
    @Field(() => GraphQLISODateTime)
    newestDate: Date;
  }