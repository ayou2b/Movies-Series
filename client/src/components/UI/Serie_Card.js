import React from "react";
import { Link } from "react-router-dom";
import "./Movie_Card.css";

function Serie_Card(props) {
  return (
    <Link
      to={`/serie/${props.id}`}
      className="movie-card-container"
      draggable={false}
    >
      <div
        className="movie-card"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${props.poster_path}')`,
        }}
        draggable={false}
      ></div>
      <h4 draggable={false}>{props.name}</h4>
    </Link>
  );
}

export default Serie_Card;
