import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input";
import { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { isAuth } from "../middlewares/auth.middleware";
import { CategoryModel, UserModel } from "../models";
import { CategoryService, UserService } from "../services";

@Resolver(() => CategoryModel)
@UseMiddleware(isAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private userService = new UserService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput)
    data: CreateCategoryInput,
    @GqlUser()
    user: User
  ) {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput)
    data: UpdateCategoryInput,
    @Arg("id", () => String) id: string,
    @GqlUser()
    user: User
  ) {
    return this.categoryService.update(data, id, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser()
    user: User
  ) {
    return this.categoryService.delete(id, user.id);
  }

  @Query(() => [CategoryModel])
  async categories(@GqlUser() user: User) {
    return this.categoryService.findAllByUserId(user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel) {
    return this.userService.findById(category.userId);
  }
}
