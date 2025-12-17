import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginService } from "../services";
import { LoginInput } from "../dtos/input";
import { LoginOutput } from "../dtos/output";

@Resolver()
export class LoginResolver {
  private loginService = new LoginService();

  @Mutation(() => LoginOutput)
  async login(
    @Arg("data", () => LoginInput)
    data: LoginInput
  ) {
    return this.loginService.login(data);
  }
}
