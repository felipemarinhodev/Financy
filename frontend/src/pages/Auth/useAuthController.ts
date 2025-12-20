import { useAuthStore } from "@/stores/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useAuthController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      navigate("/dashboard");
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

  return {
    handleLogin,
    isLoading,
  };
};
