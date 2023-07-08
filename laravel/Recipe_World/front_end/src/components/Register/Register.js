import React, { useState, useEffect, useRef } from "react";
import "../../svg.css";
import "./Register.css";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js";
import axios from "axios";

const Register = () => {
  const [phantram, setPhanTram] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [verify, setVerify] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // Get email to make sure that not has already in DB and send Verify Token to the one
  const [email, setEmail] = useState();

  const fileInput = useRef(null);

  const [dataForm, setDataForm] = useState({
    email: "",
    full_name: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [checkForm, setCheckForm] = useState({
    inputForm: false,
    verifyForm: false,
    uploadAvatar: false,
    btnRegister: false,
  });

  useEffect(() => {
    var otp_inputs = document.querySelectorAll(".otp__digit");
    var mykey = "0123456789".split("");
    otp_inputs.forEach((_) => {
      _.addEventListener("keyup", handle_next_input);
    });

    function handle_next_input(event) {
      let current = event.target;
      let index = parseInt(current.classList[1].split("__")[2]);
      current.value = event.key;
      if (event.keyCode == 8 && index > 1) {
        current.previousElementSibling.focus();
      }
      if (index < 6 && mykey.indexOf("" + event.key + "") != -1) {
        var next = current.nextElementSibling;
        next.focus();
      }
      var _finalKey = "";
      for (let { value } of otp_inputs) {
        _finalKey += value;
      }

      if (_finalKey.length == 6) {
        document.querySelector("#_otp").classList.replace("_notok", "_ok");
        document.querySelector("#_otp").innerText = _finalKey;
        sessionStorage.setItem("verify_token", _finalKey);

        let verify_token = _finalKey;
        let token_sent = sessionStorage.getItem("token_sent");

        axios
          .post("http://localhost:8000/api/comparison", {
            verify_token,
            token_sent,
          })
          .then((response) => {
            if (response.data.message == "Successful") {
              checkState("verifyForm");
            } else {
              alert("Wrong token verification");
            }
          });
      } else {
        document.querySelector("#_otp").classList.replace("_ok", "_notok");
        document.querySelector("#_otp").innerText = _finalKey;
      }
    }
  });

  // Function hadle photo picking
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPreview(undefined);
    }
  };

  useEffect(() => {
    const today = () => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      document.getElementById("datefield").setAttribute("max", today);
    };

    today();
  }, []);

  // Function handle step by step of register feature
  const checkState = (value) => {
    if (value === "inputForm") {
      if (
        validateEmail(dataForm.email) &&
        dataForm.password.length >= 8 &&
        dataForm.password == dataForm.confirm_password
      ) {
        setPhanTram(50);
        setCheckForm({ ...checkForm, inputForm: true });
        let e_session = sessionStorage.getItem("email");
        axios
          .post("http://localhost:8000/api/send-mail", { e_session })
          .then((response) => {
            sessionStorage.setItem("token_sent", response.data.token_sent);
          });
      }
      setSubmit(true);
    }

    if (value === "verifyForm") {
      setPhanTram(75);
      setCheckForm({ ...checkForm, verifyForm: true });
      setVerify(true);
    }

    if (value === "uploadAvatar") {
      if (selectedFile !== undefined) {
        setCheckForm({ ...checkForm, uploadAvatar: true });
        setPhanTram(100);
      }
    }

    if (value === "btnRegister") {
      const _formData = new FormData();
      _formData.append("username", dataForm.username);
      _formData.append("date_of_birth", dataForm.date_of_birth);
      _formData.append("full_name", dataForm.full_name);
      _formData.append("email", dataForm.email);
      _formData.append("password", dataForm.password);
      _formData.append("confirm_password", dataForm.confirm_password);
      _formData.append("profile_image_url", selectedFile);

      const requestOptions = {
        method: "POST",
        body: _formData,
      };

      fetch("http://127.0.0.1:8000/api/obtainers/register", requestOptions)
        .then((res) => res.json())
        .then((json) => {
          if (json["success"] > 0) {
            NotificationManager.success("Sign up successful!");
            setTimeout(() => {
              window.location = "http://localhost:3000/sign-in";
            }, 1000);
          } else {
            NotificationManager.error(JSON.stringify(json.error));
          }
        });

      const handleFileUpload = (file) => {
        const metadata = {
          contentType: "image/jpeg",
        };
        // config

        const firebaseConfig = {
          apiKey: "AIzaSyA4bFj14tVc9IT-5yL7tbvyvB2sCy7hbWM",
          authDomain: "recipeworld-8ecc6.firebaseapp.com",
          projectId: "recipeworld-8ecc6",
          storageBucket: "recipeworld-8ecc6.appspot.com",
          messagingSenderId: "725588893040",
          appId: "1:725588893040:web:f83005b7b51cca25fbc3b5",
          measurementId: "G-52RMZMLKKQ",
        };

        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);

        if (file) {
          const storageRef = ref(storage, "images/" + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file, metadata);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPhanTram(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.error("Error:", error);
            },
            () => {
              console.log("Upload complete");
            }
          );
        }
      };

      handleFileUpload(selectedFile);
    }
  };

  const renderCheckValidationForm = () => {
    return (
      <div className="errors d-flex flex-column justify-content-start-end">
        {dataForm.date_of_birth === "" && <span>Birthday must be filled</span>}
        {dataForm.full_name === "" && <span>Full name must be filled</span>}
        {!validateEmail(dataForm.email) && <span>Wrong email syntax</span>}
        {dataForm.password === "" && <span>Password must be filled</span>}
        {dataForm.password.length < 8 && (
          <span>Password has at least 8 characters</span>
        )}
        {dataForm.confirm_password === "" && (
          <span>Confirm Password must be filled</span>
        )}
        {dataForm.password !== dataForm.confirm_password && (
          <span>Confirm password not same as password</span>
        )}
        {check(dataForm.email) && <span>This email has already registerd</span>}
      </div>
    );
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const check = async (email) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/check-exist",
        { email }
      );
      if ((response.data.exists = true)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const backForm = (value) => {
    if (value === "inputForm") {
      setCheckForm({ ...checkForm, inputForm: false });
      setPhanTram(25);
    }

    if (value === "uploadAvatar") {
      setCheckForm({ ...checkForm, uploadAvatar: false });
      setPhanTram(75);
    }
  };

  const checkTokenAndRedirect = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setTimeout(() => {
        window.location = "http://localhost:3000";
      }, 100);
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  const renderFormRegister = (
    <div className="form-register container my-4">
      <div className="input-group mb-3">
        <label
          className="input-group-text bg-success text-light"
          style={{ width: "175px" }}
        >
          Full name
        </label>
        <input
          id="full_name"
          type="text"
          name="full_name"
          placeholder="Enter your full name here"
          className="form-control border border-success"
          onChange={(e) =>
            setDataForm({ ...dataForm, full_name: e.target.value })
          }
          value={dataForm.full_name}
          autoFocus
        />
      </div>

      <div className="input-group mb-3">
        <label
          className="input-group-text bg-success text-light"
          style={{ width: "175px" }}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email here"
          className="form-control border border-success"
          onChange={(e) => {
            const newEmail = e.target.value;
            setDataForm({ ...dataForm, email: newEmail });
            setEmail(newEmail);
            sessionStorage.setItem("email", newEmail);
          }}
          value={dataForm.email}
        />
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="datefield"
          className="input-group-text bg-success text-light"
          style={{ width: "175px" }}
        >
          Birthday
        </label>
        <input
          type="date"
          id="datefield"
          name="date_of_birth"
          className="form-control border border-success"
          min="1970-01-02"
          placeholder=""
          onChange={(e) =>
            setDataForm({ ...dataForm, date_of_birth: e.target.value })
          }
          value={dataForm.date_of_birth}
        />
      </div>

      <div className="input-group mb-3">
        <label
          className="input-group-text bg-success text-light"
          style={{ width: "175px" }}
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password here"
          className="form-control border border-success"
          onChange={(e) =>
            setDataForm({ ...dataForm, password: e.target.value })
          }
          value={dataForm.password}
        />
      </div>

      <div className="input-group mb-3">
        <label
          className="input-group-text bg-success text-light"
          style={{ width: "175px" }}
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm_password"
          placeholder=""
          className="form-control border border-success"
          onChange={(e) =>
            setDataForm({ ...dataForm, confirm_password: e.target.value })
          }
          value={dataForm.confirm_password}
        />
      </div>

      <div className="btn-group d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={() => checkState("inputForm")}
        >
          Next
        </button>
      </div>

      <div className="form-label">{submit && renderCheckValidationForm()}</div>
    </div>
  );

  const renderFormVerify = (
    <div>
      <form action="javascript: void(0)" className="otp-form" name="otp-form">
        <div className="title">
          <h1>OTP VERIFICATION</h1>
          <p className="info color-black">
            An otp has been sent to <b>{sessionStorage.getItem("email")}</b>
          </p>
          <p className="msg">Please enter OTP to verify</p>
        </div>
        <div className="otp-input-fields">
          <input type="number" className="otp__digit otp__field__1" autoFocus />
          <input type="number" className="otp__digit otp__field__2" />
          <input type="number" className="otp__digit otp__field__3" />
          <input type="number" className="otp__digit otp__field__4" />
          <input type="number" className="otp__digit otp__field__5" />
          <input type="number" className="otp__digit otp__field__6" />
        </div>
        <div className="result">
          <p id="_otp" className="_notok">
            Your verification token
          </p>
        </div>
      </form>
      <div className="btn-group d-flex justify-content-center"></div>
    </div>
  );

  const renderUploadAvatar = (
    <div className="form-upload my-4">
      <div class="image-box">
        <span class="error"></span>
        <label for="fileInput" class="preview">
          {selectedFile ? (
            <img src={preview} alt="avatar" className="img-avatar" />
          ) : (
            <span>Upload to preview image</span>
          )}
        </label>
        <input
          ref={fileInput}
          type="file"
          name="file"
          id="fileInput"
          accept=".jpg, .jpeg, .png, image/gif"
          hidden
          onChange={onSelectFile}
        />
      </div>
      <div className="upload-file">
        <div className="box-event btn-group">
          <button
            className="btn-next btn btn-success"
            onClick={() => checkState("uploadAvatar")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderEventRegister = (
    <div className="form-event-register container my-4">
      <div className="form-event d-flex flex-column">
        <label className="d-flex justify-content-center">
          Vui lòng bấm xác nhận để hoàn thành đăng ký
        </label>
        <div className="box-event btn-group d-flex justify-content-center">
          <button
            className="btn-next btn btn-outline-success"
            onClick={() => backForm("uploadAvatar")}
          >
            Back
          </button>
          <button
            className="btn-next btn btn-success"
            onClick={() => checkState("btnRegister")}
          >
            Register
          </button>
        </div>
        {}
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div>
        <div className="boxState container d-flex justify-content-center my-4">
          <div className="box">
            <svg>
              <circle className="" cx="70px" cy="70px" r="70px"></circle>
              <circle
                className={phantram > 0 ? "p" + phantram + " bg-success" : "p0"}
                cx="70px"
                cy="70px"
                r="70px"
                style={{ stroke: "#28a745" }}
              ></circle>
            </svg>
            <div className="number_precent">
              <span>{phantram}</span>%
            </div>
          </div>
        </div>
      </div>

      {!checkForm.inputForm && renderFormRegister}
      {checkForm.inputForm && !checkForm.verifyForm && renderFormVerify}
      {checkForm.inputForm &&
        checkForm.verifyForm &&
        !checkForm.uploadAvatar &&
        renderUploadAvatar}
      {checkForm.uploadAvatar && !checkForm.btnRegister && renderEventRegister}
      <Footer />
      <NotificationContainer />
    </div>
  );
};

export default Register;
