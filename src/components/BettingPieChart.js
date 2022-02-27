import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Utils from "../utils/utils";

function BettingPieChart({ contract }) {
  const [stats, setStats] = useState([1, 1, 1, 1, 1]);
  const [chartData, setChartData] = useState(Utils.wrapChartData());

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    Utils.updateData(contract)
      .then((stats) => {
        console.log("컨트랙트 로딩 완료!");
        setStats(stats);
        setChartData(Utils.wrapChartData(stats));
      })
      .catch((err) => console.log("컨트랙트가 아직 로딩되지 않았습니다"));
  }, [contract]);

  return (
    <div>
      <Doughnut data={chartData} options={options} width={300} height={300} />
    </div>
  );
}

export default BettingPieChart;
