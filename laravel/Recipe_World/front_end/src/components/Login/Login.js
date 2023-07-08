import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    if (dataForm.email != "" && dataForm.password != "") {
      const _formData = new FormData();
      _formData.append("email", dataForm.email);
      _formData.append("password", dataForm.password);

      const requestOptions = {
        method: "POST",
        body: _formData,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/obtainers/login",
        requestOptions
      );

      if (response.status == 200) {
        var res = await response.json();
        sessionStorage.setItem("obtainer_id", res.data.id);
        sessionStorage.setItem("token", res.token);

        NotificationManager.success("Login successful!");
        setTimeout(() => {
          window.location = "/";
        }, 1000);
      } else if (response.status == 201) {
        var res = await response.json();
        sessionStorage.setItem("obtainer_id", res.data.id);
        sessionStorage.setItem("token", res.token);

        NotificationManager.success("Login successful!");
        setTimeout(() => {
          window.location = "/admin";
        }, 1000);
      } else {
        NotificationManager.error("Wrong email or password!");
      }
    }
  };

  const checkTokenAndRedirect = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setTimeout(() => {
        window.location = "/";
      }, 100);
    } else if (token === "admin") {
      setTimeout(() => {
        window.location = "/admin";
      }, 100);
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  return (
    <>
      <Header />
      <div className="login-card-container">
        <div className="login-card">
          {/* <div class="login-card-logo">
  <img src="logo.png" alt="logo">
</div> */}
          <div className="login-card-header">
            <h1>Log in</h1>
            <div>Please login to our my website</div>
          </div>
          <div className="login-card-form">
            <div className="form-group-login">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setDataForm({ ...dataForm, email: e.target.value })
                }
                autoFocus
              />
            </div>
            <div className="form-group-login">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) =>
                  setDataForm({ ...dataForm, password: e.target.value })
                }
              />
            </div>
            <div className="form-item-other">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberMeCheckbox"
                  defaultChecked=""
                />
                <label htmlFor="rememberMeCheckbox">Remember me</label>
              </div>
              <a href="./enter-email">I forgot my password!</a>
            </div>
            <button type="submit" name="btn-login" onClick={() => onLogin()}>
              Sign In
            </button>
          </div>
          <div className="login-card-footer">
            Don't have an account? <Link to={"/sign-up"}>Create now</Link>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationContainer />
    </>
  );
};

export default Login;
