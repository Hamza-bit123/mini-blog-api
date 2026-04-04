import React, { useEffect, useState } from "react";

const GetPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/posts/", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmdWFkQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzUzMTY1NTYsImV4cCI6MTc3NTMxODM1Nn0.w6TwkeODyysOpHcQr-gah8RSc5IOB0gJ7rOc4k_S6As",
        },
      });

      const data = await response.json();
      setPosts(data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="posts-page">
      <div className="search-bar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search articles"
        />
      </div>
      <div className="categories">
        <div className="category">All</div>
        <div className="category">Web Development</div>
        <div className="category">Backend</div>
        <div className="category">Frontend</div>
        <div className="category">JavaScript</div>
        <div className="category">Database</div>
        <div className="category">Node.js</div>
        <div className="category">React</div>
        <div className="category">DevOps</div>
        <div className="category">Programming Tips</div>
        <div className="category">Software Architecture</div>
      </div>
      <section className="posts">
        {posts &&
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              {post.image && (
                <img
                  src={`http://localhost:4000/uploads/${post.image}`}
                  alt={`${post.title}`}
                />
              )}
              <div className="post-content">
                <div className="post-title">{post.title}</div>
                <div className="tags">
                  {posts &&
                    post.tags.map((tag) => (
                      <div className="tag" key={tag}>
                        # {tag}
                      </div>
                    ))}
                </div>
                <div className="post-description">{post.content}</div>
                <div className="meta">{`By ${post.author} . ${new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}</div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default GetPosts;
