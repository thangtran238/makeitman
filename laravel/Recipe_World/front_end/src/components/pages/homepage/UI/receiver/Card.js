import React from "react";
import "./card.css";
import {Link} from "react-router-dom"
export default function Card({
  id,
  name,
  price,
  thumbnail,
  created_at,
  full_name,
  comment_count,
  obtainer_id
}) {
  return (
    <div className="food-card bg-white rounded-lg overflow-hidden mb-4 shadow">
    <div className="food-card_img position-relative">
      <img src={thumbnail} alt="" />
     <i className="fa-solid fa-fire text-warning"></i>
    </div>
    <div className="food-card_content">
      <div className="food-card_title-section overflow-hidden">
        <h4 className="food-card_title"><Link to={`recipe/${id}`} className="text-success">{name}</Link></h4>
        <div className="d-flex justify-content-between">
          <Link to={`/profile-page/${obtainer_id}`} className="food-card_author text-dark font-italic font-weight-light">{full_name}</Link>
          <div className="rating-box">
           <small className="text-mute">{comment_count} comments</small>
          </div>
        </div>
      </div>
      <div className="food-card_bottom-section">
        <hr />

      </div>							
    </div>
  </div>

  );
}
