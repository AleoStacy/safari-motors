import {React,useState} from "react";
import { Link,useNavigate,useOutletContext  } from "react-router-dom";
import "./Login.css"; // Ensure this file is create
import Footer from "../components/Footer"; // Correct path to access Footer.js
const Login = () => {
  const navigate = useNavigate();
  let [onLogin,user,check_session] = useOutletContext();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://safari-motors-production.up.railway.app/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier: username,  
          password: password 
        }),
      });
      
      
      
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error.message)
        throw new Error(errorData.error || "Login failed");
      }
  
      const responseData = await response.json();
        console.log(await responseData)
      const token = responseData.jwt; 
  
      if (token) {
        localStorage.setItem("jwt", token); 
        const userdata = await check_session(token);  
        await userdata
        navigate("/");
      }
    } catch (error) {
      console.log("apiError", { message: error });
    }
  };

  return (
    <>
    <div className="login-page">
      <div className="login-box">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <p>username</p>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p>Password</p>
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="signup-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
