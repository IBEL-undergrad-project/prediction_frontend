import React, { useState } from "react";
import Utils from "./utils/utils";
import "chart.js/auto";
import BettingPieChart from "./components/BettingPieChart";

function MainPage({ selected, signer, contract }) {
  const [betAmount, setBetAmount] = useState("");

  const num_regex = /^[0-9.]+$/;

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
      contract.placeBet(Utils.mapSurnameToSIDE(selected), {
        from: signer.getAddress(),
        value: Utils.parseEther(amount),
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
            height: "35vh",
            width: "35vh",
            borderRadius: "5%",
            marginRight: "1em",
          }}
          alt={selected}
        />
      </div>
      <div className="d-flex justify-content-center mt-2 font4vh">
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
      <div className="d-flex justify-content-center mt-5">
        <BettingPieChart contract={contract} />
      </div>
    </div>
  );
}

export default MainPage;
