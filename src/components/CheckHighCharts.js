import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";

const CheckHighCharts = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const now = new Date().getTime();
      const data = [];
      for (let i = 0; i < 30; i++) {
        const timestamp = now - i * 24 * 60 * 60 * 1000;
        const rate = Math.random() * 0.4 + 1.2; // generate random rates between 1.2 and 1.6
        data.push([timestamp, rate]);
      }
      data.sort((a, b) => a[0] - b[0]);
      setDataPoints(data);
    };
    generateData();
  }, []);

  useEffect(() => {
    Highcharts.chart("chart-container", {
      title: {
        text: "Dollar/USD Exchange Rate",
      },
      xAxis: {
        type: "datetime",
        tickInterval: 7 * 24 * 60 * 60 * 1000, // set tick interval to 7 days
      },
      yAxis: {
        title: {
          text: "Exchange Rate",
        },
      },
      series: [
        {
          name: "Dollar/USD",
          data: dataPoints,
          tooltip: {
            valueDecimals: 4,
          },
        },
      ],
    });
  }, [dataPoints]);

  return <div id="chart-container"></div>;
};

export default CheckHighCharts;
