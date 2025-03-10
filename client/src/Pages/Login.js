import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure this file is created

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <p>Email</p>
          <input type="email" placeholder="Email" required />
          <p>Password</p>
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
