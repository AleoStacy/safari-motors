import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews,setReviews] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");

  function getReviews(){
    setLoading(true);
    fetch("https://safari-motors-production.up.railway.app/api/reviews")
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
    const newReview = {data:{
      name: newName,
      rating: parseInt(newRating),
      comment: newComment
    }};
   
    
    

    fetch("https://safari-motors-production.up.railway.app/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReview)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      setShowReviewForm(false);
      getReviews()
      setNewName("");
      setNewRating("");
      setNewComment("");
      
    })
    .catch(error => {
      console.error("Submission error:", error);
      setError(error.message);
      
    });

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
