import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Authentication from "../context/Authentication";
import LoadingSpinner from "../components/Loading_Spinner";
import MovieCard from "../components/UI/Movie_Card";
import SerieCard from "../components/UI/Serie_Card";
import TopHeader from "../components/TopHeader";

import "./Watchlist.css";

function Watchlist() {
  const { token } = useContext(Authentication);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [watchListSeries, setWatchListSeries] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://movies-series-3.onrender.com/userWatchlist",
          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );

        setWatchListMovies(response.data.watchlist.movies);
        setWatchListSeries(response.data.watchlist.series);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <React.Fragment>
      {loading === false && <LoadingSpinner />}
      <TopHeader />
      {loading === true && (
        <React.Fragment>
          <div className="watchlist">
            {watchListMovies.length !== 0 && (
              <div className="part">
                <div className="watchlist-header">
                  <h2>Movies Watchlist</h2>
                  <div className="watchlist-underline"></div>
                </div>
                <div className="watchlist-container">
                  {watchListMovies.map((movie) => {
                    return (
                      <MovieCard
                        key={movie._id}
                        title={movie.title}
                        id={movie.id}
                        poster_path={movie.image}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {watchListSeries.length !== 0 && (
              <div className="part">
                <div className="watchlist-header">
                  <h2>Series Watchlist</h2>
                  <div className="watchlist-underline"></div>
                </div>
                <div className="watchlist-container">
                  {watchListSeries.map((serie) => {
                    return (
                      <SerieCard
                        key={serie._id}
                        name={serie.name}
                        id={serie.id}
                        poster_path={serie.image}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {watchListMovies.length === 0 && watchListSeries.length === 0 && (
            <div className="empty">
              <h1>Your Watchlist is empty</h1>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Watchlist;
