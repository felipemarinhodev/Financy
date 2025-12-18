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
