import { get } from "../api";
import { getNumberOfTasksInRoute } from "./getNumberOfTasksInRoute";

export const getPieChartInput = (student_id, route_id, date_range) => {
  get(
    "https://prod-web-app0da5905.azurewebsites.net/task-performance?studentId=" +
      student_id +
      "&routeId=" +
      route_id +
      "&startTime=" +
      date_range
  )
    .then((response) => {
      // get completed task :
      // =================================

      const data = Object.values(response.data);

      const completedTasks = data.length;

      console.log("completedTasks: " + completedTasks);

      // =================================

      // get working days :
      // =================================
      const uniqueDates = new Set();

      for (let i = 0; i < data.length; i++) {
        const date = data[i].startTime.substr(0, 10);
        uniqueDates.add(date);
      }

      const workingDays = uniqueDates.size;

      console.log("Working days in the last month: " + workingDays);

      const unCompletedTasks = getNumberOfTasksInRoute(route_id);

      console.log("uncompleted in the last month: " + unCompletedTasks);

      // =================================

      // return completedTasks, workingDays ;

      // get assisted tasks :
      // =================================

      const filteredData = data.filter((timeOnTask) => {
        return timeOnTask.whenAssisted !== "1969-12-31T22:00:00.000Z";
      });

      // console.log("filteredData: ");
      // console.log(filteredData);

      const assistedTasks = filteredData.length;

      console.log("assistedTasks: " + assistedTasks);

      return {
        completedTasks: completedTasks,
        assistedTasks: assistedTasks,
        unCompletedTasks: unCompletedTasks,
      };
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};
