import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export const LayoutAuth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="p-12">
      <Outlet />
      </main>
    </div>
  );
}