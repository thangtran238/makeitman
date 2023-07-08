import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import { useParams, Link } from "react-router-dom";
import UserPost from "../pages/homepage/UI/receiver/UserPost";

const UserInfor = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const [postsOwner, setPostsOwner] = useState([]);
  const [activeButton, setActiveButton] = useState("Posts");
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("obtainer_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get-obtainer/${id}`
        );
        setRes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-posts/${id}`
        );
        setPostsOwner(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-orders/${id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  console.log(postsOwner);

  return (
    <>
      <Header />
      <div className="row py-5 px-4 user-info">
        <div className="col-md-5 mx-auto">
          {/* Profile widget */}
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/images%2F${res.profile_image_url}?alt=media&token=6faaf2a3-91a1-4350-9b33-9ccbcc755a28`}
                    alt="..."
                    width={130}
                    className="rounded mb-2 img-thumbnail"
                  />
                  {res.id == userId ? (
                    <Link
                      to={`/edit-profile`}
                      type="button"
                      className="btn btn-outline-dark btn-sm btn-block"
                    >
                      Edit profile
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm btn-block"
                    >
                      Follow
                    </button>
                  )}
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0 text-light">{res.full_name}</h4>
                  <p className="small mt-0 mb-0 ">
                    <i className="fa-solid fa-envelope" /> {res.email}
                  </p>
                  <p className="small mt-0 mb-1 ">
                    <i className="fa-solid fa-phone" /> {res.phone_number}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {postsOwner.length}
                  </h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-image mr-1" />
                    Posts
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {orders.length}
                  </h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fa-solid fa-cart-shopping" /> Purchased
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {res.followers_count}
                  </h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-user mr-1" /> Followers
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                {res.bio ? (
                  <p className="font-italic mb-0">{res.bio}</p>
                ) : (
                  <p className="font-italic mb-0">Nothing to see here yet</p>
                )}
              </div>
            </div>
            {userId == res.id ? (
              <>
                <div className="option-group">
                  <button
                    className="option-btn btn btn-dark"
                    onClick={() => handleButtonClick("Posts")}
                  >
                    Posts
                  </button>
                  <button
                    className="option-btn btn btn-dark"
                    onClick={() => handleButtonClick("Orders")}
                  >
                    Orders
                  </button>
                </div>
                <div className="py-4 px-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Recent {activeButton}</h5>
                    {activeButton === "Posts" && (
                      <Link to="/posting" className="btn btn-link text-muted">
                        Add a Post
                      </Link>
                    )}
                  </div>
                  {activeButton === "Posts" ? (
                    <div>
                      {Array.isArray(postsOwner) && postsOwner.length > 0 ? (
                        postsOwner.map((post, index) => (
                          <UserPost
                            key={index}
                            id={post.id}
                            thumbnail={post.thumbnail}
                            name={post.name}
                            price={post.price}
                            description={post.description}
                          />
                        ))
                      ) : (
                        <p>No posts available</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => (
                          <UserPost
                            key={index}
                            id={order.id}
                            thumbnail={order.thumbnail}
                            name={order.name}
                            price={order.price}
                            description={order.description}
                          />
                        ))
                      ) : (
                        <p>No orders available</p>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Recent {activeButton}</h5>
                  <a href="#" className="btn btn-link text-muted">
                    Show all
                  </a>
                </div>
                {activeButton === "Posts" ? (
                  <div>
                    {Array.isArray(postsOwner) && postsOwner.length > 0 ? (
                      postsOwner.map((post, index) => (
                        <UserPost
                          key={index}
                          id={post.id}
                          thumbnail={post.thumbnail}
                          name={post.name}
                          price={post.price}
                          description={post.description}
                        />
                      ))
                    ) : (
                      <p>No posts available</p>
                    )}
                  </div>
                ) : (
                  <div>
                    {Array.isArray(orders) && orders.length > 0 ? (
                      orders.map((order, index) => (
                        <UserPost
                          key={index}
                          id={order.id}
                          thumbnail={order.thumbnail}
                          title={order.title}
                          price={order.price}
                          content={order.content}
                        />
                      ))
                    ) : (
                      <p>No orders available</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserInfor;
