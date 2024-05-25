import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./context/Authentication";

import "./App.css";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";

import Home from "./pages/Home";
// movies
import TopRatedMovies from "./pages/Movies/Top_Rated_Movies";
import TrendingMovies from "./pages/Movies/Trending_Movies";
import Movies from "./pages/Movies/Movies";
import MoviesByGenre from "./pages/Movies/Movies_By_Genre";
import MovieInformation from "./pages/Movies/Movie_Information";
import SimilarMovies from "./pages/Movies/Similar_Movies";
import RecomendedMovies from "./pages/Movies/RecomendedMovies";
import SearchMovie from "./pages/Movies/Search_Movie";

import Star from "./pages/Star";
import StarMovies from "./pages/Star_Movies";

// series
import Series from "./pages/Series/Series";
import TopRatedSeries from "./pages/Series/Top_Rated_Series";
import TrendingSeries from "./pages/Series/Trending_Series";
import SeriesByGenre from "./pages/Series/Series_By_Genre";
import SerieInformation from "./pages/Series/Serie_Information";
import RecomndedSeries from "./pages/Series/Recomnded_Series";
import SimilarSeries from "./pages/Series/SimilarSeries";
import SerachSerie from "./pages/Series/Serach_Serie";

import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

import Watchlist from "./pages/Watchlist";

import PageNotFound from "./pages/Page_Not_Found";

let logoutTimer;
function App() {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [expirationTime, setExpirationTime] = useState("");

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => {
    setIsSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const LoginHandLer = useCallback((userToken, logged, expiration) => {
    setToken(userToken);
    setIsLogged(logged);

    const expirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

    setExpirationTime(expirationDate);

    localStorage.setItem("token", userToken);
    localStorage.setItem("isLoggedIn", logged);
    localStorage.setItem("expiration", expirationDate);
  }, []);

  //  logout handler

  const logoutHandler = useCallback(() => {
    setToken("");
    setIsLogged(false);
    setExpirationTime("");

    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expiration");
  }, []);

  // auto logout handler

  useEffect(() => {
    if (token && expirationTime) {
      const remainingTime = expirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expirationTime, logoutHandler]);

  // auto login

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsloggedIn = localStorage.getItem("isLoggedIn");
    const storedExpirationTine = localStorage.getItem("expiration");

    if (
      storedToken &&
      storedIsloggedIn &&
      new Date(storedExpirationTine) > new Date()
    ) {
      LoginHandLer(
        storedToken,
        storedIsloggedIn,
        new Date(storedExpirationTine)
      );
    }
  }, [LoginHandLer]);

  return (
    <div className="App">
      <Authentication.Provider
        value={{ token: token, isLogged: isLogged, expiration: expirationTime }}
      >
        <Router>
          <Header onLogout={logoutHandler} open={openSideMenu} />
          <SideMenu
            close={closeSideMenu}
            isOpen={isSideMenuOpen}
            onLogout={logoutHandler}
          />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:genreId" element={<MoviesByGenre />} />
            <Route path="/similarMovies/:movieId" element={<SimilarMovies />} />
            <Route
              path="/recomendedMovies/:movieId"
              element={<RecomendedMovies />}
            />
            <Route path="/topRatedMovies" element={<TopRatedMovies />} />
            <Route path="/trendingMovies" element={<TrendingMovies />} />
            <Route path="/movie/:movieId" element={<MovieInformation />} />
            <Route path="/movieByName/:movieName" element={<SearchMovie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/topRatedSeries" element={<TopRatedSeries />} />
            <Route path="/trendingSeries" element={<TrendingSeries />} />
            <Route path="/series/:genreId" element={<SeriesByGenre />} />
            <Route path="/serie/:serieId" element={<SerieInformation />} />
            <Route
              path="/recomendedSeries/:serieId"
              element={<RecomndedSeries />}
            />
            <Route path="/similarSeries/:serieId" element={<SimilarSeries />} />
            <Route path="serieByName/:serieName" element={<SerachSerie />} />

            <Route path="/star/:starId" element={<Star />} />
            <Route path="/star/movies/:starId" element={<StarMovies />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={LoginHandLer} />} />

            <Route path="/watchlist" element={<Watchlist />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Footer />
        </Router>
      </Authentication.Provider>
    </div>
  );
}

export default App;
