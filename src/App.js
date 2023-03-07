import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";
import DateNavbarPicker from "./components/DateNavbarPicker";
import TimeData from "./components/TimeData";

import { getEstimatedTime } from "./api/get_requests/getEstimatedTime";
import { getNumberOfTasksInRoute } from "./api/get_requests/getNumberOfTasksInRoute";
import { getPieChartInput } from "./api/get_requests/getPieChartInput";
import LineChart from "./components/LineChart";
import Chartcheck from "./components/Chartcheck";
import CheckHighCharts from "./components/CheckHighCharts";

// Primamry Colors
// #256fa1 - rgb(35,111,160) - blue
// #cc0027 - rgb(204, 25, 44) - red
// #929292 - rgb(144,140,139) - gray

// Secondary Colors
// #6f57aa - rgb(109,89,161) - purple
// #92c020 - rgb(145,192,34) - green
// #f9c900 - rgb(247,201,4) - yellow
// #e87506 - rgb(231,116,10) - orange

getEstimatedTime("944635a2-4454-42c1-971f-d23fd37107c3");
const pieChartData = getPieChartInput(
  "eea98c3d-56d7-4f9c-b967-a60b6bb0a184",
  "a2d4ca37-7584-404b-8b76-dc7512f4c8ad",
  "lastMonth"
);
const data = {
  labels: ["הושלמו בהצלחה", "הושלמו עם בקשת עזרה", "לא הושלמו"],
  datasets: [
    {
      label: "Pie Chart",
      data: [
        pieChartData.completedTasks,
        pieChartData.assistedTasks,
        pieChartData.unCompletedTasks,
      ],
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
      <TimeData
        user_id={51}
        task_id={null}
        route_id={217}
        date_range={"month"}
        first_day_of_range={null}
        last_day_of_range={null}
      ></TimeData>
      <div className="firstRowCharts">
        <div
          style={{ width: "500px", height: "350px" }}
          className="doughnutDashboard"
        >
          {/* <LineChart></LineChart> */}
          <DateNavbarPicker></DateNavbarPicker>
          {/* <TimeData
            user_id={51}
            task_id={1664}
            route_id={null}
            date_range={"week"}
            first_day_of_range={null}
            last_day_of_range={null}
          ></TimeData> */}
          {/* Doughnut Chart */}
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
          <DateNavbarPicker></DateNavbarPicker>

          {/* Line Chart */}
          <Line data={data2} />
        </div>
      </div>
      <div className="secondRowCharts">
        <div
          style={{ width: "650px", height: "350px" }}
          className="barDashboard"
        >
          <DateNavbarPicker></DateNavbarPicker>

          {/* Bar Chart - multiple tasks*/}
          <Bar data={data3} />
        </div>
        <div
          style={{ width: "650px", height: "350px" }}
          className="bar2Dashboard"
        >
          <DateNavbarPicker></DateNavbarPicker>

          {/* Bar Chart - one task*/}
          <Bar data={data4} />
        </div>
      </div>
      <div style={{ width: "650px", height: "350px" }} className="barDashboard">
        <Chartcheck></Chartcheck>
        <CheckHighCharts></CheckHighCharts>
      </div>
    </div>
  );
}

export default App;
