import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({ ...prv, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data, response.status);
  };
  return (
    <div className="auth_container">
      <div className="auth_left">
        <div className="image">
          <img src="../assets/logo.png" alt="logo" width={50} />
        </div>
        <h2 className="auth_left--title">MiniBlog</h2>
        <p className="auth_left--description description">
          Write stories, share ideas, and explore blogs from developers around
          the world.
        </p>
      </div>
      <div className="auth_form_container">
        <form action="" className="login_form" onSubmit={handleSubmit}>
          <h3 className="form--title">Login to your Account</h3>
          <div className="auth--input_wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="auth--input_wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button type="submit">Login</button>
          <a href="./registration.jsx">or create a new account</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
