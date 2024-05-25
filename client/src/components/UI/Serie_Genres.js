import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Movie_Genres.css";

function Serie_Genres(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=f2552b7af8b6069509ae2de03f1c8c85"
        );

        setGenres(response.data.genres);
      } catch (err) {
        console.error("Error fetching movie genres", err);
      }
    };

    getGenres();
  }, []);

  return (
    <div className="genre-container series">
      <Link
        to="/series"
        className={props.genre === undefined ? "genre active" : "genre"}
      >
        All Series
      </Link>

      {genres.map((genre) => (
        <Link
          to={`/series/${genre.id}`}
          key={genre.id}
          className={+props.genre === +genre.id ? "genre active" : "genre"}
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}

export default Serie_Genres;
