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
  export class TransactionDetailModel {
    @Field(() => String, { nullable: true })
    categoryId?: string;
    @Field(() => Number, { nullable: true })
    totalAmount?: number;
    @Field(() => Number, { nullable: true })
    transactionCount?: number;
  }
