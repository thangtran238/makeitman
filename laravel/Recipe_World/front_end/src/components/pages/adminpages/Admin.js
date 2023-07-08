import React, { useEffect, useState } from "react";
import LeftSidebar from "./parts/LeftSidebar";
import Header from "./parts/Header";
import Content from "./parts/Content";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

export default function Admin() {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("token");
    if (isAdmin) {
      import("../../../Assets/admin/css/styles.min.css").then(() =>
        setShowModal(false)
      );
    }
  }, []);

  const checkAdmin = (token) => {
    if (token) {
      return (
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
              <Content />
            </div>
          </div>
        </div>
      );
    }
    return (
      <ReactModal
        isOpen={showModal}
        contentLabel="Login Modal"
        className="modal-dialog modal-confirm"
      >
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <div className="icon-box">
              <i className="fa-solid fa-x"></i>
            </div>
            <Link
              to="/"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </Link>
          </div>
          <div className="modal-body text-center py-5">
            <h4 className="text-success">Ooops!</h4>
            <h6>
              You haven't logged in yet. Please{" "}
              <Link to="/sign-in" className="text-success">
                login
              </Link>{" "}
              and come back.
            </h6>
          </div>
        </div>
      </ReactModal>
    );
  };

  return checkAdmin(sessionStorage.getItem("token"));
}
