import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlewares";
import { CategoryModel, TransactionModel, UserModel } from "../models";
import { CategoryService, TransactionService, UserService } from "../services";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input";
import { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators";

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
    const hasCategory = await this.categoryService.findByIdAndUserId(
      data.categoryId,
      user.id
    );

    if (!hasCategory) {
      throw new Error("Category not found");
    }

    return this.transactionService.create(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput)
    data: UpdateTransactionInput,
    @Arg("id", () => String)
    id: string,
    @GqlUser()
    user: User
  ) {
    return this.transactionService.update(data, id, user.id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User
  ) {
    return this.transactionService.delete(id, user.id);
  }

  @Query(() => [TransactionModel])
  async transactions(@GqlUser() user: User) {
    return this.transactionService.findAllByUserId(user.id);
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
