import { Header } from "@/components/Header";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const LayoutAuth = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="p-12">
        <Outlet />
      </main>
    </div>
  );
};