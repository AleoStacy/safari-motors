import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setUser, user }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate= useNavigate()
  function handleLogoutClick() {
    localStorage.removeItem("jwt");
  
    // Clear the user state in your application
    setUser(null);
    
    // Redirect to home page or login page if needed
    navigate("/");
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">Safari Motors</div>
      <ul className="nav-links">
        <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
        <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</Link></li>
        {/* <li><Link to="/services">Services</Link></li> */}
        <li><Link to="/safari">Safari</Link></li>
        <li><Link to="/contacts">Contact</Link></li>
      </ul>
      <div className="auth-links">
        {user ?
         (<Link className="login" onClick={handleLogoutClick}>Log Out</Link>):
         (<div> <Link to="/signup" className="signup">Sign Up</Link>
        <Link to="/login" className="login">Login</Link></div>)}
       
      </div>
    </nav>
  );
};

export default Navbar;
