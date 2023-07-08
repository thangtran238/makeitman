import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import Comments from "../Comments/Comments";

export default function Recipe() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [orders, setOrders] = useState(null);
  const [getOrders, setGetOrders] = useState(null);
  const [postImages, setPostImages] = useState([]);
  const userId = sessionStorage.getItem("obtainer_id");
  const [status, setStatus] = useState(null); // Add status state

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!recipe) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/get-post/${id}`
          );
          const data = response.data;
          setRecipe(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, [id, recipe]);
  useEffect(() => {
    const fetchGetOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${userId}`
        );
        const data = response.data;
        setGetOrders(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetOrders();
  }, [userId]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orders) {
          const recipeInformation = {
            sender_id: userId,
            post_id: id,
          };
          const response = await axios.post(
            "http://127.0.0.1:8000/api/post/orders",
            recipeInformation
          );
          const data = response.data;
          setOrders(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id, userId, orders]);

  useEffect(() => {
    if (orders && orders.status) {
      setStatus(orders.status); // Update status state when orders.status changes
    }
  }, [orders]);

  const checkContent = () => {
    if (getOrders && userId == getOrders.sender_id && getOrders.post_id == recipe.id) {
      if (getOrders.status) {
        
        return (
          <div className="col-12 col-md-8">
            <div className="receipe-headline my-5">
              <h5>Description</h5>
              {recipe && recipe.description}
              <h5>Instruction</h5>
              {recipe && recipe.instruction}
              <div>
                <br />
                Preparation time: {recipe && recipe.preparetion_time} <br />
                Cooking time: {recipe && recipe.cooking_time}
              </div>
              <h5>Ingredients</h5>
              {recipe && recipe.ingredients}
            </div>
          </div>
        );
      } else {
        return (
          <div className="col-12 col-md-8">
            <div className="receipe-headline my-5">
              <h5>Description</h5>
              {recipe && recipe.description}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="col-12 col-md-8">
          <div className="receipe-headline my-5">
            <h5>Description</h5>
            {recipe && recipe.description}
          </div>
        </div>
      );
    }
  };
  const checkUser = (userId) => {
    if (!recipe) {
      return null;
    }

    if (!userId) {
      return (
        <>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="btn delicious-btn"
          >
            {recipe && `$${recipe.price}`}
          </button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
              <center>Something went wrong here</center>
            </DialogTitle>
            <DialogContent>
              You haven't logged in yet. If you have an account,{" "}
              <Link to="/sign-in" onClick={storePrevPage}>
                Login
              </Link>{" "}
              here, or you can <Link to="/sign-up">Join us</Link>.
            </DialogContent>
          </Dialog>
        </>
      );
    }

    if (orders && !orders.status) {
      return (
        <div>
          <button className="btn btn-outline-success delicious-btn">
            Waiting
          </button>
        </div>
      );
    }

    if (userId == recipe.obtainer.id) {
      return (
        <>
          <button className="btn delicious-btn">View your other posts</button>
        </>
      );
    }

    if (status) {
      return (
        <div>
          <button className="btn btn-outline-success delicious-btn" disable>
            You have bought this recipe
          </button>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn delicious-btn"
        >
          {recipe && `$${recipe.price}`}
        </button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            <center>{recipe && recipe.title}</center>
          </DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <img src={recipe && recipe.thumbnail} alt="" />
              <div className="dialog-content-information">
                <div className="dialog-information">
                  <p>
                    <i className="fa-solid fa-user"></i>&nbsp;{" "}
                    {recipe && recipe.obtainer.full_name}
                  </p>
                  <p>
                    <i className="fa-solid fa-phone"></i>&nbsp;{" "}
                    {recipe && recipe.obtainer.phone_number}
                  </p>
                  <p>
                    <i className="fa-solid fa-envelope"></i>&nbsp;{" "}
                    {recipe && recipe.obtainer.email}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
          <div className="dialog-action">
            <DialogActions>
              <div className="btn-group">
                <Button className="text-success" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="text-success" onClick={() => buy()}>
                  {recipe && `$${recipe.price}`}
                </Button>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  };

  const storePrevPage = () => {
    const currentPage = window.location.href;
    localStorage.setItem("prevPage", currentPage);
  };

  const buy = () => {
    const buyingInformation = {
      sender_id: userId,
      recipient_id: recipe.obtainer.id,
      post_id: recipe.id,
      status: 0,
    };
    axios
      .post("http://localhost:8000/api/order", buyingInformation)
      .then((res) => {
        setOpen(false);
        setStatus(0); // Update status state after successful order
        NotificationManager.info(
          "Your order is ready, let's wait for the owner!!"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Header />
      <div
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: `url(${recipe && recipe.thumbnail})` }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>{recipe && recipe.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ##### Breadcumb Area End ##### */}
      <div className="receipe-post-area section-padding-80">
        {/* Receipe Post Search */}
        {/* Receipe Slider */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="receipe-slider owl-carousel">
                <img src="img/bg-img/bg5.jpg" alt="" />
                <img src="img/bg-img/bg5.jpg" alt="" />
                <img src="img/bg-img/bg5.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* Receipe Content Area */}
        <div className="receipe-content-area">
          <div className="container">
            <div className="row">
              {checkContent()}
              <div className="col-12 col-md-4">
                <div className="receipe-ratings text-right my-5">
                  <div className="ratings">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star-o" />
                  </div>
                  {checkUser(userId)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="receipe-content-area">
        <div className="container">
          <Comments postId={id} />
        </div>
      </div>

      {/* ##### Follow Us Instagram Area Start ##### */}
      <div className="follow-us-instagram">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5>Follow Us Instagram</h5>
            </div>
          </div>
        </div>
        {/* Instagram Feeds */}
        <div className="insta-feeds d-flex flex-wrap">
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta1.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta2.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta3.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta4.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta5.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta6.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Single Insta Feeds */}
          <div className="single-insta-feeds">
            <img src="img/bg-img/insta7.jpg" alt="" />
            {/* Icon */}
            <div className="insta-icon">
              <a href="#">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationContainer />
    </>
  );
}
