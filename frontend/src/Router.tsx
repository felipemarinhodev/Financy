import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home";
import { LayoutAuth } from "./Layout/LayoutAuth";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Auth/Signup";
import { LayoutDefault } from "./Layout/LayoutDefault";

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
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}