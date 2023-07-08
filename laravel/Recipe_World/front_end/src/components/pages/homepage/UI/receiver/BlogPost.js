import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function BlogPost({
  id,
  created_at,
  name,
  description,
  full_name,
  category,
  thumbnail,
  image_url,
  comments,
}) {
  const relativeTimestamp = dayjs(created_at).fromNow();
  return (
    <div className="card my-4">
      <div className="d-flex justify-content-between p-2 px-3">
        <div className="d-flex flex-row align-items-center card-image">
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/images%2F${image_url}?alt=media&token=6faaf2a3-91a1-4350-9b33-9ccbcc755a28`}
            height={50}
            width={50}
            className="rounded-circle object-fit-cover"
          />
          <div className="d-flex flex-column ml-2 p-2">
            <Link to={`/profile-page/${id}`} className="text-dark font-bold">{full_name}</Link>
            <span className="font-weight-bold font-italic text-success">
              {name}
            </span>
          </div>
        </div>
        <div className="d-flex flex-row mt-1 ellipsis ">
          <small className="mr-2">{relativeTimestamp}</small>
        </div>
      </div>
      <img src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/post-images%2F${thumbnail}?alt=media&token=759b1a36-8bcb-4315-a4fb-7699f3ea6155`} alt="" className="img-fluid" />
      <div className="p-2">
        <p className="text-justify">{description}</p>
        <hr />
        <div className="d-flex justify-content-between align-items-center px-1">
          <div className="d-flex flex-row icons align-items-center">
            <Link to={`/recipe/${id}`} className="btn btn-outline-success">
              Detail
            </Link>
            <Link className="btn btn-outline-success ml-1">#{category}</Link>
          </div>
          <div className="d-flex flex-row muted-color">
            {comments.filter((comment) => comment.post_id === id).length ? (
              <span>
                {comments.filter((comment) => comment.post_id === id).length}{" "}
                comment(s)
              </span>
            ) : (
              <span>0 comment</span>
            )}
          </div>
        </div>
        <hr />
        <div className="comments">
          {comments
            .filter((comment) => comment.post_id === id)
            .map((comment) => (
              <div className="d-flex flex-row mb-2" key={comment.id}>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/images%2F${comment.obtainer.profile_image_url}?alt=media&token=6faaf2a3-91a1-4350-9b33-9ccbcc755a28`}
                  width={40}
                  className="rounded-image object-fit-cover"
                  alt=""
                />
                <div className="d-flex flex-column ml-2">
                  <Link
                    to={`/profile-page/${comment.obtainer_id}`}
                    className="name text-success"
                  >
                    {comment.obtainer.full_name}
                  </Link>
                  <small className="comment-text">{comment.content}</small>
                </div>
              </div>
            ))}
          {comments &&
            comments.filter((comment) => comment.post_id === id).length ===
              0 && (
              <div className="d-flex flex-row ml-1">
                {" "}
                <p>
                  No comments yet.{" "}
                  <Link className="text-success" to={`/recipe/${id}`}>Be the first to comment!</Link>
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
