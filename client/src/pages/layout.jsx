import React from "react";
import SideNav from "../components/sideNav";
import AdminPostManagement from "./post/adminPostManagement";
import UserDashboard from "./dashBoard/userDashboard";
import GetPosts from "./post/getPosts";
import GetPost from "./post/getPost";
import CreatePost from "./post/createPost";

function Layout() {
  return (
    <div className="layout">
      <SideNav />
      {/* <UserDashboard /> */}
      {/* <AdminPostManagement className="outlet" /> */}
      <GetPosts />
      {/* <GetPost /> */}
      {/* <CreatePost /> */}
    </div>
  );
}

export default Layout;
