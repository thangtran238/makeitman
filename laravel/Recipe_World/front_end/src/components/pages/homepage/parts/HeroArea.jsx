import React, { useEffect, useState } from "react";
import "../../../../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Box, Carousel } from "grommet";
import { Link } from "react-router-dom";

function HeroArea() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      backgroundImage: "../img/bg-img/bg1.jpg",
      title: "Delicious Homemade Burger",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique nisl vitae luctus sollicitudin. Fusce consectetur sem eget dui tristique, ac posuere arcu varius.",
    },
    {
      backgroundImage: "../img/bg-img/bg4.jpg",
      title: "Delicious Homemade Burger",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique nisl vitae luctus sollicitudin. Fusce consectetur sem eget dui tristique, ac posuere arcu varius.",
    },
    {
      backgroundImage: "../img/bg-img/bg5.jpg",
      title: "Delicious Homemade Burger",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique nisl vitae luctus sollicitudin. Fusce consectetur sem eget dui tristique, ac posuere arcu varius.",
    },
    {
      backgroundImage: "../img/bg-img/bg6.jpg",
      title: "Delicious Homemade Burger",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique nisl vitae luctus sollicitudin. Fusce consectetur sem eget dui tristique, ac posuere arcu varius.",
    },
    {
      backgroundImage: "../img/bg-img/bg7.jpg",
      title: "Delicious Homemade Burger",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique nisl vitae luctus sollicitudin. Fusce consectetur sem eget dui tristique, ac posuere arcu varius.",
    },
  ]; // slides array

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-area">
      <div className="hero-slides d-block">
        <Box gap="medium" align="center" pad="large">
          <Carousel controls={false} play={3000}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`single-hero-slide ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom",
                }}
              >
                <div className="container h-100">
                  <div className="row h-100 align-items-center">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                      <div
                        className={`hero-slides-content ${
                          index === currentSlide ? "active" : ""
                        }`}
                      >
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                        <Link to="/all-post" className="btn delicious-btn">
                          See Recipe
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </Box>
      </div>
    </section>
  );
}

export default HeroArea;
