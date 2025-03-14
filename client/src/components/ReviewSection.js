import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState("");

  function getReviews(){
    setLoading(true);
    fetch("http://localhost:1337/api/reviews")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      });

    
  }

  useEffect(() => {getReviews()  }, []);

  const handleNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "") return;
    
   

   
    const reviewData = {
      data: {
        name: name || "Anonymous",
        rating: rating,
        comment: newReview
      }
    };

    fetch("http://localhost:1337/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      getReviews();
      setNewReview("");
      setRating(5);
      
    })
    .catch(error => {
      console.error("Submission error:", error);
      setError(error.message);
      
    });
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem("username", newName);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`star ${index < count ? 'star-active' : 'star-inactive'}`} />
    ));
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, reviews.length]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (reviews.length === 0) return <h1>No reviews available</h1>;

  return (
    <div className="review-container">
      <h2 className="title">Customer Reviews</h2>
      <div className="carousel">
        <button onClick={handlePrev} className="nav-button">&#9664;</button>
        <div className="review-item fade-in">
          <p className="reviewer-name">{reviews[currentIndex].name}</p>
          <div className="stars">{renderStars(reviews[currentIndex].rating)}</div>
          <p className="comment">"{reviews[currentIndex].comment}"</p>
        </div>
        <button onClick={handleNext} className="nav-button">&#9654;</button>
      </div>
      <div className="write-review-section">
        <h3 className="subtitle">Write a Review</h3>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="name-input"
        />
        <textarea
          className="textarea"
          rows="4"
          placeholder="Share your experience..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-select"
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{`${star} Stars`}</option>
          ))}
        </select>
        <button onClick={handleSubmit} className="submit-button">Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewSection;