// import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"; // Ensure this file is created

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form>
          <p>Full Name</p>
          <input type="text" placeholder="Full Name" required />
          <p>Email</p>
          <input type="email" placeholder="Email" required />
          <p>Password</p>
          <input type="password" placeholder="Password" required />
          Confirm Password
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
