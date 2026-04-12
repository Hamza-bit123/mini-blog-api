import "./App.css";
import "./style/style.css";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/authentication/login";
import Registration from "./pages/authentication/registration";
import CreatePost from "./pages/post/createPost";
import GetPosts from "./pages/post/getPosts";
import GetPost from "./pages/post/getPost";
import Home from "./pages/home";
import AdminPostManagement from "./pages/post/adminPostManagement";
import ProtectedLayout from "./components/protectedLayout";
import UserDashboard from "./pages/dashBoard/userDashboard";
import GetMyPosts from "./pages/post/getMyPosts";
import AdminDashboard from "./pages/dashBoard/adminDashboard";
import AdminRoutes from "./components/adminRoutes";
import DashboardRedirect from "./components/dashboarRedirect";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/" element={<DashboardRedirect />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/posts">
          <Route index element={<GetPosts />} />
          <Route path=":id" element={<GetPost />} />
          <Route path="me" element={<GetMyPosts />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="create/:id" element={<CreatePost />} />
          <Route path="management" element={<AdminPostManagement />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <AdminDashboard />
            </AdminRoutes>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
