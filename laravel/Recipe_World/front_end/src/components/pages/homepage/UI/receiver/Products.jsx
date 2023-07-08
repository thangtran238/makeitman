import React from "react";
import "../../../../../Assets/style.css";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);
  
  // Extract the day number and add the appropriate suffix
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);
  const formattedDay = day + daySuffix;
  


  return `${formattedDate}`;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function Products({
  id,
  full_name,
  thumbnail,
  category,
  name,
  content,
  created_at,
}) {
  const formattedDate = formatDate(created_at);

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-small-receipe-area d-flex">
        {/* Receipe Thumb */}
        <div className="receipe-thumb">
          <img src={thumbnail} alt="" />
        </div>
        {/* Receipe Content */}
        <div className="receipe-content">
          <span>{formattedDate}</span>
          <Link to={`/recipe/${id}`}>
            <h5 className="text-truncate" style={{maxWidth: '150px'}}>{name}</h5>
          </Link>
          <small>{full_name}</small>
          <div className="ratings">
            <i className="fa-solid fa-star" aria-hidden="true" />
            <i className="fa-solid fa-star" aria-hidden="true" />
            <i className="fa-solid fa-star" aria-hidden="true" />
            <i className="fa-solid fa-star" aria-hidden="true" />
            <i className="fa-solid fa-star-o" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
