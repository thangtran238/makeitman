import React from "react";

export default function Category({ id, category_name,posts }) {
  return (
    <tr className="align-middle">
      <td>{id}</td>
      <td>{category_name}</td>
      <td>{posts}</td>
    </tr>
  );
}
