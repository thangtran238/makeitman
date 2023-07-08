import React from "react";

export default function Order({
  id,
  buyer,
  seller,
  post_title,
  price,
  time,
  status,
  commission,
}) {
  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const getTimeAgo = (timestamp) => {
    const currentTime = new Date();
    const previousTime = new Date(timestamp);
    const timeDiff = currentTime - previousTime;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return previousTime.toLocaleString();
    } else if (days >= 1) {
      return `${days} days ago`;
    } else if (hours >= 1) {
      return `${hours} hours ago`;
    } else if (minutes >= 1) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  return (
    <tr className="align-middle">
      <td>{id}</td>
      <td>{capitalizeName(buyer)}</td>
      <td>{capitalizeName(seller)}</td>
      <td>{post_title}</td>
      <td>${price}</td>
      <td>{getTimeAgo(time)}</td>
      <td>
        {status ? (
          <p className="text-warning">Waiting</p>
        ) : (
          <p className="text-success">Success</p>
        )}
      </td>
      <td>${commission}</td>
    </tr>
  );
}
