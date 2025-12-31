import { useAuthStore } from "@/stores/auth";
// import { useCategory } from "@/stores/category";
import type { RegisterInput } from "@/types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export const useAuthController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuthStore((state) => state);
  // const { setCategories } = useCategory((state) => state);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const isAuthenticated = await login({ email, password });

        if (isAuthenticated) {
          // await setCategories();
          toast.success(
            `Login realizado com sucesso! Bem-vindo(a), ${login.name}`
          );
          navigate("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Falha no login! Verifique suas credenciais.");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [login, navigate]
  );

  const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const handleCreateAccount = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setIsLoading(true);
        const newUser = userSchema.parse({
          name,
          email,
          password,
        }) as unknown as RegisterInput;
        const isCreated = await signup(newUser);
        if (isCreated) {
          toast.success(`Conta criada com sucesso! Bem-vindo(a), ${name}.`);
          navigate("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Falha ao criar conta! Verifique suas credenciais.");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [signup, navigate, userSchema]
  );

  return {
    handleLogin,
    handleCreateAccount,
    isLoading,
  };
};
