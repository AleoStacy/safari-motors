import React,{useState} from "react";
import { Link,useNavigate,useOutletContext } from "react-router-dom";
import "./SignUp.css"; // Ensure this file is created
import Footer from "../components/Footer"; // Correct path to access Footer.js
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Public");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [onLogin, user, check_session] = useOutletContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

   
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          email, 
          password,
          
          
        }),
      });
  
      const data = await response.json();
      const token = await data.jwt
      console.log(await token)
      
      if (data.error) {
        console.error(data.error);
        setError(data.error.message || "Registration failed. Please try again.");
        return;
      }
  
     
      if (token) {
        localStorage.setItem("jwt", token);
        const userdata = await check_session(token);  
        await userdata
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <>
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <p>username</p>
          <input type="text" 
          placeholder="username"
           required
            value={username} 
           onChange={(e) => setUsername(e.target.value)} />
          <p>Email</p>
          <input type="email"
           placeholder="Email"
            required
            value={email}  
            onChange={(e) => setEmail(e.target.value)}/>
          <p>Password</p>
          <input type="password" 
          placeholder="Password" 
          required 
          value={password}
           onChange={(e) => setPassword(e.target.value)}/>
          Confirm Password
          <input type="password" 
          placeholder="Confirm Password" 
          required  
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}/>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Signup;