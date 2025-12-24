import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home";
import { LayoutAuth } from "./Layout/LayoutAuth";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Auth/Signup";
import { LayoutDefault } from "./Layout/LayoutDefault";
import { Category } from "./pages/Category";
import { Transaction } from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutDefault,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/signup",
    Component: LayoutDefault,
    children: [
      {
        index: true,
        Component: Signup,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: LayoutAuth,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/profile",
    Component: LayoutAuth,
    children: [
      {
        index: true,
        Component: Profile,
      },
    ],
  },
  {
    path: "/categories",
    Component: LayoutAuth,
    children: [
      {
        index: true,
        Component: Category,
      },
    ],
  },
  {
    path: "/transactions",
    Component: LayoutAuth,
    children: [
      {
        index: true,
        Component: Transaction,
      },
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}