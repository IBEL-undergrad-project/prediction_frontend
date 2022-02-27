import React from "react";
import Utils from "./utils/utils";

function Sidebar({ names, selected, changeSelectedTo }) {
  const checkBorderExist = (surname) => {
    return surname !== "heo" ? "border-bottom" : null;
  };

  return (
    <div className="d-flex flex-column justify-content-evenly full-height">
      {names.map((name) => (
        <div
          className={
            `bg-light p-3 d-flex flex-fill align-items-center pointer font15em ` +
            checkBorderExist(name)
          }
          onClick={() => changeSelectedTo(name)}
          key={name}
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
      ))}
    </div>
  );
}

export default Sidebar;
