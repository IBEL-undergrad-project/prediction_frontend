import React from "react";
import mapSurnameToName from "./components/utils";

function MainPage({ selected }) {
  const putBet = () => {
    // interact with ether network
  };
  return (
    <div className="row p-2">
      <div className="d-flex justify-content-center">
        <img
          src={process.env.PUBLIC_URL + `/img/${selected}.jpg`}
          style={{
            height: "10em",
            width: "10em",
            borderRadius: "5%",
            marginRight: "1em",
          }}
          alt={selected}
        />
      </div>
      <div className="d-flex justify-content-center mt-2">
        {mapSurnameToName(selected)}
      </div>
      <div className="col d-flex justify-content-center mt-3">
        <input type="text" placeholder="in ethers" />
        <div className="btn btn-primary" onClick={putBet}>
          베팅하기
        </div>
      </div>
    </div>
  );
}

export default MainPage;
