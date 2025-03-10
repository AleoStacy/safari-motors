import React from "react";
import "./Contacts.css"; // Ensure this file is created
import Footer from "../components/Footer"; // Correct path to access Footer.js
const Contact = () => {
  return (
    <>
    <div className="contact-page">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Fill in the form below, and we’ll get back to you.</p>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
