import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./getPost.css";
import { ArrowLeftSquareFill, Share } from "react-bootstrap-icons";
import { fetchWithAuth } from "../../api/api";
import { UserContext } from "../../context/userContext";
import * as Icon from "react-bootstrap-icons";

function GetPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const dialogRef = useRef(null);

  const handleClick = () => {
    dialogRef.current.showModal();
  };

  useEffect(() => {
    const fechData = async () => {
      const response = await fetchWithAuth(
        `http://localhost:4000/api/posts/${id}`,
      );
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      } else {
        alert(data.error);
        navigate("/posts");
      }
    };

    fechData();
  }, [id, navigate]);
  return (
    post && (
      <div className="post-container">
        <div className="back--btn">
          <ArrowLeftSquareFill
            onClick={() => {
              navigate(-1);
            }}
          />
          <span>Back</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="meta">{`By ${post.author} . ${new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}</div>
        <div className="category">{post.category}</div>
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
        {user?.id === post.author_id && (
          <div className="actions-buttons">
            <button type="button" className="edit--btn">
              <Icon.VectorPen />
              Edit
            </button>
            <button type="button" className="delete--btn" onClick={handleClick}>
              <Icon.Trash3Fill />
              Delete
            </button>
          </div>
        )}
        <div className="share">
          <Share />
          <button>facebook</button>
          <button>twitter</button>
          <button>linkedin</button>
        </div>

        <dialog className="delete--post-dialog" ref={dialogRef}>
          <form action="dialog">
            <span>are your sure you want to delete this post?</span>
            <div className="buttons">
              <button type="button" className="cancel">
                Cancel
              </button>
              <button type="button" className="no">
                No
              </button>
              <button type="submit" className="yes">
                Yes
              </button>
            </div>
          </form>
        </dialog>
      </div>
    )
  );
}

export default GetPost;
