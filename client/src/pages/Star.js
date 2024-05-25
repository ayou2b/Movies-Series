import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopHeader from "../components/TopHeader";

import MovieSlider from "../components/Movie_Slide";

import LoadingSpinner from "../components/Loading_Spinner";

import "../App.css";

import { Helmet } from "react-helmet";

function Star() {
  const [startInfo, setStarInfo] = useState({});
  const [getStarMovies, setStarMovie] = useState([]);
  const { starId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStarInfo = async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/person/${starId}?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setStarInfo(response.data);

        setLoading(true);
      } catch (err) {
        console.log("error geting the star information");
        setLoading(false);
      }
    };
    getStarInfo();
  }, [starId]);

  useEffect(() => {
    const getStarInfo = async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/person/${starId}/movie_credits?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setStarMovie(response.data.cast);
      } catch (err) {
        console.log("error geting the star movies");
      }
    };
    getStarInfo();
  }, [starId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{startInfo.name}</title>
      </Helmet>
      {loading === false && <LoadingSpinner />}
      {loading === true && (
        <React.Fragment>
          <TopHeader />
          <div className="star-main-container">
            {startInfo !== null && (
              <div className="star-info-container">
                <div
                  style={{
                    backgroundImage: `url(http://image.tmdb.org/t/p/original/${startInfo.profile_path}`,
                    height: "400px",
                    width: "250px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>

                <div className="star-info">
                  <h2>{startInfo.name}</h2>

                  {startInfo.birthday !== null && (
                    <p className="birthday">Birthday : {startInfo.birthday}</p>
                  )}

                  {startInfo.biography !== "" && (
                    <div className="biography">
                      <h3>THE BIOGRAPHY</h3>
                      <p>{startInfo.biography}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {startInfo === null && (
              <h1>Ther is no information about this star</h1>
            )}
          </div>
          {getStarMovies.length !== 0 && (
            <MovieSlider
              movies={getStarMovies}
              title={`${startInfo.name} Movies`}
              link={`/star/movies/${startInfo.id}`}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Star;
