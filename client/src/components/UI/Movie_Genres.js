import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Movie_Genres.css";

function Movie_Genres(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=f2552b7af8b6069509ae2de03f1c8c85"
        );

        setGenres(response.data.genres);
      } catch (err) {
        console.error("Error fetching movie genres", err);
      }
    };

    getGenres();
  }, [props.genre]);

  return (
    <div className="genre-container movies">
      <Link
        to="/movies"
        className={props.genre === undefined ? "genre active" : "genre"}
      >
        All Movies
      </Link>

      {genres.map((genre) => (
        <Link
          to={`/movies/${genre.id}`}
          key={genre.id}
          className={+props.genre === +genre.id ? "genre active" : "genre"}
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}

export default Movie_Genres;
