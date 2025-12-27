import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionDetailModel } from "./transaction.model";

export enum ColorCategory {
  green = "green",
  blue = "blue",
  purple = "purple",
  pink = "pink",
  red = "red",
  orange = "orange",
  yellow = "yellow",
}

export enum IconCategory {
  briefcase_business = "briefcase_business",
  car_front = "car_front",
  heart_pulse = "heart_pulse",
  piggy_bank = "piggy_bank",
  shopping_cart = "shopping_cart",
  ticket = "ticket",
  tool_case = "tool_case",
  utensils = "utensils",
  paw_print = "paw_print",
  house = "house",
  gift = "gift",
  dumbbell = "dumbbell",
  book_open = "book_open",
  baggage_claim = "baggage_claim",
  mailbox = "mailbox",
  receipt_text = "receipt_text",
}

registerEnumType(ColorCategory, {
  name: "ColorCategory",
  description: "Available colors for categories",
});

registerEnumType(IconCategory, {
  name: "IconCategory",
  description: "Available icons for categories",
});

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;
  @Field(() => String)
  title!: string;
  @Field(() => String)
  userId!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => ColorCategory, { nullable: true })
  color?: string;
  @Field(() => IconCategory, { nullable: true })
  icon?: string;
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
  @Field(() => TransactionDetailModel, { nullable: true })
  detail?: TransactionDetailModel;
}

@ObjectType()
export class MostUsedCategoryModel {
  @Field(() => ID)
  id!: string;
  @Field(() => String)
  title!: string;
  @Field(() => ColorCategory, { nullable: true })
  color?: string;
  @Field(() => IconCategory, { nullable: true })
  icon?: string;
  @Field(() => Number)
  usageCount!: number;
}
