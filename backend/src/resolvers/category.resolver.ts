import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CreateCategoryInput } from "../dtos/input";
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

  @Mutation(()=> CategoryModel)
  async createCategory (
    @Arg("data", () => CreateCategoryInput)
    data: CreateCategoryInput,
    @GqlUser()
    user: User
  ) {

    return this.categoryService.create(data, user.id);
  }

  @FieldResolver(() => UserModel) 
  async user(@Root() category: CategoryModel) {
    return this.userService.findById(category.userId);
  }
}
