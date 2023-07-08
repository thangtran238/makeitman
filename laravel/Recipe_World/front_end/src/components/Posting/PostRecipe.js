import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import Header from "../pages/homepage/parts/Header";
import Footer from "../pages/homepage/parts/Footer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Posting.css";
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const PostRecipe = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
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
        fetchCategories();
    }, []);

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

    const saveData = async (e) => {
        e.preventDefault()
        const name = document.getElementById("inputName").value;
        const price = document.getElementById("inputPrice").value;
        const preparetion_time = document.getElementById("inputPrepTime").value;
        const cooking_time = document.getElementById("inputCookTime").value;
        const description = document.getElementById("inputDescription").value;
        const ingredients = document.getElementById("inputIngredients").value;
        const instruction = document.getElementById("inputInstructions").value;

        if (!sessionStorage.getItem("obtainer_id")) {
            NotificationManager.error("You must register to use this function");
            setTimeout(() => {
                window.location = "http://localhost:3000/sign-in";
            }, 1000);
            return;
        }

        if (selectedCategory === "") {
            NotificationManager.info("Please select a category");
            return;
        }

        if (name === "") {
            NotificationManager.info("Please enter the recipe name");
            return;
        }

        if (price === "") {
            NotificationManager.info("Please enter the price");
            return;
        }

        if (preparetion_time === "") {
            NotificationManager.info("Please enter the preparation time");
            return;
        }

        if (cooking_time === "") {
            NotificationManager.info("Please enter the cook time");
            return;
        }

        if (description === "") {
            NotificationManager.info("Please enter the recipe description");
            return;
        }

        if (ingredients === "") {
            NotificationManager.info("Please enter the ingredients");
            return;
        }

        if (instruction === "") {
            NotificationManager.info("Please enter the instructions");
            return;
        }

        if (uploadedImages.length === 0) {
            NotificationManager.info("Please upload at least one image");
            return;
        }

        const imageFirst = uploadedImages[0].name;

        const obtainer_id = sessionStorage.getItem("obtainer_id");

        console.log("obtainer_id", obtainer_id);
        console.log("category_id", selectedCategory);
        console.log("name", name);
        console.log("instruction", instruction);
        console.log("preparetion_time", preparetion_time);
        console.log("description", description);
        console.log("ingredients", ingredients);
        console.log("thumbnail", imageFirst);
        console.log("price", price);

        try {
            const response = await axios.post("http://localhost:8000/api/add-post", {
                obtainer_id,
                category_id: selectedCategory,
                name,
                instruction,
                preparetion_time,
                cooking_time,
                description,
                ingredients,
                thumbnail: imageFirst,
                price,
            });
            NotificationManager.success("Data saved successfully:");
            setTimeout(() => {
                window.location = `/profile-page/${obtainer_id}`;
            }, 1000);
        } catch (error) {
            console.log("Error saving data:", error);
        }
    };


    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="title_h2">Create Your Own Recipe</h2>
                        <form action id="form-add-recipe" className="parsley-form" data-parsley-validate>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="inputName">Recipe Name</label>
                                        <input type="text" className="form-control" placeholder="Chocolate Chunk Cookies" id="inputName" name="name" required />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="inputPrice">Price</label>
                                        <input type="number" className="form-control" placeholder="24 000" id="inputPrice" name="price" required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="inputPrepTime">Preparation Time</label>
                                        <input type="number" min={0} className="form-control" placeholder="1h" id="inputPrepTime" name="prepTime" required defaultValue />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="inputCookTime">Cook Time</label>
                                        <input type="number" min={0} className="form-control" placeholder="0.5h" id="inputCookTime" name="cookTime" required defaultValue />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="inputTotalTime">Total Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputTotalTime"
                                            name="totalTime"
                                            required
                                            defaultValue="1.5h"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="inputDescription">Recipe Description</label>
                                        <textarea className="form-control" placeholder="My award winning chocolate chunk cookies." id="inputDescription" name="description" required rows={5} defaultValue={""} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="inputIngredients">Ingredients</label>
                                        <textarea className="form-control" placeholder="2 cups flour" id="inputIngredients" name="ingredients" rows={5} required defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="inputInstructions">Instructions</label>
                                        <textarea className="form-control" placeholder="Mix dry ingredients in a large bowl" id="inputInstructions" name="instructions" rows={5} required defaultValue={""} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="inputCategories">Select the category</label>
                                        <select name="form-control" id="inputCategories" value={selectedCategory} onChange={handleCategoryChange} required>
                                            <option value>-- Select a category -- </option>

                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}

                                        </select>
                                        <Button
                                            id="buttonAddCate"
                                            className="btn btn-success rounded-pill px-4 py-2 shadow-lg"
                                            variant="outlined"
                                            onClick={handleClickOpen} >  +
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
                                </div>
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



                            <input type="hidden" id="recipeId" defaultValue="64a791e724da525507e48420" />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-primary" id="btn-save-recipe-custom" onClick={saveData} >Save
                                            Recipe</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <NotificationContainer />
        </>
    );
}

export default PostRecipe;
