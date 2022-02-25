import MainPage from "./MainPage";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Utils from "./utils/utils";
import FloatingMenu from "./components/FloatingMenu";

function App() {
  const [selected, setSelected] = useState();

  const names = ["lee", "yoon", "ahn", "shim", "heo"];

  const changeSelectedTo = (name) => {
    setSelected(name);
  };

  useEffect(() => {
    setSelected("lee");
    Utils.configureEthereumConnection();
  }, []);

  return (
    <div className="App">
      <div className="row">
        <div className="col-4">
          <Sidebar
            names={names}
            selected={selected}
            changeSelectedTo={changeSelectedTo}
          />
        </div>
        <div className="col-8">
          <MainPage selected={selected} />
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default App;
