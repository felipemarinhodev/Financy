import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateProfileInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;
}
