import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SerieCard from "../../components/UI/Serie_Card";
import TopHeader from "../../components/TopHeader";

import SerieSearch from "../../components/UI/Serie_Search";

import LoadingSpinner from "../../components/Loading_Spinner";

import { Helmet } from "react-helmet";

function Serach_Serie() {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const { serieName } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=f2552b7af8b6069509ae2de03f1c8c85&query=${serieName}&page=${page}`
        );
        setSeries((prevTrendingMovies) => {
          if (page === 1) {
            return response.data.results.slice(0, 20);
          } else {
            return [...prevTrendingMovies, ...response.data.results];
          }
        });

        setLoading(true);
      } catch (err) {
        console.log("error geting the searched serie on the serie search page");
        setLoading(false);
      }
    };

    getMovies();
  }, [serieName, page]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{serieName}</title>
      </Helmet>
      {loading === false && <LoadingSpinner />}
      {loading === true && (
        <React.Fragment>
          <TopHeader />
          <SerieSearch />
          <div className="cards-main-container">
            <div className="card-btn-container">
              <div className="cards-container">
                {series.map((movie) => (
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

export default Serach_Serie;
