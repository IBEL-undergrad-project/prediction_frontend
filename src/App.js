import MainPage from "./MainPage";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [selected, setSelected] = useState();
  const [account, setAccount] = useState();
  const [provider, setProvider] = useState();
  const names = ["lee", "yoon", "ahn", "shim", "heo"];

  const changeSelectedTo = (name) => {
    setSelected(name);
  };

  const configureEthereumConnection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider
      .send("eth_requestAccounts", [])
      .then((result) => console.log(result[0]))
      .catch((error) => console.log(error));
    const signer = provider.getSigner();
  };

  useEffect(() => {
    setSelected("lee");
    configureEthereumConnection();
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
    </div>
  );
}

export default App;
