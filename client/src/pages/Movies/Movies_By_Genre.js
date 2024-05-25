import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/UI/Movie_Card";
import "../../App.css";

import TopHeader from "../../components/TopHeader";

import MovieGenres from "../../components/UI/Movie_Genres";

import MovieSearch from "../../components/UI/Movie_Search";

import LoadingSpinner from "../../components/Loading_Spinner";

import { Helmet } from "react-helmet";

function Movies_By_Genre() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { genreId } = useParams("");
  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    // setLoading(false);
    const getAllMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f2552b7af8b6069509ae2de03f1c8c85&with_genres=${genreId}&page=${page}`
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
        console.log(
          "error getting the trending movies from the trending movies page"
        );

        setLoading(false);
      }
    };

    getAllMovies();
  }, [page, genreId]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=f2552b7af8b6069509ae2de03f1c8c85"
        );

        const genre = response.data.genres.filter(
          (genre) => genre.id === +genreId
        );

        setPageName(genre[0].name);
      } catch (err) {
        console.error("Error fetching movie genres", err);
      }
    };

    getGenres();
  }, [genreId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{pageName}</title>
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

            <MovieGenres genre={genreId} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Movies_By_Genre;
