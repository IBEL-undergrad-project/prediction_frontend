import React from "react";
import SidebarTab from "./components/SidebarTab";

function Sidebar({ names, selected, setSelected }) {
  return (
    <div className="col">
      {names.map((name) => {
        if (name !== "heo")
          return (
            <>
              <SidebarTab
                onClick={() => setSelected({ name })}
                name={name}
                className={name === selected ? "selected" : null}
                key={name}
              />
              <hr className="m-0" />
            </>
          );
        else return <SidebarTab name={name} setSelected={setSelected} />;
      })}
    </div>
  );
}

export default Sidebar;
