import React from "react";
import SidebarTab from "./components/SidebarTab";

function Sidebar({ names, selected, changeSelectedTo }) {
  return (
    <div className="d-flex flex-column full-height justify-content-evenly">
      {names.map((name) => {
        if (name !== "heo")
          return (
            <SidebarTab
              name={name}
              key={name}
              changeSelectedTo={changeSelectedTo}
              selected={selected}
              className="flex-fill"
            />
          );
        else
          return (
            <SidebarTab
              name={name}
              key={name}
              changeSelectedTo={changeSelectedTo}
              selected={selected}
              className="flex-fill"
            />
          );
      })}
    </div>
  );
}

export default Sidebar;
