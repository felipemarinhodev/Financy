import { createParameterDecorator, ResolverData } from "type-graphql";
import { GraphqlContext } from "../context";
import { prismaClient } from "@/prisma/prisma";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>) => {
      if (!context || !context.user) throw new Error("Not authenticated");
      try {
        const user = await prismaClient.user.findUnique({
          where: { id: context.user },
        });
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        console.log("Error instantiating gqluser");
      }
    }
  );
};
