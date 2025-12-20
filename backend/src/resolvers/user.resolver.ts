import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { UpdateProfileInput } from "../dtos/input";
import { GqlUser } from "../graphql/decorators";
import { isAuth } from "../middlewares";
import { UserModel } from "../models";
import { UserService } from "../services";
import { User } from "../generated/prisma/client";

@Resolver(() => UserModel)
@UseMiddleware(isAuth)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async updateProfile(
    @Arg("data", () => UpdateProfileInput) data: UpdateProfileInput,
    @GqlUser() user: User
  ) {
    return this.userService.updateProfile(data, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() user: UserModel) {
    return this.userService.findById(user.id);
  }
}
