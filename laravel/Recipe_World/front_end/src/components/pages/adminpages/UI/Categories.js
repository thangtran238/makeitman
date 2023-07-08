import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./receivers/Category";
import LeftSidebar from "../parts/LeftSidebar";
import Header from "../parts/Header";
export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-total-posts")
      .then((res) => {
        const data = res.data;
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(categories);
  return (
    <>
      <div>
        {/*  Body Wrapper */}
        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
        >
          <LeftSidebar />
          <div className="body-wrapper">
            <Header />
            {categories && categories.length > 0 ? (
              <div className="container-fluid">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Total Posts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((post, index) => (
                      <Category
                        key={post.id}
                        id={index + 1}
                        category_name={post.name}
                        posts={post.totalPosts}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
