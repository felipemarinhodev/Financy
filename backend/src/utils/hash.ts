import bycrypjs from "bcryptjs";

export const hashPassword = async (plainPassword: string) => {
  const salt = await bycrypjs.genSalt(10);
  return bycrypjs.hash(plainPassword, salt);
}
