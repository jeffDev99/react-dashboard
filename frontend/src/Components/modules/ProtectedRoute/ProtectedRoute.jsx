import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookies } from "../../../utils/config";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  let token = getCookies("Token");
  if (!!token && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to={"/dashboard"} />;
  }
  if (!token && location.pathname.startsWith("/dashboard")  ) {
    return <Navigate to={"/"} />;
  }
  return children;
}
