import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">Safari Motors</div>
      <ul className="nav-links">
        <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
        <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/gallery">Safari</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;
