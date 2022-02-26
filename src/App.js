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

  const names = ["lee", "yoon", "ahn", "shim", "heo"];

  const changeSelectedTo = (name) => {
    setSelected(name);
  };

  const testCode = async () => {
    provider
      .send("eth_requestAccounts", [])
      .then((result) => {
        console.log(result[0]);
        console.log("Wallet now connected");
      })
      .catch((error) => console.log(error));

    console.log(
      contract.bets(1).then((result) => console.log(result.toString()))
    );
  };

  const setEtherObjStates = async (etherObj) => {
    setProvider(etherObj.provider);
    setSigner(etherObj.signer);
    setContract(etherObj.contract);
  };

  useEffect(() => {
    setSelected("lee");
    Utils.configureEthereumConnection().then((etherObj) =>
      setEtherObjStates(etherObj)
    );
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
          <MainPage selected={selected} signer={signer} contract={contract} />
        </div>
      </div>
      <FloatingMenu provider={provider} contract={contract} signer={signer} />
      <button onClick={testCode}>TEST</button>
    </div>
  );
}

export default App;
