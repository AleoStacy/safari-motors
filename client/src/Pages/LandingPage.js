import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";
import aboutImage from "../images/about-image.jpg";
import mtKenya from "../images/mt-kenya.jpg";
import maasaiMara from "../images/maasai-mara.jpg";
import Diani from "../images/Diani.jpg";
import Footer from "../components/Footer"; // Correct path to access Footer.js
import Pixi from "../images/pixi.jpg";
import Elephat from "../images/Elephat.jpg"
import Antelopes from "../images/Antelopes.jpg"
import buffalo from "../images/buffalo.jpg"
import Lion from "../images/Lion.jpg"
import Ostrich from "../images/Ostrich.jpg"
import wildebeast from "../images/wildebeast.jpg"
import cheetah from "../images/cheetah.jpg"
import ReviewSection from '../components/ReviewSection';
import Partnerships from '../components/Partnerships';
import About from '../images/about-.jpg';
import animalsZ from '../images/animalsZ.jpg';
import leopard from '../images/leopard.jpg';
import runingbeast from '../images/runingbeast.jpg';
import p from '../images/p.jpg';
import redcharlie from '../images/redcharlie.jpg';
import eatingbeast from '../images/eatingbeast.jpg';
import michael from '../images/michael.jpg'
const LandingPage = () => {
  // const handleCardClick = (url) => {
  //   window.location.href = url;
  // };

  // FAQ Section State
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs,setFaqs] = useState([])
  const [loading,setLoading] = useState(true)

  function findFaqs(){
    try{
    fetch('http://localhost:1337/api/faqs')
    .then((response) => {
      if (!response.ok) {
      }
      return response.json();
    })
     .then(data => setFaqs(data.data))    
     .then(()=>setLoading(false))
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
          <Link to ="./safari">
          <button className="cta-button">Explore Now</button>
          </Link>
          {/* <button className="scnd-button">Book Now</button> */}
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <h2>What we do?</h2>
        <div className="about-container">
          <div className="about-text">
            <h1 className="para">Embark on a Tailor-Made Kenyan Safari Adventure.</h1>
            <p>At safari, we specialize in creating unforgettable customized Kenyan safaris. From the moment you contact us to the moment we bid you farewell, we ensure a seamless and personalized experience.</p>
            <h1 className="para">Unforgettable Safaris</h1>
            <p>Discover the breathtaking landscapes and wildlife of Kenya with our expert guides.</p>
            <h1 className="para">Customized Experiences</h1>
            <p>We offer personalized safaris that cater to your specific interests and preferences.</p>
            {/* < Link to="/safari">
            <button className="cta-button">Book Now</button>
            </Link> */}
          </div>         
          <div className="about-image-container">
            <img src={aboutImage} alt="Kenyan Safari" className="about-image" />
          </div>
        </div>
      </section>
{/* second About Section */}
<section className="second-about" id="about">
        <div className="second-about-container">
          <div className="second-about-text">
          <h1 className="para">Sustainable Tourism</h1>
          <p>We support eco-friendly tourism practices that benefit local communities and wildlife conservation.</p>            
            <p>Your safety is our top priority. We work with trusted and experienced guides who are knowledgeable about the local wildlife and terrain. We also provide comprehensive travel insurance to ensure peace of mind during your safari.</p>
            <p>We prioritize customer satisfaction by offering tailored safari experiences that match your adventure spirit.</p>
            <p>Kenya is home to a diverse range of wildlife, including elephants, lions, giraffes, zebras, and more. The exact animals you will see depend on the location and time of year. Our expert guides will take you to the best spots for wildlife sightings.</p>
          </div>         
          <div className="second-image-container">
            <img src={Pixi} alt="Kenyan Safari" className="about-image" />
          </div>
        </div>
      </section>
      {/* Destination Section */}
      <section className="destinations" id="destinations">
        <div className="destinations-container">
          <h2>Discover Our Amazing Destinations</h2>
          {/* <p>Explore Kenya’s most breathtaking landscapes.</p> */}
          <div className="destinations-grid">
            <div className="destination-card" > 
              <img src={maasaiMara} alt="Maasai Mara" />
              <h3>Maasai Mara</h3>
              <p>Experience the Great Migration and stunning wildlife.</p>
            </div>
            <div className="destination-card" > 
              <img src={Diani} alt="Diani Beach" />
              <h3>Diani Beach</h3>
              <p>Relax on white sandy beaches with turquoise waters.</p>
            </div>
            <div className="destination-card" > 
              <img src={mtKenya} alt="Mount Kenya" />
              <h3>Mount Kenya</h3>
              <p>Hike Africa’s second-highest mountain for breathtaking views.</p>
            </div>
          </div>
        </div>
      </section>
      {/* // Carousel Section */}
<section className="carousel-section">
  <Slider
    dots={true}
    infinite={true}
    speed={600}
    slidesToShow={3}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={2000}
  >
    <div>
      <img src={Elephat} alt="Elephant" className="carousel-image" />
    </div>
    <div>
      <img src={michael} alt="michael" className="carousel-image" />
    </div>
    <div>
      <img src={Ostrich} alt="Ostrich" className="carousel-image" />
    </div>
    <div>
      <img src={leopard} alt="leopard" className="carousel-image" />
    </div>
    <div>
      <img src={animalsZ} alt="animalsZ" className="carousel-image" />
    </div>

    <div>
      <img src={eatingbeast} alt="eatingbeast" className="carousel-image" />
    </div>
    <div>
      <img src={redcharlie} alt="redcharlie" className="carousel-image" />
    </div>
    <div>
      <img src={runingbeast} alt="runingbeast" className="carousel-image" />
    </div>
    <div>
      <img src={Antelopes} alt="Antelopes" className="carousel-image" />
    </div>
    <div>
      <img src={buffalo} alt="Buffalo" className="carousel-image" />
    </div>
    <div>
      <img src={p} alt="p" className="carousel-image" />
    </div>
    <div>
      <img src={About} alt="about-" className="carousel-image" />
    </div>
  </Slider>
</section>

      < ReviewSection/>
      <Partnerships/>
      {/* FAQ Section */}
      <section className="faq-section" id="faq">
      {!loading && (<div><h2>FAQs</h2>
        <p>Find answers to common questions about safari planning, preparation, and what to expect.</p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
              <div className="faq-question">{faq.question}</div>
              {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div></div>)} 
        
        <p>Still have questions?</p>
        < Link to ="/contacts">
        <button className="faq-button">Contact Us</button> 
        </Link>       
      </section>
{/* Image Gallery Section */}
{/* Image Gallery Section */}
<section className="image-gallery">
  <div className="gallery-container">
    <img src={Elephat} alt="Safari Moment 1" className="gallery-image" />
    <img src={Ostrich} alt="Safari Moment 2" className="gallery-image" />
    <img src={Antelopes} alt="Safari Moment 3" className="gallery-image" />
    <img src={buffalo} alt="Safari Moment 4" className="gallery-image" />
    <img src={Lion} alt="Safari Moment 5" className="gallery-image" />
    <img src={cheetah} alt="Safari Moment 6" className="gallery-image" />
    <img src={wildebeast} alt="Safari Moment 6" className="gallery-image" />
  </div>
</section>
      <Footer /> 
    </>
  );
};

export default LandingPage;
