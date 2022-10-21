import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/:username",
        element: <Profile />
    }
]);

export const Router = () => (
    <RouterProvider router={router} />
)