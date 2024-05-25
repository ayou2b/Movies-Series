import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import "../../App.css";
import "../../components/HeroSlider.css";

import MovieSlide from "../../components/Movie_Slide";

import LoadingSpinner from "../../components/Loading_Spinner";
import Authentication from "../../context/Authentication";

function MovieInformation() {
  const { movieId } = useParams();
  const navigateTo = useNavigate();
  const [semilarMovies, setSemilarMovies] = useState([]);
  const [recomendedMovies, setRecomendedMovies] = useState([]);
  const [trailer, setTrailer] = useState("");

  const { token, isLogged } = useContext(Authentication);

  const [moreMovieInfo, setMoreMovieInfo] = useState({});

  const [isMovieExistOntheWatchList, setIsMovieExistOntheWatchList] =
    useState(false);

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

  const [showMore, setShowMore] = useState(false);

  const [loading, setLoading] = useState(false);

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
          !response.data.watchlist.movies.find(
            (movie) => +movie.id === +info.id
          )
        ) {
          setIsMovieExistOntheWatchList(false);
        } else {
          setIsMovieExistOntheWatchList(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, info.id]);

  const addToWatchListHandler = async () => {
    if (isLogged) {
      const response = await axios.post(
        "https://movies-series-3.onrender.com/addMovieToWatchList",
        {
          movieTitle: info.title,
          movieId: info.id,
          movieImage: info.poster_path,
        },
        {
          headers: {
            authorisation: "Bearer " + token,
          },
        }
      );
      console.log(response);
      setIsMovieExistOntheWatchList(true);
    } else {
      navigateTo("/login");
    }
    try {
    } catch (err) {
      console.log("error adding the movie to watchlist");
      setIsMovieExistOntheWatchList(false);
    }
  };

  const deleteMovieFromWatchListHandler = async () => {
    if (isLogged) {
      try {
        const response = await axios.post(
          "https://movies-series-3.onrender.com/deleteMovieFromWatchList",
          {
            movieId: info.id,
          },
          {
            headers: {
              authorisation: "Bearer " + token,
            },
          }
        );
        console.log(response);
        setIsMovieExistOntheWatchList(false);
      } catch (err) {
        console.log(err);
        setIsMovieExistOntheWatchList(true);
      }
    } else {
      navigateTo("/login");
    }
  };

  useEffect(() => {
    setLoading(false);
    const getMovieInformation = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );
        await setInfo(response.data);
        console.log(response.data);
        setLoading(true);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching movie information", err);
      }
    };

    getMovieInformation();

    scrollToTop();
  }, [movieId]);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f2552b7af8b6069509ae2de03f1c8c85`
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
  }, [movieId]);

  useEffect(() => {
    const getMoreInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );
        await setMoreMovieInfo(response.data);
      } catch (err) {
        console.error("Error fetching more movie information", err);
      }
    };

    getMoreInfo();
  }, [movieId]);

  useEffect(() => {
    const getSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setSemilarMovies(response.data.results);
      } catch (err) {
        console.log(
          "error getting the semilar movies from the movie info web site movies page"
        );
      }
    };

    getSimilarMovies();
  }, [movieId]);

  useEffect(() => {
    const getRecomendedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setRecomendedMovies(response.data.results);
      } catch (err) {
        console.log(
          "error getting the semilar movies from the movie info web site movies page"
        );
      }
    };

    getRecomendedMovies();
  }, [movieId]);

  return (
    <React.Fragment>
      {loading === false && <LoadingSpinner />}

      <Helmet>
        <title>{info.title}</title>
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
              }}
              draggable={false}
              className="movie-card hero active"
            ></div>

            <div className="movie-information active" draggable={false}>
              <div className="movie-info">
                <p>HD</p>

                {+info.vote_average !== null && (
                  <p>IMDB : {info.vote_average.toFixed(1)}</p>
                )}

                <p>{info.release_date}</p>
                <p>{info.original_language}</p>
              </div>
              <h2>{info.title}</h2>
              <div className="genre-btns-container">
                {info.genres &&
                  info.genres.length !== 0 &&
                  info.genres.map((genre) => (
                    <button className="genre-btn" key={genre.id}>
                      <Link to={`/movies/${genre.id}`}>{genre.name}</Link>
                    </button>
                  ))}
              </div>
              <p>
                {info.overview.split(" ").length < 40 && info.overview}

                {info.overview.split(" ") === 40 && info.overview}

                {info.overview.split(" ").length > 40 ? (
                  <>
                    {showMore ? (
                      <>
                        {info.overview}
                        <span
                          className="show-more"
                          onClick={() => {
                            setShowMore(false);
                          }}
                        >
                          {" Show Less"}
                        </span>
                      </>
                    ) : (
                      <>
                        {info.overview.split(" ").slice(0, 40).join(" ")}
                        {" . . ."}
                        <span
                          className="show-more"
                          onClick={() => {
                            setShowMore(true);
                          }}
                        >
                          {" Show More"}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  info.overview
                )}
              </p>

              {moreMovieInfo &&
                moreMovieInfo.cast &&
                moreMovieInfo.cast.length !== 0 && (
                  <div className="top-casts">
                    <h3>Top Casts</h3>
                    <div className="cast-container">
                      {moreMovieInfo.cast.slice(0, 4).map((cast) => (
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
              {isMovieExistOntheWatchList === false && (
                <button
                  className="add-to-watchlist"
                  onClick={addToWatchListHandler}
                >
                  <FontAwesomeIcon icon={faPlus} className="add" /> Add to
                  Watchlist
                </button>
              )}

              {isMovieExistOntheWatchList === true && (
                <button
                  className="add-to-watchlist"
                  onClick={deleteMovieFromWatchListHandler}
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

          {semilarMovies.length !== 0 && (
            <MovieSlide
              movies={semilarMovies}
              title="Similar Movies"
              link={`/SimilarMovies/${info.id}`}
            />
          )}

          {recomendedMovies.length !== 0 && (
            <MovieSlide
              movies={recomendedMovies}
              title="Recommended Movies"
              link={`/recomendedMovies/${info.id}`}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default MovieInformation;
