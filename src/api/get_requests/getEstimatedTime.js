import { get } from "../api";

export const getEstimatedTime = (task_id) => {
  get("https://prod-web-app0da5905.azurewebsites.net/tasks/" + task_id)
    .then((res) => {
      console.log(
        "task " +
          res.data.title +
          "estimated time in seconds: " +
          res.data.estimatedTimeSeconds
      );

      // return estimatedTimeSeconds;
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};
