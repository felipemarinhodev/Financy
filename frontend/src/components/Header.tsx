import { useAuthStore } from "@/stores/auth";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const currentPage = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  return (
    <header className="w-full bg-white shadow-md py-4 px-12 flex items-center justify-between">
      <img src="/Logo.svg" alt="Financy" className="w-25" />
      <div className="flex gap-5">
        <LinkHeader path="/dashboard" currentPage={currentPage}>
          Dashboard
        </LinkHeader>
        <LinkHeader path="/transactions" currentPage={currentPage}>
          Transações
        </LinkHeader>
        <LinkHeader path="/categories" currentPage={currentPage}>
          Categorias
        </LinkHeader>
      </div>
      <Link to="/profile">
        <Avatar>
          <AvatarFallback className="bg-gray-300 text-gray-800">
            {user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};

const LinkHeader = ({
  children,
  path,
  currentPage,
}: {
  children: React.ReactNode;
  path: string;
  currentPage: string;
}) => {
  const className = cn(
    "text-md",
    currentPage === path ? "text-brand-base font-semibold" : "font-normal text-gray-600"
  );
  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
};
