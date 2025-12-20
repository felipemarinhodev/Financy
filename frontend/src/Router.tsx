import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home";
import { LayoutAuth } from "./Layout/LayoutAuth";
import { Dashboard } from "./pages/Dashboard";

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
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}