import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlewares/auth.middleware";
import { CategoryModel, TransactionModel, UserModel } from "../models";
import { CategoryService, TransactionService, UserService } from "../services";
import { CreateTransactionInput } from "../dtos/input";
import { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver(() => TransactionModel)
@UseMiddleware(isAuth)
export class TransactionResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();
  private userService = new UserService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User
  ) {
    return this.transactionService.create(data, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel) {
    return this.userService.findById(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel) {
    return this.categoryService.findById(transaction.categoryId);
  }
}
