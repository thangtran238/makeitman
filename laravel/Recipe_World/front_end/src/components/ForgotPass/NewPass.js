import React, { useState } from "react";
import axios from "axios";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
const NewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      password === confirmPassword &&
      password.length >= 8 &&
      password.length <= 20
    ) {
      const token = new URLSearchParams(window.location.search).get("token");
      const email = new URLSearchParams(window.location.search).get("email");
      console.log(token);
      console.log(email);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/new-pass",
          {
            token,
            email,
            password,
          }
        );
        setConfirmPassword("");
        setPassword("");
        NotificationManager.info(response.data.message);
        window.location = "http://localhost:3000/sign-in";
      } catch (error) {
        NotificationManager.error(error.response.data.message);
      }
    } else {
      NotificationManager.error("Passwords do not match");
    }
  };

  return (
    <>
      <Header />
      <div className="card login-form forgot-pass">
        <div className="card-body">
          <h3 className="card-title text-center">Change password</h3>
          {/*Password must contain one lowercase letter, one number, and be at least 7 characters long.*/}
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Your new password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChangePassword}
                  className="form-control form-control-sm"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Repeat password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  className="form-control form-control-sm"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block submit-btn"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationContainer />
    </>
  );
};

export default NewPass;
