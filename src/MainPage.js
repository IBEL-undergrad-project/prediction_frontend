import React from "react";
import mapSurnameToName from "./components/utils";

function MainPage({ selected }) {
  return <div className="col">{mapSurnameToName(selected)}</div>;
}

export default MainPage;
