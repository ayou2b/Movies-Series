import React from "react";
import Carousel from "react-multi-carousel";

import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";

import "./HeroSlider.css";

function Home_Hero_Slider(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      showDots={false}
      swipeable={true}
      keyBoardControl={true}
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      autoPlaySpeed={4000}
      autoPlay={true}
      containerClass="hero-container"
      itemClass="item"
    >
      {props.movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="slider-item"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            draggable={false}
          >
            <div className="dark-overlay"></div>
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              draggable={false}
              className="movie-card hero active"
            ></div>

            <div className="movie-information active" draggable={false}>
              <h2>{movie.title}</h2>
              <p>{`${movie.overview
                .split(" ")
                .slice(0, 38)
                .join(" ")} . . .`}</p>
              <div className="inormation-btns" draggable={false}>
                <button
                  className="watch"
                  onClick={() => {
                    props.onOpen(true, movie.id);
                  }}
                >
                  Watch Trailer
                </button>
                <button className="info">
                  <Link to={`/movie/${movie.id}`}>Information</Link>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}

export default Home_Hero_Slider;
