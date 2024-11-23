import React, { useState } from "react";
import "./css/Login.css";

function Login() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login Credentials:", credentials);
    // Add your login logic here
  };

  return (
    <div className="login">
      <header>
        <h1>Soo Cheek Admin</h1>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            placeholder="Enter your ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
