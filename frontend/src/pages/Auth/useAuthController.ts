import { useAuthStore } from "@/stores/auth";
import type { RegisterInput } from "@/types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export const useAuthController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const isAuthenticated = await login({ email, password });

        if (isAuthenticated) {
          toast.success(`Login successful! Welcome back. ${login.name}`);
          navigate("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Login failed! Please check your credentials.");
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
          toast.success(`Account created successfully! Welcome, ${name}.`);
          navigate("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Login failed! Please check your credentials.");
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
