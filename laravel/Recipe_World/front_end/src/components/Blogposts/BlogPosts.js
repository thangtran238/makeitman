import React, { useEffect, useState } from "react";
import BlogPost from "../pages/homepage/UI/receiver/BlogPost";
import Navbar from "../pages/homepage/parts/Navbar";
import Footer from "../pages/homepage/parts/Footer";
import Header from "../pages/homepage/parts/Header";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/newest-posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data[0]);
        setComments(data[1]);
      })
      .catch((error) => console.error(error));
  }, []);

  // Calculate index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get the current posts to be displayed
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Header />
      <Navbar />
      <div
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(img/bg-img/breadcumb2.jpg)" }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Blog</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ##### Breadcumb Area End ##### */}
      {/* ##### Blog Area Start ##### */}
      <div className="blog-area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="blog-posts-area">
                {/* Single Blog Area */}
                {currentPosts.map((post, index) => (
                  <BlogPost
                    key={index}
                    id={post.id}
                    created_at={post.created_at}
                    name={post.name}
                    description={post.description}
                    full_name={post.obtainer.full_name}
                    category={post.category.name}
                    thumbnail={post.thumbnail}
                    comments={comments}
                    image_url={post.obtainer.profile_image_url}
                  />
                ))}
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {posts.length > postsPerPage &&
                    Array.from({
                      length: Math.ceil(posts.length / postsPerPage),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}.
                        </button>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
            <div className="col-12 col-lg-4">
              <div className="blog-sidebar-area">
                {/* Widget */}
                <div className="single-widget mb-80">
                  <h6>Archive</h6>
                  <ul className="list">
                    <li>
                      <a href="#">March 2018</a>
                    </li>
                    <li>
                      <a href="#">February 2018</a>
                    </li>
                    <li>
                      <a href="#">January 2018</a>
                    </li>
                    <li>
                      <a href="#">December 2017</a>
                    </li>
                    <li>
                      <a href="#">November 2017</a>
                    </li>
                  </ul>
                </div>
                {/* Widget */}
                <div className="single-widget mb-80">
                  <h6>Categories</h6>
                  <ul className="list">
                    <li>
                      <a href="#">Restaurants</a>
                    </li>
                    <li>
                      <a href="#">Food &amp; Drinks</a>
                    </li>
                    <li>
                      <a href="#">Vegans</a>
                    </li>
                    <li>
                      <a href="#">Events &amp; Lifestyle</a>
                    </li>
                    <li>
                      <a href="#">Uncategorized</a>
                    </li>
                  </ul>
                </div>
                {/* Widget */}
                <div className="single-widget mb-80">
                  <h6>Newsletter</h6>
                  {/* Form */}
                  <div
                    className="newsletter-form bg-img bg-overlay"
                    style={{ backgroundImage: "url(img/bg-img/bg1.jpg)" }}
                  >
                    <form action="#" method="post">
                      <input
                        type="email"
                        name="email"
                        placeholder="Subscribe to newsletter"
                      />
                      <button type="submit" className="btn delicious-btn w-100">
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
                {/* Widget */}
                <div className="single-widget mb-80">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
