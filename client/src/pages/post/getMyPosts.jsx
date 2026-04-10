import React, { useState, useEffect } from "react";
import Posts from "../../components/posts";
import { fetchWithAuth } from "../../api/api";

function GetMyPosts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithAuth(
        "http://localhost:4000/api/posts/me",
      );

      const data = await response.json();
      setPosts(data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="posts-page">
      <h3 className="section--title">My Posts</h3>
      <p className="section--description">
        Manage and explore all the posts you've created in MiniBlog.
      </p>
      <div className="filter-bar">
        <select
          name="categories"
          // value={filter.categories}
          // onChange={handleChange}
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
          // value={filter.search}
          // onChange={handleChange}
        />
      </div>
      <Posts props={{ posts: posts, type: "me" }} />
    </div>
  );
}

export default GetMyPosts;
