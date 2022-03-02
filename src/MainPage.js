import React, { useState, useEffect } from "react";
import Utils from "./utils/utils";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function MainPage({ selected, signer, contract }) {
  const [betAmount, setBetAmount] = useState("");
  const [stats, setStats] = useState([1, 1, 1, 1, 1]);
  const [chartData, setChartData] = useState(Utils.wrapChartData());
  const [allocRatio, setAllocRatio] = useState([
    { key: 0, ratio: 1 },
    { key: 1, ratio: 1 },
    { key: 2, ratio: 1 },
    { key: 3, ratio: 1 },
    { key: 4, ratio: 1 },
  ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const num_regex = /^[0-9.]+$/;

  const updateChart = (contract) => {
    Utils.updateData(contract).then((stats) => {
      setStats(stats);
    });
  };

  useEffect(() => {
    updateChart(contract);
  }, [contract]);

  useEffect(() => {
    setChartData(Utils.wrapChartData(stats));
    setAllocRatio(Utils.getAllocRatio(stats));
  }, [stats]);

  const onChange = (e) => {
    if (num_regex.test(e.target.value)) setBetAmount(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;

    if (amount === "") {
      return;
    }

    if (parseFloat(amount) <= 0) {
      window.alert("베팅액은 0보다 많아야 합니다.");
      return;
    }

    if (
      window.confirm(
        Utils.mapSurnameToName(selected) +
          " 후보에게 " +
          amount +
          "이더만큼 베팅하시겠습니까?"
      )
    ) {
      contract
        .placeBet(Utils.mapSurnameToSIDE(selected), {
          from: signer.getAddress(),
          value: Utils.parseEther(amount),
        })
        .then((transactionResponse) => {
          transactionResponse.wait().then((receipt) => {
            updateChart(contract);
            window.alert("transaction has been confirmed");
          });
        });
    }

    setBetAmount("");
  };

  return (
    <div className="row p-5">
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
      <div className="d-flex justify-content-center mt-2 font15em">
        {Utils.mapSurnameToName(selected)}
      </div>
      <div className="col d-flex justify-content-center mt-3">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="amount"
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
      <hr className="mt-4" />
      <div className="d-flex justify-content-center mt-2 font15em">배당율</div>
      <div className="d-flex justify-content-center mt-4">
        <div style={{ height: "15em", width: "15em" }}>
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="row align-items-center" style={{ width: "150px" }}>
          {allocRatio.map((item) => (
            <div key={item.key}>
              {Utils.mapSurnameToName(item.key)} {item.ratio}배
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
