import React from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function Posts({ props }) {
  const { posts, type } = props;
  const navigate = useNavigate();

  return (
    <section className="posts">
      {posts &&
        posts.map((post) => (
          <div
            className="post-card"
            key={post.id}
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
          >
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

              {type === "all" && (
                <div className="meta">{`By ${post.author} . ${new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}</div>
              )}
            </div>
          </div>
        ))}
    </section>
  );
}

export default Posts;
