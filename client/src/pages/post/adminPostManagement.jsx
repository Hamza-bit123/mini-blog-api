import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";

function AdminPostManagement() {
  const [posts, setPosts] = useState(null);
  const [menu, setMenu] = useState(null);
  const [filter, setFilter] = useState({ categories: 0, search: "" });

  const menuRef = useRef(null);
  const moreBtnRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = (id) => {
    setMenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    function hideMenu() {
      setMenu(null);
    }
    function handleMouseDownOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !moreBtnRef.current.contains(e.target)
      )
        setMenu(null);
    }
    document.addEventListener("scroll", hideMenu);
    document.addEventListener("mousedown", handleMouseDownOutside);

    // fetching data from server
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/posts/", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtdWF6QG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzU1OTY1NTYsImV4cCI6MTc3NTU5ODM1Nn0.rVnLOR315Boh0hBxBqaoq9kTUJ0eL7nPHEyseuVr0ns",
        },
      });

      const data = await response.json();
      setPosts(data.data);
    };

    fetchData();

    return () => {
      document.removeEventListener("scroll", hideMenu);
      document.removeEventListener("mousedown", handleMouseDownOutside);
    };
  }, []);
  return (
    <section className="manage-posts--section">
      <div className="section--header">
        <h3 className="section--title">Manage Posts</h3>
        <button type="button" className="btn createPost--btn">
          <Icon.Plus size={20} /> Create Post
        </button>
      </div>
      <div className="section--header">
        <select
          name="categories"
          value={filter.categories}
          onChange={handleChange}
        >
          <option value={0}>All Categories</option>
          <option value={10}>Software Architecture</option>
          <option value={9}>Programming Tips</option>
          <option value={8}>DevOps</option>
          <option value={7}>React</option>
          <option value={6}>Node.js</option>
          <option value={5}>JavaScript</option>
          <option value={4}>Database</option>
          <option value={3}>Frontend</option>
          <option value={2}>Backend</option>
          <option value={1}>Web Development</option>
        </select>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search posts"
          value={filter.search}
          onChange={handleChange}
        />
      </div>
      {posts && (
        <table className="posts--table">
          <thead>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td
                  onClick={() => {
                    alert(post.id);
                  }}
                >
                  {post.title}
                </td>
                <td>{post.author}</td>
                <td>
                  {`${new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                  })}, ${new Date(post.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                  })}`}
                </td>
                <td>
                  {menu === index && (
                    <div className="action--menu" ref={menuRef}>
                      <div>
                        <Icon.EyeSlash /> View
                      </div>
                      <div>
                        <Icon.PencilSquare /> Edit
                      </div>
                      <div>
                        <Icon.Trash /> Delete
                      </div>
                    </div>
                  )}

                  <Icon.ThreeDots
                    className={menu === index ? "more-btn active" : "more-btn"}
                    onClick={() => {
                      handleClick(index);
                    }}
                    ref={moreBtnRef}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default AdminPostManagement;
