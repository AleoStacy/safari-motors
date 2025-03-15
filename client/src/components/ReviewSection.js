import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./ReviewSection.css";

const ReviewSection = () => {
<<<<<<< HEAD
  const [reviews, setReviews] = useState([
=======
  const [reviews,setReviews] = useState([
>>>>>>> harry-branch
    { name: "John Kiarie", rating: 5, comment: "Website looking Amazing" },
    { name: "Jane Wanjiru", rating: 4, comment: "Good quality, but I wish you would do some improvements" },
    { name: "Alex Mumbi", rating: 5, comment: "Absolutely love it!" },
    { name: "Emma Mwita", rating: 3, comment: "The trips were okay, could be better." },
    { name: "Chris Kibet", rating: 4, comment: "Nice UI/UX design." },
    { name: "Fiona Wanjiku", rating: 5, comment: "Amazing customer service." }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handleReviewClick = (review) => {
    setPopupContent(review);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  const handleAddReview = () => {
    const newReview = {
      name: newName,
      rating: parseInt(newRating),
      comment: newComment
    };

    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
    setNewName("");
    setNewRating("");
    setNewComment("");
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={index < count ? 'star-active' : 'star-inactive'} />
    ));
  };

  const getThreeReviews = () => {
    const start = currentIndex;
    const end = (start + 3) % reviews.length;

    if (end > start) {
      return reviews.slice(start, end);
    } else {
      return [...reviews.slice(start), ...reviews.slice(0, end)];
    }
  };
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (reviews.length === 0) return <h1>No reviews available</h1>;
  return (
    <div className="review-container">
      <h2 className="title">What our Customers say about us</h2>
      <div className="carousel">
        {getThreeReviews().map((review, index) => (
          <div
            key={index}
            className="review-item"
            onClick={() => handleReviewClick(review)}
          >
            <p className="reviewer-name">{review.name}</p>
            <div className="stars">{renderStars(review.rating)}</div>
            <p className="comment">"{review.comment}"</p>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{popupContent.name}</h3>
            <div className="stars">{renderStars(popupContent.rating)}</div>
            <p>{popupContent.comment}</p>
          </div>
        </div>
      )}

      {/* Add Review Button */}
      <button className="add-review-button" onClick={() => setShowReviewForm(true)}>
        Add Review
      </button>

      {/* Review Form Popup */}
      {showReviewForm && (
        <div className="review-form-popup">
          <div className="review-form">
            <h3>Add Your Review</h3>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <select 
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            >
              <option value="">Select Rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            <textarea 
              placeholder="Write your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddReview}>Submit Review</button>
            <button className="close-button" onClick={() => setShowReviewForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
