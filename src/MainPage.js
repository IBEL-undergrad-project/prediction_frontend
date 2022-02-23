import React from "react";
import Utils from "./utils/utils";
import "chart.js/auto";
import { Doughnut /*getDatasetAtEvent*/ } from "react-chartjs-2";

let data = {
  labels: ["이재명", "윤석열", "안철수", "심상정", "허경영"],
  datasets: [
    {
      label: "My First Dataset",
      data: [140, 120, 100, 75, 10],
      backgroundColor: ["#4FC1E8", "#ED5564", "#A0D568", "#FFCE54", "#AC92EB"],
      hoverOffset: 4,
    },
  ],
};
let options = {
  responsive: false,
};

function MainPage({ selected }) {
  const putBet = () => {
    // interact with ether network
  };

  return (
    <div className="row p-5">
      <div className="d-flex justify-content-center">
        <img
          src={process.env.PUBLIC_URL + `/img/${selected}.jpg`}
          style={{
            height: "8em",
            width: "8em",
            borderRadius: "5%",
            marginRight: "1em",
          }}
          alt={selected}
        />
      </div>
      <div className="d-flex justify-content-center mt-2">
        {Utils.mapSurnameToName(selected)}
      </div>
      <div className="col d-flex justify-content-center mt-3">
        <input type="text" placeholder="in ethers" />
        <div className="btn btn-primary" onClick={putBet}>
          베팅하기
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Doughnut
          data={data}
          options={options}
          /*getDatasetAtEvent={Utils.getStatusDataFromEthereum}*/
        />
      </div>
    </div>
  );
}

export default MainPage;
