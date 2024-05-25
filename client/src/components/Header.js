import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

function Header(props) {
  const location = useLocation();
  const currentPathname = location.pathname;
  const [scrollY, setScrollY] = useState(0);
  const navigateTo = useNavigate();
  let isLogged = localStorage.getItem("isLoggedIn");

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={scrollY > 70 ? "active" : ""}>
      <h1>
        <Link to="/">FMOVIES</Link>
      </h1>
      <ul className="normal">
        <li>
          <Link to="/movies">Movies</Link>
          <div
            className={
              currentPathname === "/movies" ? "underline active" : "underline"
            }
          ></div>
        </li>
        <li>
          <Link to="/series">Series</Link>
          <div
            className={
              currentPathname === "/series" ? "underline active" : "underline"
            }
          ></div>
        </li>

        <li>
          <Link to={isLogged === "true" ? "/watchlist" : "/login"}>
            Watchlist
          </Link>
          <div
            className={
              currentPathname === "/watchlist"
                ? "underline active"
                : "underline"
            }
          ></div>
        </li>

        {isLogged === null && (
          <div className="auth-co">
            <li className="auth">
              <Link to="/login">Login</Link>
            </li>
            <li className="auth">
              <Link to="/signup">Sign Up</Link>
            </li>
          </div>
        )}

        {isLogged === "true" && (
          <li
            className="auth logout"
            onClick={() => {
              props.onLogout();
              if (currentPathname === "/watchlist") {
                navigateTo("/");
              }
            }}
          >
            Logout
          </li>
        )}
      </ul>

      <button
        className="bars"
        onClick={() => {
          props.open();
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
}

export default Header;
