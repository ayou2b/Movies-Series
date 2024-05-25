import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "react-multi-carousel/lib/styles.css";

import "./Movies_Slider.css";

import SerieCard from "./UI/Serie_Card";

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems, slidesToShow },
  } = rest;

  const shouldShowLeftArrow = currentSlide !== 0;
  const shouldShowRightArrow = currentSlide + slidesToShow < totalItems;

  return (
    <div className="carousel-button-group">
      {shouldShowLeftArrow && (
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => previous()} />
      )}

      {shouldShowRightArrow && (
        <FontAwesomeIcon icon={faChevronRight} onClick={() => next()} />
      )}
    </div>
  );
};

function Serie_Slide(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1301 },
      items: 7,
    },
    underDesktop: {
      breakpoint: { max: 1300, min: 769 },
      items: 4.5,
    },
    tablet: {
      breakpoint: { max: 768, min: 481 },
      items: 2.9,
    },
    undertablet: {
      breakpoint: { max: 567, min: 493 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.7,
    },
    underMobile: {
      breakpoint: { max: 260, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="slider-container">
      <div className="slider-info">
        <div>
          <h2>{props.title}</h2>
          <div className="under-line"></div>
        </div>
        <Link to={props.link} className="link">
          View All
        </Link>
      </div>
      <Carousel
        responsive={responsive}
        showDots={false}
        swipeable={true}
        keyBoardControl={true}
        removeArrowOnDeviceType={["mobile", "underMobile", "undertablet"]}
        containerClass="container"
        itemClass="item"
        autoPlaySpeed={4000}
        autoPlay={true}
        arrows={true}
        customButtonGroup={<ButtonGroup />}
      >
        {props.movies.map((movie) => {
          return (
            <SerieCard
              poster_path={movie.poster_path}
              name={movie.name}
              id={movie.id}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default Serie_Slide;
