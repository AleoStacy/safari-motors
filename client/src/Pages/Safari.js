import React from "react";
import { Link } from "react-router-dom";
import "./Safari.css"; // Ensure you create this file for styling
import Footer from "../components/Footer"; // Correct path to access Footer.js
const safariDestinations = [
  {
    id: 1,
    name: "Maasai Mara",
    image: "../images/maasai-mara.jpg",
    description: "Experience the great migration and stunning wildlife.",
  },
  {
    id: 2,
    name: "Amboseli National Park",
    image: "../images/maasai-mara.jpg",
    description: "See large herds of elephants with Mount Kilimanjaro in the background.",
  },
  {
    id: 3,
    name: "Tsavo National Park",
    image: "../images/maasai-mara.jpg",
    description: "Discover the untamed wilderness of Kenya’s largest park.",
  },
  {
    id: 4,
    name: "Samburu National Reserve",
    image: "../images/maasai-mara.jpg",
    description: "Home to rare wildlife species and breathtaking landscapes.",
  },
  {
    id: 5,
    name: "Lake Nakuru National Park",
    image: "../images/maasai-mara.jpg",
    description: "Famous for flamingos and diverse birdlife.",
  },
  {
    id: 6,
    name: "Aberdare National Park",
    image: "/images/aberdare.jpg",
    description: "Mountainous landscapes and unique wildlife sightings.",
  },
  {
    id: 7,
    name: "Nairobi National Park",
    image: "/images/nairobi.jpg",
    description: "Wildlife adventure just outside Kenya’s capital city.",
  },
  {
    id: 8,
    name: "Mount Kenya National Park",
    image: "/images/mount-kenya.jpg",
    description: "Explore Africa’s second-highest mountain and its diverse ecosystems.",
  },
];

const Safari = () => {
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
          {safariDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <Link to={`/safari/${destination.id}`} className="learn-more-btn">Learn More</Link>
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
