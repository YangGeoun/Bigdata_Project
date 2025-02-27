import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Scatter } from "react-chartjs-2";
import { useSearchParams } from 'react-router-dom';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

const Shap = () => {
  const [csvData, setCsvData] = useState([]);
  const [scatterData, setScatterData] = useState(null);

  const [searchParams] = useSearchParams();

  const col = searchParams.get('col');

  const indexObj = {
    "Injection_Time" : 1285,
    "Cycle_Time" : 1285,
    "Clamp_Close_Time": 1285,
    "Cushion_Position": 1285,
    "Plasticizing_Position": 4950,
    "Average_Screw_RPM": 1285,
    "Max_Switch_Over_Pressure": 1285,
    "Barrel_Temperature_3": 1285,
    "Barrel_Temperature_5": 1285,
    "Barrel_Temperature_6": 1285,
    "Hopper_Temperature": 1285
  }

  // CSV 데이터 로드
  useEffect(() => {
    fetch("/data/cn7.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        setCsvData(parsed.data);

        // 산점도 데이터를 변환
        const passData = [];
        const failData = [];
        let highlightPoint = null;

        parsed.data.forEach((row, index) => {
          const xValue = parseFloat(index); // Index 값
          const yValue = parseFloat(row[col]); // Injection_Time 값
          const label = row["PassOrFail"]; // PassOrFail 값

          if (label == 1) {
            passData.push({ x: xValue, y: yValue });
          } else if (label == 0) {
            failData.push({ x: xValue, y: yValue });
          }

          // 강조할 데이터 포인트 (예: index === 1869)
          if (index === indexObj[col]) {
            highlightPoint = { x: xValue, y: yValue };
          }
        });

        setScatterData({
          datasets: [
            {
              label: "Highlighted",
              data: highlightPoint ? [highlightPoint] : [],
              backgroundColor: "black", // 내부 채우기 색상
              borderColor: "black", // 외곽선 색상
              pointStyle: "crossRot",
              pointRadius: 10,
              borderWidth: 3,
            },
            {
              label: "Fail",
              data: failData,
              backgroundColor: "red",
              pointRadius: 3,
            },
            {
              label: "Pass",
              data: passData,
              backgroundColor: "blue",
              pointRadius: 3,
            },
          ],
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  return (
    <div>

      {/* 산점도 차트 */}
      {scatterData && (
        <div style={{ width: "800px", height: "400px" }}>
          <Scatter
            data={scatterData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: col + " 변수 산점도",
                  font: { size: 20 },
                },
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                xAxis: {
                  type: "linear",
                  title: {
                    display: true,
                    text: "Index",
                  },
                },
                yAxis: {
                  title: {
                    display: true,
                    text: "Injection_Time",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Shap;
