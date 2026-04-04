import React, { useState } from "react";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tag: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tags = formData.tag && formData.tag.split(",");

    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("category_id", formData.category);
    tags.forEach((tag) => formdata.append("tags", tag));
    formdata.append("image", image);
    formdata.append("content", formData.content);

    const response = await fetch("http://localhost:4000/api/posts/create", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmdWFkQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzUyOTY1MDEsImV4cCI6MTc3NTI5ODMwMX0.tNrUbhjceBUKtLiegX69KZiHOpe_zL0_jxGALV2IMEA",
      },
      body: formdata,
    });

    const data = await response.json();
    console.log(data);
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
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handlChange}
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
              <span>Upload image Drag & Drop or choose file</span>
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
          ></textarea>
        </div>
        <div className="form__buttons">
          <button type="button" className="preview--btn">
            Preview
          </button>
          <button type="submit">Publish Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
