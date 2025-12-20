import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN } from "@/lib/graphql/mutations/Login";
import { REGISTER } from "@/lib/graphql/mutations/Register";
import { UPDATE_PROFILE } from "@/lib/graphql/mutations/UpdateProfile";
import type { RegisterInput, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginInput {
  email: string;
  password: string;
}

type LoginMutationData = {
  login: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type RegisterMutationData = {
  register: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (loginData: LoginInput) => Promise<boolean>;
  logout: () => void;
  signup(data: RegisterInput): Promise<boolean>;
  updateProfile: (name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: { data: loginData },
          });
          if (data?.login) {
            const { user, token } = data.login;
            set({ user, token, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("🚧 Login error:", error);
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        apolloClient.clearStore();
      },
      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: { data: { ...registerData } },
          });

          if (data?.register) {
            const { user, token } = data.register;
            set({ user, token, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("🚧 Signup error:", error);
          throw error;
        }
      },
      updateProfile: async (name: string) => {
        const currentUser = useAuthStore.getState().user;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        try {
          const { data } = await apolloClient.mutate<
            {
              updateProfile: { user: User };
            },
            { data: { name: string; email: string } }
          >({
            mutation: UPDATE_PROFILE,
            variables: {
              data: {
                name,
                email: currentUser.email,
              },
            },
          });
          if (data?.updateProfile) {
            const user = { ...currentUser, name };
            set({ user });
            return true;
          }
          return false;
        } catch (error) {
          console.error("🚧 Update profile error:", error);
          throw error;
        }
      },
    }),
    { name: "auth-storage" }
  )
);
