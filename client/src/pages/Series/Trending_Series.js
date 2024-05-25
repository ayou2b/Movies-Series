import React, { useEffect, useState } from "react";
import axios from "axios";

// import MovieCard from "../../components/UI/Movie_Card";
import SerieCard from "../../components/UI/Serie_Card";
import TopHeader from "../../components/TopHeader";
import "../../App.css";

import SerieSearch from "../../components/UI/Serie_Search";

import LoadingSpinner from "../../components/Loading_Spinner";

import { Helmet } from "react-helmet";

function Trending_Series() {
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrendingSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=f2552b7af8b6069509ae2de03f1c8c85&page=${page}`
        );

        setTrendingSeries((prevTrendingMovies) => {
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

    getTrendingSeries();
  }, [page]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Trending Series</title>
      </Helmet>
      {loading === false && <LoadingSpinner />}
      {loading === true && (
        <React.Fragment>
          <TopHeader />
          <SerieSearch />
          <div className="cards-main-container">
            <div className="card-btn-container">
              <div className="cards-container">
                {trendingSeries.map((movie) => (
                  <SerieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    name={movie.name}
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

export default Trending_Series;
