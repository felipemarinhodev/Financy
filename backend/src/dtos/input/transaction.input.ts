import { TransactionType } from "@/src/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string
  @Field(() => TransactionType, { nullable: true})
  type?: TransactionType
  @Field(() => Number)
  amount!: number
  @Field(() => String)
  categoryId!: string
  @Field(() => Date)
  date!: Date
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;
  @Field(() => Number, { nullable: true })
  amount?: number;
  @Field(() => String, { nullable: true })
  categoryId?: string;
  @Field(() => Date, { nullable: true })
  date?: Date;
}

@InputType()
export class TransactionParamsInput {
  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => Number, { nullable: true })
  page?: number;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;
  @Field(() => String, { nullable: true })
  categoryId?: string;
  @Field(() => Date, { nullable: true })
  period?: Date;
} 
