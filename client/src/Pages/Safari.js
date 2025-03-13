import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Safari.css"; // Ensure you create this file for styling
import Footer from "../components/Footer"; // Correct path to access Footer.js
import booking from "../Pages/Booking"; // Correct path to access booking.json

const Safari = () => {

  const[safaris,setSafaris]=useState([])
  
  function getSafaris(){
    fetch(`http://localhost:1337/api/safari-destinations?populate=image`)
    .then(response=>response.json())
    .then(data=>setSafaris(data.data))
    .then(data=>console.log(data))

  }
 
  useEffect(()=>{getSafaris()},[])

  return (
    <>
    <div className="safari-container">
      {/* Safari Introduction Section */}
      <section className="safari-intro">
        <h1>Explore the Wild Safari Adventures</h1>
        <p>
          Discover Kenya's breathtaking landscapes and rich wildlife. From the great migration 
          in Maasai Mara to the elephant herds in Amboseli, each destination offers a unique adventure.
        <p> We have meticulously scheduled multiple departures each week, featuring a variety of itineraries and accommodations to suit different schedules and budgets. <p></p> While our scheduled safaris are designed for group travel, they can also be personalized and taken on a private basis. Opting for a private safari allows for more flexibility with your travel dates and ensures a more intimate experience, albeit at a slightly higher cost. Availability for these private safaris is dependent on accommodation options at your chosen time.</p> 
<p> Many of our scheduled safaris are parts of larger adventures that can be tailored to create a comprehensive Kenyan experience. Our safaris are led by knowledgeable, bilingual driver-guides, making them accessible to guests from all corners of the globe. This diversity offers a unique cultural exchange and the chance to forge friendships with fellow travelers from different backgrounds, all while enjoying the unparalleled beauty of Kenya.</p>

<p> To accommodate travel schedules, some of our safari programs include an initial overnight stay in Nairobi at the start of the journey. For others, an additional night's stay in Nairobi can be arranged at extra cost, ensuring a seamless and comfortable start or end to your thrilling Kenyan adventure with Thrills and Spills Tours.</p>
        </p>
      </section>

      {/* Safari Destinations Section */}
      <section className="safari-destinations">
        <h2> Our Safaris</h2>
        <div className="destinations-grid">
        {safaris.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image.url} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <Link to={`⁠/safari/${destination.id}⁠`} className="learn-more-btn">Learn More</Link>
            </div>
          ))}

        </div>
      </section>
    </div>
    < Footer />
    </>
  );
};

export default Safari;
