import "./App.css";
import "./style/style.css";
import Login from "./pages/authentication/login";
import Registration from "./pages/authentication/registration";
import CreatePost from "./pages/post/createPost";
import GetPosts from "./pages/post/getPosts";
import GetPost from "./pages/post/getPost";

function App() {
  return (
    <section className="content_section">
      {/* <Registration /> */}
      {/* <Login /> */}
      {/* <CreatePost /> */}
      {/* <GetPosts /> */}
      <GetPost />
    </section>
  );
}

export default App;
