import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MovieCard from "../../components/UI/Movie_Card";
import TopHeader from "../../components/TopHeader";

import MovieSearch from "../../components/UI/Movie_Search";

import LoadingSpinner from "../../components/Loading_Spinner";

import { Helmet } from "react-helmet";

function Search_Movie() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { movieName } = useParams();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=f2552b7af8b6069509ae2de03f1c8c85&query=${movieName}&page=${page}`
        );
        setMovies((prevTrendingMovies) => {
          if (page === 1) {
            return response.data.results.slice(0, 20);
          } else {
            return [...prevTrendingMovies, ...response.data.results];
          }
        });

        setLoading(true);
      } catch (err) {
        console.log("error geting the searched movie on the movie search page");
        setLoading(false);
      }
    };

    getMovies();
  }, [movieName, page]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{movieName}</title>
      </Helmet>
      {loading === false && <LoadingSpinner />}
      {loading === true && (
        <React.Fragment>
          <TopHeader />
          <MovieSearch />
          <div className="cards-main-container">
            <div className="card-btn-container">
              <div className="cards-container">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    id={movie.id}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
                className="load-more-btn"
              >
                Load more
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Search_Movie;
