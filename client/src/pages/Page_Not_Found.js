import React from "react";
import "../App.css";

import TopHeader from "../components/TopHeader";

function Page_Not_Found() {
  return (
    <React.Fragment>
      <TopHeader />
      <div className="page-not-found">
        <h1>Page Not Found</h1>
      </div>
    </React.Fragment>
  );
}

export default Page_Not_Found;
