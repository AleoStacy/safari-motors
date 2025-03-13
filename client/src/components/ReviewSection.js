import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    { name: "John Doe", rating: 5, comment: "Great product!" },
    { name: "Jane Smith", rating: 4, comment: "Good quality, but shipping was slow." },
    { name: "Alex", rating: 5, comment: "Absolutely love it!" },
    { name: "Emma", rating: 3, comment: "It's okay, could be better." }
  ]);

  function getReviews(){
    fetch("http://localhost:1337/api/reviews")
     .then((response) => response.json())
     .then((data) => setReviews(data.data))
     .then((data)=>console.log("data"))
  }

  useEffect(()=>{getReviews()},[])

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState(localStorage.getItem("username") || "");

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = () => {
    if (newReview.trim() === "") return;

    const newEntry = {
      name: name || "Anonymous",
      rating: rating,
      comment: newReview
    };

    setReviews([newEntry, ...reviews]);
    setNewReview("");
    setRating(5);
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
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (reviews.length == 0){return <h1>Loading</h1>}

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