import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./Posting.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



const Posting = () => {


  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [categories, setCategories] = useState([]);
  const [convertedContent, setConvertedContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleInputed, setTitleInputed] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    return () => {
      isMounted = false;
    };
  }, [editorState]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Done
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const handleTitleInputed = (event) => {
    setTitleInputed(event.target.value);
  };

  const createCategory = async (categoryName) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories",
        {
          name: categoryName,
        }
      );
      if (response.data.message === "Successful") {
        fetchCategories();
        NotificationManager.success("Add new category successful");
        setCategoryName('');
        setOpen(false);
      } else {
        NotificationManager.error("This category already exists");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };
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

  // Handle upload images
  const handleImageUpload = async (file) => {
    try {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "post-images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("Image uploaded:", downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    setUploadedImages(imageFiles);
    imageFiles.forEach((file) => {
      handleImageUpload(file);
    });
  };



  
  const saveData = async () => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = JSON.stringify(convertToRaw(contentState));

    if (!sessionStorage.getItem("obtainer_id")) {
      NotificationManager.error("You must register to use this function");
      setTimeout(() => {
        window.location = "http://localhost:3000/login";
      }, 100);
      return;
    }

    if (selectedCategory === "") {
      NotificationManager.info("Please select a category");
      return;
    }

    if (titleInputed === "") {
      NotificationManager.info("Please enter the title");
      return;
    }

    if (contentState.hasText() === false) {
      NotificationManager.info("Please enter some content");
      return;
    }

    if (uploadedImages.length === 0) {
      NotificationManager.info("Please upload at least one image");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/add-post", {
        content: contentRaw,
        obtainers_id: sessionStorage.getItem("obtainers_id"),
        category_id: selectedCategory,
        title: titleInputed,
        images: uploadedImages.map((image) => image.name),
      });

      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  return (
    <>
      <Header />


      <div className="posting-page">
        <header className="App-header">Create your own new recipe</header>
        <div className="posting-content">
          <div className="edit-zone">
            <div className="wrap-category mb-3">
              <span htmlFor="category" className="form-label">
                Select a category:
              </span>

              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select"
              >
                <option value="">-- Select a category -- </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button
                className="btn btn-success rounded-pill px-4 py-2 shadow-lg"
                variant="outlined"
                onClick={handleClickOpen}
              >
                +
              </Button>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Category</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Create your own category to make your recipe easy to find
                    and easy to get hot
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => createCategory(categoryName)}>
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            <input
              type="text"
              placeholder="Title"
              className="input-title"
              onChange={handleTitleInputed}
            />

            <input
              placeholder="Demo"
            />
            <input
              placeholder="Content"
            />
          </div>

          <div className="image-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={handleImageDrop} >
            <div className="form-upload my-4">
              <div className="image-box">
                <input type="file" name="file" id="fileInput" accept=".jpg" hidden />
                <label htmlFor="fileInput" className="preview">
                  <span>Drag and drop images here</span>
                </label>
              </div>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div className="uploaded-images">
              {uploadedImages.map((image) => (
                <div key={image.name} className="image-thumbnail">
                  <img src={URL.createObjectURL(image)} alt="Uploaded Image" />
                </div>
              ))}
            </div>
          )}

          <div className="button-container" style={{ display: "flex", justifyContent: "center" }} >
            <button className="btn-save-post btn btn-success rounded-pill px-4 py-2 shadow-lg" onClick={saveData} >
              Post
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationContainer />
    </>
  );
}

export default Posting;
