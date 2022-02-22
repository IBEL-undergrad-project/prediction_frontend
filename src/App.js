import MainPage from "./MainPage";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

function App() {
  const [selected, setSelected] = useState();
  const names = ["lee", "yoon", "ahn", "shim", "heo"];
  useEffect(() => {
    setSelected("lee");
  }, []);
  return (
    <div className="App">
      <div className="row">
        <div className="col-4">
          <Sidebar
            names={names}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-8">
          <MainPage selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;
