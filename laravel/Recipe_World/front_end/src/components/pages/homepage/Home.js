import { React, useEffect } from "react";
import ShowProduct from "./UI/ShowProduct";
import Products from "./UI/receiver/Products";
import Navbar from "./parts/Navbar";
import HeroArea from "./parts/HeroArea";
import TopCategory from "./parts/TopCategory";
import Footer from "./parts/Footer";
import Header from "./parts/Header";
import "@fortawesome/fontawesome-free";


const Home = () => {

  const checkTokenAndRedirect = () => {
    const token = sessionStorage.getItem("token");

    if (token === 'admin') {
      setTimeout(() => {
        window.location = "/admin";
      }, 100);
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);


  return (
    <div className="styleHome">
      <Header />
      <Navbar></Navbar>
      <HeroArea></HeroArea>
      <TopCategory />
      <ShowProduct />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
