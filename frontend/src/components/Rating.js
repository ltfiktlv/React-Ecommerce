import React from "react";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          style={{ color }}
          key={index}
          className={
            value >= index
              ? "fas fa-star"
              : value >= index - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      ))}

      <span> {text && text} reviews</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f3969a",
};
export default Rating;
