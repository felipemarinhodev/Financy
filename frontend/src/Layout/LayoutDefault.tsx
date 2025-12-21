import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const LayoutDefault = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="p-12">
        <Outlet />
      </main>
    </div>
  );
};