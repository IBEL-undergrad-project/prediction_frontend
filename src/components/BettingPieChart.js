import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Utils from "../utils/utils";

function BettingPieChart({ contract }) {
  const [stats, setStats] = useState([1, 1, 1, 1, 1]);
  const [chartData, setChartData] = useState(Utils.wrapChartData());
  const [allocRatio, setAllocRatio] = useState([1, 1, 1, 1, 1]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    Utils.updateData(contract)
      .then((stats) => {
        console.log("컨트랙트 로딩 완료!");
        setStats(stats);
      })
      .catch(() => console.log("컨트랙트가 아직 로딩되지 않았습니다"));
  }, [contract]);

  useEffect(() => {
    setChartData(Utils.wrapChartData(stats));
    setAllocRatio(Utils.getAllocRatio(stats));
  }, [stats]);

  return (
    <>
      <div style={{ height: "10em", height: "10em" }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="row align-items-center" style={{ width: "100px" }}>
        {allocRatio.map((item) => (
          <div>{item}배</div>
        ))}
      </div>
    </>
  );
}

export default BettingPieChart;
