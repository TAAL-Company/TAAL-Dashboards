import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const ChartComponent = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const now = new Date().getTime();
      const data = [];
      for (let i = 0; i < 30; i++) {
        const timestamp = now - i * 24 * 60 * 60 * 1000;
        const dateObj = new Date(timestamp);
        const dateStr = dateObj.toISOString();
        const rate = Math.random() * 0.4 + 1.2; // generate random rates between 1.2 and 1.6
        data.push({ x: dateStr, y: rate });
      }
      data.sort((a, b) => a.x.localeCompare(b.x));
      setDataPoints(data);
    };
    generateData();
  }, []);

  const data = {
    datasets: [
      {
        label: "Dollar/USD",
        data: dataPoints,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Dollar/USD Exchange Rate",
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            unitStepSize: 7,
            displayFormats: {
              week: "MMM DD",
            },
            parser: (timestamp) => {
              const date = new Date(timestamp);
              const rounded = new Date(
                date.getTime() - date.getDay() * 24 * 60 * 60 * 1000
              );
              return rounded.toISOString();
            },
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Exchange Rate",
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
