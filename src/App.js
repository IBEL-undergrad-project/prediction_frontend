import MainPage from "./MainPage";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Utils from "./utils/utils";
import FloatingMenu from "./components/FloatingMenu";

function App() {
  const [selected, setSelected] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [endDate, setEndDate] = useState(Date.now());

  const names = ["lee", "yoon", "ahn", "shim", "heo"];

  const changeSelectedTo = (name) => {
    setSelected(name);
  };

  const setEtherObjStates = (etherObj) => {
    setProvider(etherObj.provider);
    setSigner(etherObj.signer);
    setContract(etherObj.contract);
  };

  const setBettingEndDate = (contract) => {
    Utils.getBettingEndDate(contract)
      .then((date) => setEndDate(date))
      .catch((err) => console.log("컨트랙트가 아직 로딩되지 않았습니다."));
  };

  useEffect(() => {
    setSelected("lee");
    Utils.configureEthereumConnection().then((etherObj) =>
      setEtherObjStates(etherObj)
    );
  }, []);

  useEffect(() => {
    setBettingEndDate(contract);
  }, [contract]);

  return (
    <div className="App">
      <div className="row full-height full-width">
        <div className="col-4">
          <Sidebar
            names={names}
            selected={selected}
            changeSelectedTo={changeSelectedTo}
          />
        </div>
        <div className="col-8">
          <MainPage selected={selected} signer={signer} contract={contract} />
        </div>
      </div>
      <FloatingMenu
        provider={provider}
        contract={contract}
        signer={signer}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
