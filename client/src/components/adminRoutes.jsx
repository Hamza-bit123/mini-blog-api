import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function AdminRoutes({ children }) {
  const { user, loading } = useContext(UserContext);
  if (loading) return <div>Loading</div>;
  if (user?.role !== "admin") return <Navigate to="/" />;
  return children;
}

export default AdminRoutes;
