import React from "react";
import bgImage from "../images/topHeaderBg.jpg";

import "./TopHeader.css";

function TopHeader(props) {
  const style = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={style} className="top-header">
      <div className="overlay"></div>
      <h3>{props.title}</h3>
    </div>
  );
}

export default TopHeader;
