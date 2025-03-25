import React,{useState} from "react";
import "./Contacts.css"; // Ensure this file is created
import Footer from "../components/Footer"; // Correct path to access Footer.js
const Contact = () => {
  const[name,setName] = useState("")
  const[email, setEmail] = useState("")
  const[message, setMessage] = useState("")
  const[error,setError] = useState("")
  const [confirmMessage,setConfirmMessage] = useState("")

  async function handleSubmit(e){
    
    e.preventDefault();
    try{
      const response = await fetch(`https://safari-motors-production.up.railway.app/api/contacts`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: { name, email, message }
        })
      })

      if (response.ok) {
        const data = await response.json();
        setConfirmMessage("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <div className="contact-page">
      <div className="contact-box">
      {error && <p >{error}</p>}
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Fill in the form below, and we’ll get back to you.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder="Full Name" 
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <input type="email"
           placeholder="Email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          <textarea placeholder="Your Message" 
          required value={message} 
          onChange={(e)=>setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        <p>{confirmMessage}</p>
      </div>
    </div>
    < Footer/>
    </>
  );
};

export default Contact;
