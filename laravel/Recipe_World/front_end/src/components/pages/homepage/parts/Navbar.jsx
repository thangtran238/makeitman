import React from 'react';
import "../../../../Assets/style.css";
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <div className="delicious-main-menu">
      <div className="classy-nav-container breakpoint-off light left">
        <div className="container">
          <nav className="classy-navbar justify-content-between my-2" id="deliciousNav">
          <Link className="nav-brand" to="/"><img src="../img/core-img/logo.png" alt="" /></Link>
            <div className="classy-navbar-toggler">
              <span className="navbarToggler">
                <span></span>
                <span></span> 
                <span></span>
              </span>
            </div>

            <div className="classy-menu">
              <div className="classycloseIcon">
                <div className="cross-wrap">
                  <span className="top"></span>
                  <span className="bottom"></span>
                </div>
              </div>

              <div className="classynav">
                <ul>
                  <li className="active"><Link to="/">HOME</Link></li>
                  <li className="cn-dropdown-item has-down"><a href="#">PAGE</a>
                    <ul className="dropdown">
                      <li><Link to="/">Home</Link></li>
                      <li><a href="about.html">About Us</a></li>
                      <li><Link to="/all-post">Post</Link></li>
                      <li><a href="receipe-post.html">Recipe Post</a></li>
                      <li><Link href="/contact">Contact</Link></li>
                      <li><a href="elements.html">Elements</a></li>
                      <li className="has-down"><a href="#">Dropdown</a>
                        <ul className="dropdown">
                          <li><a href="index.html">Home</a></li>
                          <li><a href="about.html">About Us</a></li>
                          <li><a href="blog-post.html">Blog Post</a></li>
                          <li><a href="receipe-post.html">Recipe Post</a></li>
                          <li><a href="contact.html">Contact</a></li>
                          <li><a href="elements.html">Elements</a></li>
                          <li className="has-down"><a href="#">Dropdown</a>
                            <ul className="dropdown">
                              <li><a href="index.html">Home</a></li>
                              <li><a href="about.html">About Us</a></li>
                              <li><a href="blog-post.html">Blog Post</a></li>
                              <li><a href="receipe-post.html">Recipe Post</a></li>
                              <li><a href="contact.html">Contact</a></li>
                              <li><a href="elements.html">Elements</a></li>
                            </ul>
                            <span className="dd-trigger"></span>
                          </li>
                        </ul>
                        <span className="dd-trigger"></span>
                      </li>
                    </ul>
                    <span className="dd-trigger"></span>
                  </li>
                  <li  className="megamenu-item"><a href="#">MEGA MENU</a>
                    <div className="megamenu">
                      <ul className="single-mega cn-col-4">
                        <li className="title">Category</li>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="blog-post.html">Blog Post</a></li>
                        <li><a href="receipe-post.html">Recipe Post</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="elements.html">Elements</a></li>
                      </ul>
                      <ul className="single-mega cn-col-4">
                        <li className="title">Category</li>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="blog-post.html">Blog Post</a></li>
                        <li><a href="receipe-post.html">Recipe Post</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="elements.html">Elements</a></li>
                      </ul>
                      <ul className="single-mega cn-col-4">
                        <li className="title">Category</li>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="blog-post.html">Blog Post</a></li>
                        <li><a href="receipe-post.html">Recipe Post</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="elements.html">Elements</a></li>
                      </ul>
                      <div className="single-mega cn-col-4">
                        <div className="receipe-slider owl-carousel owl-loaded owl-drag">
                          <img src="../img/bg-img/bg1.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <span className="dd-trigger"></span>
                  </li>
                  <li><Link to="/all-post">RECIPES</Link></li>
                  <li><a href="receipe-post.html">4 VEGANS</a></li>
                  <li ><Link to="/contact">CONTACT</Link></li>
                </ul>

                <div className="search-btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
