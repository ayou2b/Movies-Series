import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import HomeHero from "../components/Home_Hero_Slider";
import LoadingSpinner from "../components/Loading_Spinner";

import MoviesSlider from "../components/Movie_Slide";
import SerieSlide from "../components/Serie_Slide";

import TrailerPopUp from "../components/Trailer_PopUp";

import { Helmet } from "react-helmet";

import "../App.css";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [trendingSeries, setTrendingSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  const [trailerMovieId, setTrailerMovieId] = useState(null);

  const [trailerMovieVideoKey, setTrailerMovieVideoKey] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const openTrailerPopUpHandler = (isOpen, id) => {
    setIsTrailerOpen(isOpen);
    setTrailerMovieId(id);

    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        console.log(response.data.results[0].key);

        setTrailerMovieVideoKey(response.data.results[0].key);
      } catch (err) {
        console.log(
          "error getting the trending movies from the trending movies page"
        );
      }
    };

    getTrailer();

    console.log(id);
  };

  const closeTrailerPopUpHandler = (isOpen, id) => {
    setIsTrailerOpen(isOpen);
  };

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setTrendingMovies(response.data.results.slice(0, 20));

        setLoading(true);
      } catch (err) {
        console.log(
          "error getting the trending movies from the trending movies page"
        );

        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setTopRatedMovies(response.data.results.slice(0, 20));
        setLoading(true);
      } catch (err) {
        console.log(
          "error getting the trending movies from the trending movies page"
        );
        setLoading(false);
      }
    };

    getTopRatedMovies();
  }, []);

  useEffect(() => {
    const getTrendingSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setTrendingSeries(response.data.results.slice(0, 20));

        setLoading(true);
      } catch (err) {
        console.log(
          "error getting the trending movies from the trending movies page"
        );
        setLoading(false);
      }
    };

    getTrendingSeries();
  }, []);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=f2552b7af8b6069509ae2de03f1c8c85`
        );

        setTopRatedSeries(response.data.results.slice(0, 20));

        setLoading(true);
      } catch (err) {
        console.log(
          "error getting the trending movies from the trending movies page"
        );
        setLoading(false);
      }
    };

    getTopRatedMovies();
  }, []);

  return (
    <div>
      {loading === false && <LoadingSpinner />}

      <Helmet>
        <title>FMOVIES</title>
      </Helmet>

      <HomeHero movies={trendingMovies} onOpen={openTrailerPopUpHandler} />

      {isTrailerOpen === true && (
        <TrailerPopUp
          onClose={closeTrailerPopUpHandler}
          videoKey={trailerMovieVideoKey}
        />
      )}

      <MoviesSlider
        movies={trendingMovies}
        title="Trending Movies"
        link={`/trendingMovies`}
      />

      <MoviesSlider
        movies={topRatedMovies}
        title="Top Rated Movies"
        link={`/topRatedMovies`}
      />

      <SerieSlide
        movies={trendingSeries}
        title="Trending Series"
        link={`/trendingSeries`}
      />

      <SerieSlide
        movies={topRatedSeries}
        title="Top Rated Series"
        link={`/topRatedSeries`}
      />
    </div>
  );
}

export default Home;
