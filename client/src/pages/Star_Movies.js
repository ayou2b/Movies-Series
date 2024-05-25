import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopHeader from "../components/TopHeader";

import MovieCard from "../components/UI/Movie_Card";
import MovieSearch from "../components/UI/Movie_Search";

import LoadingSpinner from "../components/Loading_Spinner";

import { Helmet } from "react-helmet";

import "../App.css";
function Star_Movies() {
  const [getStarMovies, setStarMovie] = useState([]);
  const { starId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStarInfo = async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/person/${starId}/movie_credits?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setStarMovie(response.data.cast);
        setLoading(true);
      } catch (err) {
        console.log("error getting the star movies");
        setLoading(false);
      }
    };

    getStarInfo();
  }, [starId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Star Movies</title>
      </Helmet>
      {loading === false && <LoadingSpinner />}
      {loading === true && (
        <React.Fragment>
          <TopHeader />
          <div className="cards-main-container">
            <div className="card-btn-container">
              <MovieSearch />
              <div className="cards-container">
                {getStarMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    id={movie.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Star_Movies;
