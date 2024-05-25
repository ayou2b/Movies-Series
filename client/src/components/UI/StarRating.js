import React, { useState } from "react";

import "./StarRating.css";

const StarRating = ({ rating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    console.log(`Clicked on star ${index}`);
  };

  const renderStar = (index) => {
    const filled = index <= (hoverRating || rating);
    return (
      <span
        key={index}
        className={`star ${filled ? "filled" : ""}`}
        onMouseOver={() => handleMouseOver(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(index)}
      >
        &#9733;
      </span>
    );
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => renderStar(index + 1))}
      <span className="rating">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
