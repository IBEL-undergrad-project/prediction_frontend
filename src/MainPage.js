import React, { useState } from "react";
import Utils from "./utils/utils";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

// temp data
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
  responsive: true,
  maintainAspectRatio: false,
};

function MainPage({ selected }) {
  const [betAmount, setBetAmount] = useState("");
  const onChange = (e) => {
    setBetAmount(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="in ethers"
            onChange={onChange}
            value={betAmount}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value="베팅하기"
          ></input>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Doughnut data={data} options={options} width={300} height={300} />
      </div>
    </div>
  );
}

export default MainPage;
