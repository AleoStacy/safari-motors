import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import giraffe from "../images/giraffe.jpg";
import Footer from "../components/Footer"; // Correct path to access Footer.js
function Readmore() {
  const { id } = useParams();
  const [{ data: event, error, status }, setEvent] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getSafari();
  }, [id]);

  async function getSafari() {
    try {
      const response = await fetch(
        `http://localhost:1337/api/safari-destinations/${id}?populate=*`
      );
      const event = await response.json();

      if (response.ok) {
        setEvent({ data: event.data, error: null, status: "resolved" });
      }
    } catch (err) {
      setEvent({ data: null, error: err.message, status: "rejected" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
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
          <h1>{event.name}</h1>
          <h2>{event.description}</h2>
        </div>
      </div>

      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <h3>PERSONAL INFORMATION</h3>
        <p>Ready for an epic adventure? Fill out the form below to kickstart your unforgettable journey with Us!</p>

        <label>Title*</label>
        <select>
          <option>Mr</option>
          <option>Mrs</option>
          <option>Miss</option>
          <option>Dr</option>
        </select>

        <label>First Name*</label>
        <input type="text" placeholder="First Name" required />

        <label>Last Name*</label>
        <input type="text" placeholder="Last Name" required />

        <label>Email*</label>
        <input type="email" placeholder="Email" required />

        <label>Phone (incl. country code)</label>
        <input type="tel" placeholder="+254" />

        <label>Country of Residence*</label>
        <select>
          <option>Kenya</option>
          <option>Uganda</option>
          <option>Tanzania</option>
          <option>South Africa</option>
        </select>

        <h3>Booking information</h3>
        <textarea placeholder="Select lodges or experiences you are interested in..." rows="4"></textarea>

        <label>Travel dates from*</label>
        <input type="date" required />

        <label>Number of nights*</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>

        <label>Budget per person for the holiday (Ksh)*</label>
        <select>
          <option>50,000 - 100,000</option>
          <option>100,000 - 200,000</option>
          <option>200,000 - 500,000</option>
          <option>500,000+</option>
        </select>

        <label>How did you hear about us?</label>
        <select>
          <option>Social Media</option>
          <option>Google Search</option>
          <option>Friend Recommendation</option>
          <option>Other</option>
        </select>

        <h3>GUEST INFORMATION</h3>
        <label>No. of Adults (Age 16yrs +)*</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>

        <label>No. of Children (Age 0 to 15yrs)</label>
        <select>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>

        <h3>ADDITIONAL INFORMATION</h3>
        <textarea placeholder="Any special requests, medical conditions, or special interests..." rows="5"></textarea>

        <br />
        <button type="submit">Submit Booking</button>
      </form>

      {showPopup && (
        <div className="popup">Perfect! We will get back to you as soon as we complete the booking.</div>
      )}
< Footer/>
      <style jsx>{`
        form {
          width: 100%;
          max-width: 800px;
          margin: auto;
          padding: 30px;
          // background-color: #f9f9f9;
          // border-radius: 15px;
          font-family: "Quicksand", sans-serif;
          outline:none;
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
          // border-radius: 8px;
          outline:none;

        }

        button {
          padding: 12px 25px;
          background-color: #8B4513;
          color: white;
          border: none;
          // border-radius: 8px;
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

export default Readmore;