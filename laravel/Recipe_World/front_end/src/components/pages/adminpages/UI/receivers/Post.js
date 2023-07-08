import React from "react";

export default function Post({ id, obtainer, category, title, content }) {
  return (
    <tr className="align-middle">
      <td>{id}</td>
      <td>{obtainer}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{content}</td>
    </tr>
  );
}
