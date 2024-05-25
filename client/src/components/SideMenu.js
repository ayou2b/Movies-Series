import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideMenu.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import MoviesGenre from "./UI/Movie_Genres";
import SeriesGenre from "./UI/Serie_Genres";

function SideMenu(props) {
  const location = useLocation();
  const currentPathname = location.pathname;
  const [genreId, setGenreId] = useState("");

  let isLogged = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const pathnameArray = currentPathname.split("/");
    const thirdElement = pathnameArray[2];
    setGenreId(thirdElement);
  }, [currentPathname]);

  return (
    <div className={props.isOpen === true ? "sidemenu active" : "sidemenu"}>
      <ul>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/series">Series</Link>
        </li>
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
      </ul>
      {currentPathname.includes("/movies") && <MoviesGenre genre={genreId} />}
      {currentPathname.includes("/series") && <SeriesGenre genre={genreId} />}

      <ul>
        {isLogged === null && (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </React.Fragment>
        )}

        {isLogged !== null && (
          <li
            onClick={() => {
              props.onLogout();
            }}
          >
            Logout
          </li>
        )}
      </ul>

      <button
        className="close"
        onClick={() => {
          props.close();
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default SideMenu;
