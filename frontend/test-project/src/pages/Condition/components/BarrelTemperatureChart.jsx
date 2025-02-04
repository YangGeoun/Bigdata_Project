import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js의 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BarrelTemperatureChart({ conditionList }) {
  // conditionList에서 데이터 추출
  const ids = conditionList.map((item) => item.id);
  const barrelTemperatures = conditionList.map((item) => item.barrel_temperature_1);

  // Chart.js 데이터 및 옵션 설정
  const data = {
    labels: ids, // x축 레이블 (ID)
    datasets: [
      {
        label: "Barrel Temperature 1",
        data: barrelTemperatures, // y축 데이터
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        pointBackgroundColor: "blue",
        tension: 0.4, // 곡선의 부드러움 조정
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Barrel Temperature Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "ID",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default BarrelTemperatureChart;
