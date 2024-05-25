import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import "../../App.css";
import "../../components/HeroSlider.css";

import SerieSlide from "../../components/Serie_Slide";

import LoadingSpinner from "../../components/Loading_Spinner";

import Authentication from "../../context/Authentication";

function Serie_Information() {
  const { serieId } = useParams();
  const [semilarSeries, setSemilarSeries] = useState([]);
  const [recomendedSeries, SetRecomendedSeries] = useState([]);
  const navigateTo = useNavigate();
  const { token, isLogged } = useContext(Authentication);

  const [isSerieExistOntheWatchList, setIsSerieExistOntheWatchList] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [trailer, setTrailer] = useState("");

  const [showMore, setShowMore] = useState(false);

  const [moreSerieInfo, setMoreSerieIngo] = useState({});

  const [info, setInfo] = useState({
    title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/userWatchlist",
          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );

        if (
          !response.data.watchlist.series.find(
            (serie) => +serie.id === +info.id
          )
        ) {
          setIsSerieExistOntheWatchList(false);
        } else {
          setIsSerieExistOntheWatchList(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, info.id]);

  useEffect(() => {
    const getSerieInformation = async () => {
      setLoading(false);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );
        await setInfo(response.data);
        console.log(response.data);
        setLoading(true);
      } catch (err) {
        console.error("Error fetching serie information", err);
        setLoading(false);
      }
    };

    getSerieInformation();
    scrollToTop();
  }, [serieId]);

  const addToWatchListHandler = async () => {
    if (isLogged) {
      const response = await axios.post(
        "http://localhost:9000/addSerieToWatchList",
        {
          serieName: info.name,
          serieId: info.id,
          serieImage: info.poster_path,
        },
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      setIsSerieExistOntheWatchList(true);
      try {
      } catch (err) {
        console.log("error adding the movie to watchlist");
        setIsSerieExistOntheWatchList(false);
      }
    } else {
      navigateTo("/login");
    }
  };

  const deleteSerieFromWatchListHandler = async () => {
    if (isLogged) {
      try {
        const response = await axios.post(
          "http://localhost:9000/deleteSerieFromWatchList",
          {
            serieId: info.id,
          },
          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );

        console.log(response.data);
        setIsSerieExistOntheWatchList(false);
      } catch (err) {
        console.log(err);
        setIsSerieExistOntheWatchList(true);
      }
    } else {
      navigateTo("/login");
    }
  };

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        const firstVideoKey = response.data.results[0]?.key;

        setTrailer(firstVideoKey);
      } catch (err) {
        console.log(
          "error geting the movie trailer in the movie information page"
        );
      }
    };

    getTrailer();
  }, [serieId]);

  useEffect(() => {
    const getMoreInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );
        await setMoreSerieIngo(response.data);
      } catch (err) {
        console.error("Error fetching serie information", err);
      }
    };

    getMoreInfo();
  }, [serieId]);

  useEffect(() => {
    const getSemilarSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        await setSemilarSeries((prevTrendingMovies) => {
          return [...prevTrendingMovies, ...response.data.results];
        });
      } catch (err) {
        console.log(
          "error getting the semilar series from the serie info web site movies page"
        );
      }
    };

    getSemilarSeries();
  }, [serieId]);

  useEffect(() => {
    const getRecomendedSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/recommendations?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        await SetRecomendedSeries((prevTrendingMovies) => {
          return [...prevTrendingMovies, ...response.data.results];
        });
      } catch (err) {
        console.log(
          "error getting the semilar movies from the movie info web site movies page"
        );
      }
    };

    getRecomendedSeries();
  }, [serieId]);

  return (
    <React.Fragment>
      {loading === false && <LoadingSpinner />}

      <Helmet>
        <title>{info.name}</title>
      </Helmet>
      {loading === true && (
        <React.Fragment>
          <div
            className="movie-info-container"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${info.backdrop_path}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="dark-overlay"></div>
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${info.poster_path}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "300px",
                height: "450px",
              }}
              draggable={false}
              className="movie-card hero active"
            ></div>

            <div className="movie-information active" draggable={false}>
              <div className="movie-info">
                <p>HD</p>
                <p>
                  IMDB:{" "}
                  {+info.vote_average !== null && info.vote_average.toFixed(1)}
                </p>
                <p>{info.first_air_date}</p>
                <p>{info.original_language}</p>
              </div>
              <h2>{info.name}</h2>
              <div className="genre-btns-container">
                {info &&
                  info.genres &&
                  info.genres.length !== 0 &&
                  info.genres.map((genre) => (
                    <button className="genre-btn" key={genre.id}>
                      <Link to={`/series/${genre.id}`}>{genre.name}</Link>
                    </button>
                  ))}
              </div>
              <p>
                {showMore
                  ? info.overview
                  : `${info.overview.split(" ").slice(0, 40).join(" ")} ${
                      info.overview.split(" ").slice(0, 40).length < 40
                        ? ""
                        : ". . ."
                    }`}

                {info.overview.split(" ").slice(0, 40).length < 40 ? (
                  ""
                ) : (
                  <span
                    className="show-more"
                    onClick={() => {
                      setShowMore((oldValue) => {
                        return !oldValue;
                      });
                    }}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </span>
                )}
              </p>

              {moreSerieInfo &&
                moreSerieInfo.cast &&
                moreSerieInfo.cast.length !== 0 && (
                  <div className="top-casts">
                    <h3>Top Casts</h3>
                    <div className="cast-container">
                      {moreSerieInfo.cast.slice(0, 4).map((cast) => (
                        <Link
                          to={`/star/${cast.id}`}
                          style={{
                            backgroundImage: `url(http://image.tmdb.org/t/p/original/${cast.profile_path})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                          className="cast-image"
                          key={cast.id}
                        ></Link>
                      ))}
                    </div>
                  </div>
                )}

              {isSerieExistOntheWatchList === false && (
                <button
                  className="add-to-watchlist"
                  onClick={addToWatchListHandler}
                >
                  <FontAwesomeIcon icon={faPlus} className="add" /> Add to
                  Watchlist
                </button>
              )}

              {isSerieExistOntheWatchList === true && (
                <button
                  className="add-to-watchlist"
                  onClick={deleteSerieFromWatchListHandler}
                >
                  <FontAwesomeIcon icon={faCheck} className="add" /> In
                  Watchlist
                </button>
              )}
            </div>
          </div>

          {trailer !== undefined && (
            <div className="trailer-container">
              <iframe
                title="YouTube Video"
                width="740"
                height="440"
                src={`https://www.youtube.com/embed/${trailer}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {semilarSeries.length !== 0 && (
            <SerieSlide
              movies={semilarSeries}
              title="Similar Series"
              link={`/similarSeries/${serieId}`}
            />
          )}
          {recomendedSeries.length !== 0 && (
            <SerieSlide
              movies={recomendedSeries}
              title="Recommended Series"
              link={`/recomendedSeries/${serieId}`}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Serie_Information;
