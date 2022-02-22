import React from "react";
import SidebarTab from "./components/SidebarTab";

function Sidebar({ names, selected, changeSelectedTo }) {
  return (
    <div className="col">
      {names.map((name) => {
        if (name !== "heo")
          return (
            <>
              <SidebarTab
                name={name}
                key={name}
                changeSelectedTo={changeSelectedTo}
                selected={selected}
              />
              <hr className="m-0" />
            </>
          );
        else
          return (
            <SidebarTab
              name={name}
              key={name}
              changeSelectedTo={changeSelectedTo}
              selected={selected}
            />
          );
      })}
    </div>
  );
}

export default Sidebar;
