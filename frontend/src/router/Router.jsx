import { Navigate } from "react-router-dom";
// layout components
import Dashboard from "../Layout/Dashboard/Dashboard";
import Auth from "../Layout/Auth/Auth";
// Dashboard Components
import Product from "../pages/Product/Product";
import NotFound from "../pages/NotFound/NotFound";
// Auth Components
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
// protected Component
import ProtectedRoute from "../Components/modules/ProtectedRoute/ProtectedRoute";

let routes = [
  // dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to={"product"} /> },
      { path: "product", element: <Product /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Auth
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Auth />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to={"/login"} /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  //   not found
  { path: "*", element: <NotFound /> },
];
export default routes;
