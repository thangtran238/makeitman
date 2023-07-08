import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Comment({
  id,
  obtainer_id,
  full_name,
  created_at,
  content,
  profile_image_url,
  onDeleteComment,
}) {
  const [commentContent, setCommentContent] = useState(content);
  const [modifiedContent, setModifiedContent] = useState(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = sessionStorage.getItem("obtainer_id");

  useEffect(() => {
    setCommentContent(content);
    setModifiedContent(content);
  }, [content]);

  const handleInputChange = (event) => {
    setModifiedContent(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleOkClick = () => {
    setIsEditMode(false);
    axios
      .put(`http://localhost:8000/api/comments/${id}`, {
        content: modifiedContent,
      })
      .then((response) => {
        console.log(response.data); // You can handle the response accordingly
        setCommentContent(modifiedContent); // Update the comment content
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`)
      .then((response) => {
        console.log(response.data); // You can handle the response accordingly
        onDeleteComment(id); // Notify the parent component to delete the comment from the UI
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="comment text-justify justify-content-between align-items-center">
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/images%2F${profile_image_url}?alt=media&token=6faaf2a3-91a1-4350-9b33-9ccbcc755a28`}
          alt=""
          className="rounded"
          width={100}
          height={100}
        />
        <div className="mx-5 content">
          <h4>{full_name}</h4>
          <span>
            {new Date(created_at).toLocaleDateString("vi-VN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" at "}
            {new Date(created_at).toLocaleTimeString("vi-VN", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <hr />
          {isEditMode ? (
            <textarea
              value={modifiedContent}
              onChange={handleInputChange}
              className="form-control"
              rows={3}
              autoFocus
            />
          ) : (
            <p>{commentContent}</p>
          )}
        </div>
      </div>
      <div className="option btn-group">
        {obtainer_id === parseInt(userId) && (
          <>
            {isEditMode ? (
              <button className="btn btn-success" onClick={handleOkClick}>
                <i className="fa-solid fa-check"></i>
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={handleEditClick}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            )}
            <button
              className="btn btn-outline-success"
              onClick={handleDeleteClick}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
