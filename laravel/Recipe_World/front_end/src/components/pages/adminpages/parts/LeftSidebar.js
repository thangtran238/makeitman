import React from "react";
import { Link } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      {/* Sidebar scroll*/}
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/admin" className="text-nowrap logo-img">
            <h4>
              <span className="text-success">Recipe</span> Admin
            </h4>
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8" />
          </div>
        </div>
        <hr />
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar>
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4" />
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard" />
                </span>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4" />
              <span className="hide-menu">UI COMPONENTS</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/users"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-article" />
                </span>
                <span className="hide-menu">Users</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/posts"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-alert-circle" />
                </span>
                <span className="hide-menu">Posts</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/orders"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-cards" />
                </span>
                <span className="hide-menu">Orders</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/categories"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-file-description" />
                </span>
                <span className="hide-menu">Categories</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* End Sidebar navigation */}
      </div>
      {/* End Sidebar scroll*/}
    </aside>
  );
}
