import React from "react";
import { useParams } from "react-router-dom";
import "./Booking.css"; // Linking the CSS file

const Booking = () => {
  const { id } = useParams(); // Getting the destination id from the URL

  return (
    <div className="booking-page">
      <h2>PERSONAL INFORMATION</h2>
      <p>To start your journey, please complete the form below.</p>

      <form>
        <label>Title*</label>
        <select>
          <option>Select</option>
          <option>Mr</option>
          <option>Mrs</option>
          <option>Miss</option>
        </select>

        <input type="text" placeholder="First Name*" required />
        <input type="text" placeholder="Last Name*" required />
        <input type="email" placeholder="Email*" required />
        <input type="tel" placeholder="Phone (incl. country code)" />
        <input type="text" placeholder="Country of Residence*" required />

        <label>Booking Information*</label>
        <select multiple>
          <option>Giraffe Manor</option>
          <option>Solio Lodge</option>
          <option>Sasaab</option>
          <option>Sala's Camp</option>
          <option>Helicopter Safari</option>
          <option>Beach and Bush</option>
        </select>

        <label>Travel Dates From*</label>
        <input type="date" required />

        <label>Number of Nights*</label>
        <select>
          <option>Select</option>
          <option>1-3 Nights</option>
          <option>4-7 Nights</option>
          <option>8+ Nights</option>
        </select>

        <label>Budget per person*</label>
        <select>
          <option>Select</option>
          <option>$500-$1000</option>
          <option>$1000-$3000</option>
          <option>$3000-$5000</option>
        </select>

        <label>Number of Adults (16+)*</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <label>Number of Children (0-15)</label>
        <select>
          <option>0</option>
          <option>1</option>
          <option>2</option>
        </select>

        <textarea placeholder="Any special requests or special occasion?" />

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default Booking;
