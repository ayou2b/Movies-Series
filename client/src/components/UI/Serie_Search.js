import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Movie_Search.css";

function Serie_Search() {
  const navigateTo = useNavigate();
  const [serieName, setSerieName] = useState("");

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const searchHandLer = () => {
    navigateTo(`/serieByName/${serieName}`);
  };

  return (
    <div className="search">
      <div className={`my-form ${isInputFocused ? "focused" : ""}`}>
        <form onSubmit={searchHandLer}>
          <input
            placeholder="Search Series"
            onChange={(e) => {
              setSerieName(e.target.value);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          ></input>
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Serie_Search;
