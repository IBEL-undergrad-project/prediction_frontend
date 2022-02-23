import React from "react";
import Utils from "../utils/utils";

function SidebarTab({ name, selected, changeSelectedTo }) {
  return (
    <div
      className="bg-light p-3 d-flex flex-fill align-items-center border_bottom"
      style={{ cursor: "pointer", fontSize: "1.5em" }}
      onClick={() => changeSelectedTo(name)}
    >
      <img
        src={process.env.PUBLIC_URL + `/img/${name}.jpg`}
        style={{
          height: "2em",
          width: "2em",
          borderRadius: "50%",
          marginRight: "1em",
        }}
        alt={name}
      />
      {Utils.mapSurnameToName(name)}
    </div>
  );
}

export default SidebarTab;
