import bycrypjs, { compare } from "bcryptjs";

export const hashPassword = async (plainPassword: string) => {
  const salt = await bycrypjs.genSalt(10);
  return bycrypjs.hash(plainPassword, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await compare(plainPassword, hashedPassword);
};
