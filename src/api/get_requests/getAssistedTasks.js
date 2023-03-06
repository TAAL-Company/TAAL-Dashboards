import { get } from "../api";

export const getAssistedTasks = (student_id, route_id, date_range) => {
  get(
    "https://prod-web-app0da5905.azurewebsites.net/task-performance?studentId=" +
      student_id +
      "routeId=" +
      route_id +
      "&startTime=" +
      date_range +
      "&whenAssisted!=1969-12-31T22:00:00.000Z"
  )
    .then((response) => {
      console.log("response.data");
      console.log(response.data);

      const data = Object.values(response.data);

      const assistedTasks = data.length;

      console.log(assistedTasks);

      // return assistedTasks;
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};
