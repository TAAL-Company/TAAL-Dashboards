import { get } from "../api";

export const getNumberOfTasksInRoute = (route_id) => {
  get("https://prod-web-app0da5905.azurewebsites.net/routes/" + route_id)
    .then((res) => {
      console.log(res.data.tasks.length);

      // return res.data.tasks.length;
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};
