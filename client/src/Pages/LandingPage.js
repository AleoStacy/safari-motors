import React, { useState,useEffect } from "react";
import "./LandingPage.css";
import aboutImage from "../images/about-image.jpg";
import mtKenya from "../images/mt-kenya.jpg";
import maasaiMara from "../images/maasai-mara.jpg";
import Diani from "../images/Diani.jpg";
import Footer from "../components/Footer"; // Correct path to access Footer.js
const LandingPage = () => {
  const handleCardClick = (url) => {
    window.location.href = url;
  };

  // FAQ Section State
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs,setFaqs] = useState([])

  function findFaqs(){
    try{
    fetch('http://localhost:1337/api/faqs')
     .then(response => response.json())
     .then(data => setFaqs(data.data))
     .then(console.log(faqs))
    
    }

    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{findFaqs()},[])

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="landing-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="first-heading">Experience the Thrills <br /> of Kenyan Safaris</h1>
          <p className="paragraph">Book your dream safari experience today <br /> and embark on an unforgettable adventure.</p>
          <button className="cta-button">Explore Now</button>
          <button className="scnd-button">Book Now</button>
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <h2>What we do?</h2>
        <div className="about-container">
          <div className="about-text">
            <h1 className="para">Embark on a Tailor-Made Kenyan Safari Adventure.</h1>
            <p>At Thrills and Spills, we specialize in creating unforgettable customized Kenyan safaris. From the moment you contact us to the moment we bid you farewell, we ensure a seamless and personalized experience.</p>
            <h1 className="para">Unforgettable Safaris</h1>
            <p>Discover the breathtaking landscapes and wildlife of Kenya with our expert guides.</p>
            <h1 className="para">Customized Experiences</h1>
            <p>We offer personalized safaris that cater to your specific interests and preferences.</p>
            <button className="cta-button">Book Now</button>
          </div>
          <div className="about-image-container">
            <img src={aboutImage} alt="Kenyan Safari" className="about-image" />
          </div>
        </div>
      </section>

      {/* Destination Section */}
      <section className="destinations" id="destinations">
        <div className="destinations-container">
          <h2>Discover Our Amazing Destinations</h2>
          <p>Explore Kenya’s most breathtaking landscapes.</p>
          <div className="destinations-grid">
            <div className="destination-card" onClick={() => handleCardClick("https://en.wikipedia.org/wiki/Maasai_Mara")}> 
              <img src={maasaiMara} alt="Maasai Mara" />
              <h3>Maasai Mara</h3>
              <p>Experience the Great Migration and stunning wildlife.</p>
            </div>
            <div className="destination-card" onClick={() => handleCardClick("https://en.wikipedia.org/wiki/Diani_Beach")}> 
              <img src={Diani} alt="Diani Beach" />
              <h3>Diani Beach</h3>
              <p>Relax on white sandy beaches with turquoise waters.</p>
            </div>
            <div className="destination-card" onClick={() => handleCardClick("https://en.wikipedia.org/wiki/Mount_Kenya")}> 
              <img src={mtKenya} alt="Mount Kenya" />
              <h3>Mount Kenya</h3>
              <p>Hike Africa’s second-highest mountain for breathtaking views.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <h2>FAQs</h2>
        <p>Find answers to common questions about safari planning, preparation, and what to expect.</p>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
              <div className="faq-question">{faq.question}</div>
              {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
        <p>Still have questions?</p>
        <p>Contact us for more information</p>
        <button className="faq-button">Contact Us</button>
      </section>
      <Footer /> 
    </>
  );
};

export default LandingPage;
