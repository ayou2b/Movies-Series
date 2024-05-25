import React from "react";
import { Link, useLocation } from "react-router-dom";
import bgImage from "../images/topHeaderBg.jpg";

import "./Footer.css";

function Footer() {
  const location = useLocation();
  const currentPathname = location.pathname;

  const style = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };
  return (
    <footer
      className={
        currentPathname === "/login" || currentPathname === "/signup"
          ? "active"
          : ""
      }
      style={style}
    >
      <div className="links">
        <Link to="/movies">All Movies</Link>
        <Link to="/trendingMovies">Trending Movies</Link>
        <Link to="/topRatedMovies">Top Rated Movies</Link>
      </div>

      <div className="links">
        <Link to="/series">All Series</Link>
        <Link to="/trendingSeries">Trending Series</Link>
        <Link to="/topRatedSeries">Top Rated Series</Link>
      </div>
    </footer>
  );
}

export default Footer;
