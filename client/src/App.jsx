import "./App.css";
import "./style/style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/authentication/login";
import Registration from "./pages/authentication/registration";
import CreatePost from "./pages/post/createPost";
import GetPosts from "./pages/post/getPosts";
import GetPost from "./pages/post/getPost";
import Home from "./pages/home";
import SideNav from "./components/sideNav";
import AdminPostManagement from "./pages/post/adminPostManagement";
import Layout from "./pages/layout";
import ProtectedLayout from "./components/protectedLayout";
import UserDashboard from "./pages/dashBoard/userDashboard";
import GetMyPosts from "./pages/post/getMyPosts";
import Tyr from "./tyr";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/posts">
          <Route index element={<GetPosts />} />
          <Route path=":id" element={<GetPost />} />
          <Route path="me" element={<GetMyPosts />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="try" element={<Tyr />} />
        </Route>
      </Route>
      {/* <section className="content_section"> */}
      {/* <Registration /> */}
      {/* <Login /> */}
      {/* <CreatePost /> */}
      {/* <GetPosts /> */}
      {/* <GetPost /> */}
      {/* <UserDashboard /> */}
      {/* <Home /> */}
      {/* <SideNav /> */}
      {/* <AdminPostManagement /> */}
      {/* <Layout /> */}
      {/* </section> */}
    </Routes>
  );
}

export default App;
