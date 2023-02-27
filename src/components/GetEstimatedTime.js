import React from "react";
import { get } from "../api/api";

const GetEstimatedTime = async () => {
  let arrayTemp = [];

  await get(`https://taal.tech/wp-json/wp/v2/tasks/`, {
    params: {
      per_page: 99,
      "Cache-Control": "no-cache",
    },
  }).then(async (res) => {
    let max_pages = res.headers["x-wp-totalpages"];
    arrayTemp = res.data;

    //   console.log("max_pages: " + max_pages);

    if (max_pages > 1) {
      for (let i = 2; i <= max_pages; i++) {
        //   console.log("max_pages: " + max_pages);
        await get(`https://taal.tech/wp-json/wp/v2/tasks/`, {
          params: {
            per_page: 99,
            page: i,
            "Cache-Control": "no-cache",
          },
        }).then(async (response) => {
          Array.prototype.push.apply(arrayTemp, response.data);
          // console.log("arrayTemp: " + arrayTemp);
        });
      }
    }

    console.log("tasks info: ");
    console.log(arrayTemp);

    return <div className=""></div>;
  });
};
export default GetEstimatedTime;
