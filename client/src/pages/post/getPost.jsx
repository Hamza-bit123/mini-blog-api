import React, { useEffect, useState } from "react";

function GetPost() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fechData = async () => {
      const response = await fetch("http://localhost:4000/api/posts/8", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmdWFkQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzUzMTc2NjIsImV4cCI6MTc3NTMxOTQ2Mn0.5HTVlI_JSH5OhoN7KtPYxJlukpFW3pReGNSoKOLDBw4",
        },
      });

      const data = await response.json();
      setPost(data.data);
    };

    fechData();
  }, []);
  return (
    post && (
      <div className="post-container">
        <div className="category">{post.category}</div>
        <h1 className="post-title">{post.title}</h1>
        <div className="meta">{`By ${post.author} . ${new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}</div>
        {post.image && (
          <img
            src={`http://localhost:4000/uploads/${post.image}`}
            alt={post.title}
          />
        )}
        <div className="content">{post.content}</div>
        <div className="tags">
          {post.tags.map((tag) => (
            <div className="tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div className="share">
          <button>facebook</button>
          <button>twitter</button>
          <button>linkedin</button>
        </div>
      </div>
    )
  );
}

export default GetPost;
