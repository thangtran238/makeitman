import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../pages/homepage/UI/receiver/Comment";
import "./comment.css";
import { Link } from "react-router-dom";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const obtainer_id = sessionStorage.getItem("obtainer_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/comments/${postId}`
        );
        const data = response.data;
        setComments(data);
        setCommentCount(data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId, commentCount]);

  const storePrevPage = () => {
    const currentPage = window.location.href;
    localStorage.setItem("prevPage", currentPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      post_id: postId,
      content: newComment,
      obtainer_id: obtainer_id,
    };

    axios
      .post("http://localhost:8000/api/comment", commentData)
      .then((res) => {
        const newComment = res.data;
        setComments((prevComments) => [...prevComments, newComment]);
        setNewComment("");
        setCommentCount((prevCount) => prevCount + 1); // Increment the comment count
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setCommentCount((prevCount) => prevCount - 1); // Decrement the comment count
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="section-heading text-left">
            <h3>Leave a comment</h3>
          </div>
          <div className="col-12">
            <div className="row">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    obtainer_id={comment.obtainer_id}
                    key={comment.id}
                    id={comment.id}
                    full_name={
                      comment.obtainer ? comment.obtainer.full_name : "Unknown"
                    }
                    profile_image_url={
                      comment.obtainer ? comment.obtainer.profile_image_url : ""
                    }
                    created_at={comment.created_at}
                    content={comment.content}
                    onDeleteComment={handleDeleteComment}
                  />
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="contact-form-area">
            {obtainer_id ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 my-4">
                    <textarea
                      name="message"
                      className="form-control"
                      id="message"
                      cols={30}
                      rows={10}
                      placeholder="Message"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn delicious-btn mt-30" type="submit">
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-12">
                  <p>
                    You must{" "}
                    <Link onClick={storePrevPage} to="/sign-in">
                      Login
                    </Link>{" "}
                    to comment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
