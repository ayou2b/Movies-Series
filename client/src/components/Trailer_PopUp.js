import React from "react";
import "../App.css";

function Trailer_PopUp(props) {
  return (
    <div className="overlay">
      <div
        className="popup-container"
        onClick={() => {
          props.onClose(false);
        }}
      >
        <iframe
          title="YouTube Video"
          width="740"
          height="440"
          src={`https://www.youtube.com/embed/${props.videoKey}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Trailer_PopUp;
