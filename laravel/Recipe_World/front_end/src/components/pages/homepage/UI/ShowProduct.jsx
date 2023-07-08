import React, { useState, useEffect } from "react";

import "../../../../Assets/style.css";
import Products from "./receiver/Products";
import Card from "./receiver/Card";

function ShowProduct() {
  const [posts, setPosts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 4000; // Slide interval in milliseconds

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getHomepagePosts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bestRecipe")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [recipes]);

  const visibleRecipes = recipes.slice(currentIndex, currentIndex + 3);
  console.log(posts);
  return (
    <section className="best-receipe-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
              <h3>The best Recipes</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <section
            className="cta-area bg-img bg-overlay"
            style={{ backgroundImage: "url(img/bg-img/bg4.jpg)" }}
          >
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12">
                  {/* Cta Content */}
                  <div className="card-content-wrapper">
                    <div className="card-content">
                      {visibleRecipes.map((recipe, index) => (
                        <Card
                          key={recipe.id}
                          id={recipe.id}
                          obtainer_id={recipe.obtainer_id}
                          thumbnail={recipe.thumbnail}
                          name={recipe.name}
                          category_name={recipe.category_name}
                          price={recipe.price}
                          full_name={recipe.full_name}
                          comment_count={recipe.count_comment}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="small-receipe-area section-padding-80-0">
            <div className="container">
              <div className="row">
                {posts.map((post, index) => (
                  <Products
                    key={index}
                    thumbnail={post.thumbnail}
                    created_at={post.created_at}
                    name={post.name}
                    id={post.id}
                    full_name={post.obtainer.full_name}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="quote-subscribe-adds">
            <div className="container">
              <div className="row align-items-end">
                {/* Quote */}
                <div className="col-12 col-lg-4">
                  <div className="quote-area text-center">
                    <span>"</span>
                    <h4>
                      Nothing is better than going home to family and eating
                      good food and relaxing
                    </h4>
                    <p>John Smith</p>
                    <div className="date-comments d-flex justify-content-between">
                      <div className="date">January 04, 2018</div>
                      <div className="comments">2 Comments</div>
                    </div>
                  </div>
                </div>
                {/* Newsletter */}
                <div className="col-12 col-lg-4">
                  <div className="newsletter-area">
                    <h4>Subscribe to our newsletter</h4>
                    {/* Form */}
                    <div
                      className="newsletter-form bg-img bg-overlay"
                      style={{
                        backgroundImage:
                          "https://blog.beemart.vn/wp-content/uploads/2016/07/cach-lam-banh-humberger-tinh-than-tre-day-dinh-duong-10.jpg",
                      }}
                    >
                      <form action="#" method="post">
                        <input
                          type="email"
                          name="email"
                          placeholder="Subscribe to newsletter"
                          fdprocessedid="o3mgx"
                        />
                        <button
                          type="submit"
                          className="btn delicious-btn w-100"
                          fdprocessedid="y4ty2"
                        >
                          Subscribe
                        </button>
                      </form>
                      <p>
                        Fusce nec ante vitae lacus aliquet vulputate. Donec
                        sceleri sque accumsan molestie. Vestibulum ante ipsum
                        primis in faucibus orci luctus et ultrices posuere
                        cubilia.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Adds */}
                <div className="col-12 col-lg-4">
                  <div className="delicious-add">
                    <img src="../img/bg-img/add.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="follow-us-instagram">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h5>Follow Us Instragram</h5>
                </div>
              </div>
            </div>
            {/* Instagram Feeds */}
            <div className="insta-feeds d-flex flex-wrap">
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54OdWDF8zHmTWTJ-IJM7EmaIebb7BQa0-mw&usqp=CAU"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://images.deliveryhero.io/image/fd-pk/LH/fams-hero.jpg?width=480&height=360&quality=45"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://img.delicious.com.au/dpGiAwMa/w1200/del/2015/10/dukkah-rolled-eggs-with-freekeh-and-beetroot-15150-1.jpg"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://images.deliveryhero.io/image/fd-pk/LH/e3gb-hero.jpg?width=512&height=384&quality=45"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://img.delicious.com.au/dpGiAwMa/w1200/del/2015/10/dukkah-rolled-eggs-with-freekeh-and-beetroot-15150-1.jpg"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://assets.thehansindia.com/h-upload/2021/05/27/1600x960_1078752-burger.jpg"
                ></img>
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* Single Insta Feeds */}
              <div className="single-insta-feeds">
                <img
                  className="img_button"
                  src="https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/04/30104619/thit-ga-chien-mam-toi-72-mon.jpg"
                  alt=""
                />
                {/* Icon */}
                <div className="insta-icon">
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Map over the posts array */}
        </div>
      </div>
    </section>
  );
}

export default ShowProduct;
