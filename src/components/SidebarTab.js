import React from "react";
import mapSurnameToName from "../components/utils";

function SidebarTab({ name }) {
  return (
    <div className="bg-light p-3" style={{ cursor: "pointer" }}>
      <img
        src={process.env.PUBLIC_URL + `/img/${name}.jpg`}
        style={{
          height: "1.5em",
          width: "1.5em",
          borderRadius: "50%",
          marginRight: "1em",
        }}
        alt={name}
      />
      {mapSurnameToName(name)}
    </div>
  );
}

export default SidebarTab;
