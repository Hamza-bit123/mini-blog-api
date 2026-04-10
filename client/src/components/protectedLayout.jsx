import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./sideNav";
import { UserContext } from "../context/userContext";

function ProtectedLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log("error from protected: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <section className="layout">
        <SideNav />
        <Outlet />
      </section>
    </UserContext.Provider>
  );
}

export default ProtectedLayout;
