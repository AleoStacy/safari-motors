import React, { useState } from "react";
import "./Login.css"; 
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/auth/forgot-password", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setMessage("Email successfully sent. Check your inbox and or spam to reset your password.");
      } else {
        const errorData = await response.json();
        setError(errorData.error.message || "Failed to send email. Please try again.");
        //console.log(errorData.error.message)
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
   
        <h2 >Forgot Password</h2>
        <p >Enter your email to receive a reset link</p>

        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p >{message}</p>}
        {error && <p c>{error}</p>}
      </div>
   
    </div>
  );
}

export default ForgotPassword;
