// npm install --save chart.js react-chartjs-2
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";
import AccessibleTabs1 from "./components/AccessibleTabs1";
import TimeData from "./components/TimeData/TimeData";

// Primamry Colors
// #256fa1 - rgb(35,111,160) - blue
// #cc0027 - rgb(204, 25, 44) - red
// #929292 - rgb(144,140,139) - gray

// Secondary Colors
// #6f57aa - rgb(109,89,161) - purple
// #92c020 - rgb(145,192,34) - green
// #f9c900 - rgb(247,201,4) - yellow
// #e87506 - rgb(231,116,10) - orange

const data = {
  labels: ["הושלמו בהצלחה", "הושלמו עם בקשת עזרה", "לא הושלמו"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(35,111,160)",
        "rgb(204, 25, 44)",
        "rgb(144,140,139)",
      ],
      hoverOffset: 4,
    },
  ],
};

const labels2 = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי"];
const data2 = {
  labels: labels2,
  datasets: [
    {
      label: "שטיפת כלים",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: "rgb(35,111,160)",
      tension: 0.1,
    },
  ],
};

const data3 = {
  labels: ["שטיפת כלים", "הכנת קפה", "הכנת פסטה", "ספירת קופה"],
  datasets: [
    {
      type: "bar",
      label: "ינואר",
      data: [10, 20, 30, 40],
      borderColor: "rgb(35,111,160)",
      backgroundColor: "rgba(35,111,160, 0.7)",
    },
    {
      type: "bar",
      label: "פברואר",
      data: [10, 25, 18, 38],
      borderColor: "rgb(204, 25, 44)",
      backgroundColor: "rgba(204, 25, 44, 0.7)",
    },
  ],
};

const labels4 = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי"];
const data4 = {
  labels: labels4,

  datasets: [
    {
      label: "שטיפת כלים",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(35,111,160, 0.4)",
        "rgba(204, 25, 44, 0.4)",
        "rgba(144,140,139, 0.4)",
        "rgba(145,192,34, 0.4)",
        "rgba(247,201,4, 0.4)",
        "rgba(231,116,10, 0.4)",
        "rgba(75, 192, 192, 0.4)",
      ],
      borderColor: [
        "rgb(35,111,160)",
        "rgb(204, 25, 44)",
        "rgb(144,140,139)",
        "rgb(145,192,34)",
        "rgb(247,201,4)",
        "rgb(231,116,10)",
        "rgb(75, 192, 192)",
      ],
      borderWidth: 1,
    },
  ],
};

function App() {
  return (
    <div className="App">
      <div className="firstRowCharts">
        <div
          style={{ width: "500px", height: "350px" }}
          className="doughnutDashboard"
        >
          <AccessibleTabs1></AccessibleTabs1>
          <TimeData
            user_id={51}
            task_id={1664}
            route_id={null}
            date_range={"week"}
            first_day_of_range={null}
            last_day_of_range={null}
          ></TimeData>
          <Doughnut data={data} />
        </div>
        <div
          style={{
            width: "650px",
            height: "350px",
            position: "relative",
            left: 0,
          }}
          className="lineChartDashboard"
        >
          <AccessibleTabs1></AccessibleTabs1>

          <Line data={data2} />
        </div>
      </div>
      <div className="secondRowCharts" style={{ marginTop: "30px" }}>
        <div
          style={{ width: "650px", height: "350px" }}
          className="barDashboard"
        >
          <AccessibleTabs1></AccessibleTabs1>

          <Bar data={data3} />
        </div>
        <div
          style={{ width: "650px", height: "350px" }}
          className="bar2Dashboard"
        >
          <AccessibleTabs1></AccessibleTabs1>

          <Bar data={data4} />
        </div>
      </div>
    </div>
  );
}

export default App;
