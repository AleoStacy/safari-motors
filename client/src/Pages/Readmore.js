import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import giraffe from "../images/giraffe.jpg";
import Footer from "../components/Footer";
import Pixi from "../images/pixi.jpg";

function TripDetails() {
  const { id } = useParams();
  const [{ data: event, error, status }, setEvent] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
 
  
  
  const [formData, setFormData] = useState({
    title: "Mr",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    country: "Kenya",
    booking_information: "",
    travel_date_from: "",
    number_of_nights: 1,
    budget_per: "50,000 - 100,000",
    how_did_you_find_us: "Social Media",
    adults: 1,
    children: 0,
    additional_information: "",
    safari_destination: null
  });

  useEffect(() => {
    getSafari();
  }, [id]);

  async function getSafari() {
    try {
      const response = await fetch(
        `https://safari-motors-production.up.railway.app/api/safari-destinations/${id}?populate=*`
      );
      const event = await response.json();

      if (response.ok) {
        setEvent({ data: event.data, error: null, status: "resolved" });
        setFormData(prevState => ({
          ...prevState,
          safari_destination: id // Use the ID directly for the relation
        }));
      }

    } catch (err) {
      setEvent({ data: null, error: err.message, status: "rejected" });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
//console.log(event)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
   

    try {
      const response = await fetch("https://safari-motors-production.up.railway.app/api/safari-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        
        setFormData({
          title: "Mr",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          country: "Kenya",
          booking_information: "",
          travel_date_from: "",
          number_of_nights: 1,
          budget_per: "50,000 - 100,000",
          how_did_you_find_us: "Social Media",
          adults: 1,
          children: 0,
          additional_information: "",
          safari_destination: id
        });
      } else {
        setFormError(result.error?.message || "Failed to submit booking");
      }
    } catch (err) {
      setFormError(err.message || "An error occurred when submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "pending") return <p className="loading">Loading event details...</p>;
  if (status === "rejected") return <p className="error">⚠️ Error: {error}</p>;

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="image-container">
        <img
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
          src={giraffe}
          alt="Giraffe Safari"
        />
        <div className="text-overlay">
          <h1>{event.attributes?.name}</h1>
          <h2>{event.attributes?.description}</h2>
        </div>
      </div>
      
      {formError && (
        <div className="error-message" style={{ color: "red", margin: "10px 0" }}>
          {formError}
        </div>
      )}
      
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <h3>PERSONAL INFORMATION</h3>
        <p>Ready for an epic adventure? Fill out the form below to kickstart your unforgettable journey with Us!</p>

        <label htmlFor="title">Title*</label>
        <select 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange}
        >
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <label htmlFor="first_name">First Name*</label>
        <input 
          type="text" 
          id="first_name" 
          name="first_name" 
          placeholder="First Name" 
          value={formData.first_name} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="last_name">Last Name*</label>
        <input 
          type="text" 
          id="last_name" 
          name="last_name" 
          placeholder="Last Name" 
          value={formData.last_name} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="email">Email*</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="phone_number">Phone (incl. country code)</label>
        <input 
          type="tel" 
          id="phone_number" 
          name="phone_number" 
          placeholder="+254" 
          value={formData.phone_number} 
          onChange={handleChange} 
        />

        <label htmlFor="country">Country of Residence*</label>
        <select 
          id="country" 
          name="country" 
          value={formData.country} 
          onChange={handleChange}
        >
          <option value="Kenya">Kenya</option>
          <option value="Uganda">Uganda</option>
          <option value="Tanzania">Tanzania</option>
          <option value="South Africa">South Africa</option>
        </select>

        <h3>Booking information</h3>
        <textarea 
          id="booking_information" 
          name="booking_information" 
          placeholder="Select lodges or experiences you are interested in..." 
          rows="4" 
          value={formData.booking_information} 
          onChange={handleChange}
        ></textarea>

        <label htmlFor="travel_date_from">Travel dates from*</label>
        <input 
          type="date" 
          id="travel_date_from" 
          name="travel_date_from" 
          value={formData.travel_date_from} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="number_of_nights">Number of nights*</label>
        <select 
          id="number_of_nights" 
          name="number_of_nights" 
          value={formData.number_of_nights} 
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>

        <label htmlFor="budget_per">Budget per person for the holiday (Ksh)*</label>
        <select 
          id="budget_per" 
          name="budget_per" 
          value={formData.budget_per} 
          onChange={handleChange}
        >
          <option value="50,000 - 100,000">50,000 - 100,000</option>
          <option value="100,000 - 200,000">100,000 - 200,000</option>
          <option value="200,000 - 500,000">200,000 - 500,000</option>
          <option value="500,000+">500,000+</option>
        </select>

        <label htmlFor="how_did_you_find_us">How did you hear about us?</label>
        <select 
          id="how_did_you_find_us" 
          name="how_did_you_find_us" 
          value={formData.how_did_you_find_us} 
          onChange={handleChange}
        >
          <option value="Social Media">Social Media</option>
          <option value="Google Search">Google Search</option>
          <option value="Friend Recommendation">Friend Recommendation</option>
          <option value="Other">Other</option>
        </select>

        <h3>GUEST INFORMATION</h3>
        <label htmlFor="adults">No. of Adults (Age 16yrs +)*</label>
        <select 
          id="adults" 
          name="adults" 
          value={formData.adults} 
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>

        <label htmlFor="children">No. of Children (Age 0 to 15yrs)</label>
        <select 
          id="children" 
          name="children" 
          value={formData.children} 
          onChange={handleChange}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </select>

        <h3>ADDITIONAL INFORMATION</h3>
        <textarea 
          id="additional_information" 
          name="additional_information" 
          placeholder="Any special requests, medical conditions, or special interests..." 
          rows="5" 
          value={formData.additional_information} 
          onChange={handleChange}
        ></textarea>

 {showPopup && (
        <div className="popup">Perfect! We will get back to you as soon as we complete the booking.</div>
      )}
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

     
      <Footer />

      <style jsx>{`
        form {
          width: 100%;
          max-width: 800px;
          margin: auto;
          padding: 30px;
          font-family: "Quicksand", sans-serif;
          outline: none;
        }

        .image-container {
          position: relative;
          text-align: center;
          color: white;
          font-family: "Quicksand", sans-serif;
        }

        .text-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input, select, textarea {
          width: 100%;
          margin-bottom: 20px;
          padding: 12px;
          border: 1px solid #ddd;
          outline: none;
        }

        button {
          padding: 12px 25px;
          background-color: #8B4513;
          color: white;
          border: none;
          cursor: pointer;
        }

        button:hover {
          background-color: #8B4513;
        }

        .popup {
          margin-top: 20px;
          padding: 15px;
          background-color: #8B4513;
          color: white;
          border-radius: 10px;
          text-align: center;
        }

        @media (max-width: 600px) {
          form {
            padding: 15px;
          }

          input, select, textarea {
            font-size: 14px;
            padding: 10px;
          }

          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default TripDetails;
