import { ColorCategory, IconCategory } from "@/src/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {

  @Field(() => String)
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => ColorCategory, { nullable: true })
  color?: ColorCategory;
  @Field(() => IconCategory, { nullable: true })
  icon?: IconCategory;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => ColorCategory, { nullable: true })
  color?: ColorCategory;
  @Field(() => IconCategory, { nullable: true })
  icon?: IconCategory;
}