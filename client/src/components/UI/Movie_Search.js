import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Movie_Search.css";

function Movie_Search() {
  const navigateTo = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const searchHandLer = () => {
    navigateTo(`/movieByName/${movieName}`);
  };

  return (
    <div className="search">
      <div className={`my-form ${isInputFocused ? "focused" : ""}`}>
        <form onSubmit={searchHandLer}>
          <input
            type="text"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search Movie"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Movie_Search;
