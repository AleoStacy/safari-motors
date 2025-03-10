import React from "react";
import "./Footer.css"; // Ensure this file is properly linked
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          
          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><Link to="/safari">Destinations</Link></li>
              <li><a href="#faq">FAQs</a></li>
              <li><Link to="/contacts">Contact</Link></li>
              
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Nairobi, Kenya</p>
            <p>+254 700 123 456</p>
            <p>info@safarimotors.com</p>
          </div>

          {/* Social Media Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Safari Motors. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
