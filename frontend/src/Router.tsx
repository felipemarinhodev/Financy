import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home";
import { LayoutAuth } from "./Layout/LayoutAuth";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
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