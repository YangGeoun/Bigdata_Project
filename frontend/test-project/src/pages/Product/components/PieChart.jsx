import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function PieChart({ passCount, failCount }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // 기존 차트가 있다면 삭제
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    // 차트 생성
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["양품 (Pass)", "불량품 (Fail)"],
        datasets: [
          {
            data: [passCount, failCount], 
            backgroundColor: ["#4CAF50", "#F44336"], 
            borderColor: ["#388E3C", "#D32F2F"], 
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "불량/양품 비율", 
          },
        },
      },
    });
  }, [passCount, failCount]); 

  return <canvas ref={chartRef} width="400" height="400"></canvas>;
}

export default PieChart;
