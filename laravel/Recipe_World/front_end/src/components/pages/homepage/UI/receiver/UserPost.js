import React from "react";
import { Link } from "react-router-dom";
export default function UserPost({ id, thumbnail, price, name, description }) {
  return (
    <div className="col-lg-6 mb-2 pr-lg-1 user-post">
      <img src={thumbnail} alt="" className="img-fluid rounded shadow-sm" />

      <div className="post-content">
        <h3 className="text-truncate text-success">{name}</h3>
        <p>{description}</p>
        <span>Price: ${price}</span>
        <br />
        <Link className="btn btn-outline-success" to={`/recipe/${id}`}>
          View Recipe
        </Link>
      </div>
    </div>
  );
}
