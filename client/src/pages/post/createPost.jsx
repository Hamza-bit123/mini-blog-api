import React, { useState } from "react";
import "./createPost.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/popup";
import { RefreshToken } from "../../api/refreshToken";

function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tag: "",
    content: "",
  });
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");
    const tags = formData.tag && formData.tag.split(",");

    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("category_id", formData.category);
    tags.forEach((tag) => formdata.append("tags", tag));
    formdata.append("image", image);
    formdata.append("content", formData.content);

    let response = await fetch("http://localhost:4000/api/posts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });

    if (response.status === 401 || response.status === 403) {
      token = RefreshToken().accessToken;

      response = await fetch("http://localhost:4000/api/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
    }
    const data = await response.json();
    if (data.success) {
      setMessage(data.message);
      setTimeout(() => {
        navigate("/posts/me");
      }, 1000);
    } else console.log(data.error);
  };

  const handlChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex_vertical--container">
      <div className="back--btn">
        <Icon.ArrowLeftSquareFill
          onClick={() => {
            navigate(-1);
          }}
        />
        <span>Back</span>
      </div>

      <h3 className="container--title">Write a New Post</h3>

      <form onSubmit={handleSubmit}>
        <div className="input_wrapper">
          <label htmlFor="title">post Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            id="title"
            value={formData.title}
            onChange={handlChange}
            required
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handlChange}
            required
          >
            <option value="">Select Category</option>
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
        </div>
        <div className="input_wrapper">
          <label htmlFor="tag">Tags</label>
          <input
            type="text"
            name="tag"
            id="tag"
            value={formData.tag}
            onChange={handlChange}
            placeholder="Enter tags separated by comma"
            required
          />
          <div className="tags">
            <span>#javascript</span>
            <span>#website</span>
            <span>#tutorial</span>
          </div>
        </div>
        <div className="input_wrapper">
          <label htmlFor="">Post Image</label>
          <label htmlFor="postImage" className="imageSelector">
            {preview ? (
              <img src={preview} alt="preview" width="300px" />
            ) : (
              <div>
                <Icon.CardImage size={60} />
                <p>Upload image Drag & Drop or choose file</p>
              </div>
            )}
          </label>
          <input
            type="file"
            name="image"
            id="postImage"
            accept="jpeg,jpg, png, webp"
            onChange={handleImage}
          />
          {image && <span className="url">file: {image.name}</span>}
        </div>
        <div className="input_wrapper">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Write yoour article here ..."
            rows={15}
            value={formData.content}
            onChange={handlChange}
            required
          ></textarea>
        </div>
        <div className="form__buttons">
          <button type="button" className="preview--btn">
            Preview
          </button>
          <button type="submit">Publish Post</button>
        </div>
      </form>
      {message && <Popup message={message} />}
    </div>
  );
}

export default CreatePost;
