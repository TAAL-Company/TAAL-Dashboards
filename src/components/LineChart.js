import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "2023-01-22T09:27:58.000Z",
    "2023-02-22T09:27:58.000Z",
    "2023-02-22T09:27:58.000Z",
    "2023-03-22T09:27:58.000Z",
    "2023-04-22T09:27:58.000Z",
    "2023-05-22T09:27:58.000Z",
    "2023-06-22T09:27:58.000Z",
    "2023-02-23T09:27:58.000Z",
    "2023-02-28T09:27:58.000Z",
  ],
  datasets: [
    {
      label: "washing dishes",
      data: [65, 59, 80, 81, 56, 55, 40, 88, 9],
      fill: true,
      borderColor: "rgb(35,111,160)",
      tension: 0.1,
    },
  ],
};

// Convert date strings to Date objects
const dates = data.labels.map((dateString) => new Date(dateString));

// Get array of month names
const monthNames = dates.map((date) =>
  date.toLocaleString("default", { month: "long" })
);

// Update labels with month names
data.labels = monthNames;

const options = {
  scales: {
    x: {
      type: "category",
      labels: monthNames,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return `Value: ${value}`;
        },
      },
    },
  },
};

const LineChart = () => <Line data={data} options={options} />;

export default LineChart;
