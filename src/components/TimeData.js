import React, { useState, useEffect } from "react";
import { get } from "../api/api";
import axios from "axios";

let result = [];
// https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data
const TimeData = ({
  user_id,
  task_id,
  route_id,
  date_range,
  first_day_of_range,
  last_day_of_range,
}) => {
  const [, setResult] = useState([]);
  let arrayTemp = [];

  let dataResultArray = [];

  // get: user_id, task_id, route_id, date_range(day, week, month, year, range, select 2 days (no range))
  // return:
  //    Case: case of specific user, specific task, and range time:
  //    Return: Array of TimeOnTask - The time for the task each day will be calculated and displayed as output in the chart.

  //    Case: case of specific user, specific route, and range time:
  //    Return: Array of TimeOnTask - The time for the route each day is calculated and displayed as output in the chart.

  const gettingData = async (
    user_id,
    task_id,
    route_id,
    date_range,
    first_day_of_range,
    last_day_of_range
  ) => {
    console.log("user_id: " + user_id);
    console.log("task_id: " + task_id);
    console.log("route_id: " + route_id);
    console.log("date_range: " + date_range);
    console.log("first_day_of_range: " + first_day_of_range);
    console.log("last_day_of_range: " + last_day_of_range);

    // axios
    //   .get("https://prod-web-app0da5905.azurewebsites.net/students")
    //   .then((response) => {
    //     console.log("response.data");
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching tasks:", error);
    //   });

    await get(`https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`, {
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
          await get(
            `https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`,
            {
              params: {
                per_page: 99,
                page: i,
                "Cache-Control": "no-cache",
              },
            }
          ).then(async (response) => {
            Array.prototype.push.apply(arrayTemp, response.data);
            // console.log("arrayTemp: " + arrayTemp);
          });
        }
      }

      const currDate = new Date();

      const currDateString = currDate.toJSON().slice(0, 10);
      console.log("currDate: " + currDateString);

      if (route_id === null) {
        console.log("route_id === null");
        if (date_range == "today") {
          console.log("currDateString: " + currDateString);
          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              user.acf.start_time.slice(0, 10) == currDateString
          );
        } else if (date_range == "yesterday") {
          currDate.setDate(currDate.getDate() - 1);
          const yesterdayDate = currDate.toJSON().slice(0, 10);
          currDate.setDate(currDate.getDate() + 1);
          console.log("yesterdayDate: " + yesterdayDate);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              user.acf.start_time.slice(0, 10) == yesterdayDate
          );
        } else if (date_range == "week") {
          let first = currDate.getDate() - currDate.getDay(); // First day is the day of the month - the day of the week
          let last = first + 6; // last day is the first day + 6

          let firstday = new Date(currDate.setDate(first));
          let lastday = new Date(currDate.setDate(last));

          firstday.setHours(0);
          firstday.setMinutes(0);
          firstday.setSeconds(0);

          lastday.setHours(0);
          lastday.setMinutes(0);
          lastday.setSeconds(0);

          console.log("firstday: " + firstday);
          console.log("lastday: " + lastday);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastday &&
              firstday <= new Date(user.acf.start_time)
          );
        } else if (date_range == "month") {
          const firstDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth(),
            1
          );
          const lastDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth() + 1,
            1
          );
          console.log("Month: firstDay: " + firstDay + ", lastDay: " + lastDay);
          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              firstDay <= new Date(user.acf.start_time) &&
              lastDay >= new Date(user.acf.start_time)
          );
        } else if (date_range == "year") {
          let firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
          let lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

          console.log("first day of year: " + firstDayOfYear);
          console.log("last day of year: " + lastDayOfYear);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastDayOfYear &&
              firstDayOfYear <= new Date(user.acf.start_time)
          );
        } else if (date_range == "range") {
          let firstDayOfRange = new Date(first_day_of_range);
          let lastDayOfRange = new Date(last_day_of_range);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific task
              user.acf.task_id == task_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastDayOfRange &&
              firstDayOfRange <= new Date(user.acf.start_time)
          );
        }
      } else {
        //  this case is for routes data
        // .toString().slice(0, 3)
        //  add all of times to one and insert it
        //  today - only between all/some workers
        //  week - between all/some workers/specific user
        //  month - between all/some workers/specific user
        //  year - between all/some workers/specific user
        //  range time - between all/some workers/specific user

        if (date_range == "today") {
          console.log("currDateString: " + currDateString);
          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              user.acf.start_time.slice(0, 10) == currDateString
          );

          console.log("result route:");
          console.log(result);
        } else if (date_range == "yesterday") {
          currDate.setDate(currDate.getDate() - 1);
          const yesterdayDate = currDate.toJSON().slice(0, 10);
          currDate.setDate(currDate.getDate() + 1);
          console.log("yesterdayDate: " + yesterdayDate);
          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              user.acf.start_time.slice(0, 10) == yesterdayDate
          );

          console.log("result route:");
          console.log(result);
        } else if (date_range == "week") {
          let first = currDate.getDate() - currDate.getDay(); // First day is the day of the month - the day of the week
          let last = first + 6; // last day is the first day + 6

          let firstday = new Date(currDate.setDate(first));
          let lastday = new Date(currDate.setDate(last));

          firstday.setHours(0);
          firstday.setMinutes(0);
          firstday.setSeconds(0);

          lastday.setHours(0);
          lastday.setMinutes(0);
          lastday.setSeconds(0);

          console.log("firstday: " + firstday);
          console.log("lastday: " + lastday);
          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastday &&
              firstday <= new Date(user.acf.start_time)
          );

          console.log("result route:");
          console.log(result);
        } else if (date_range == "month") {
          const firstDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth(),
            1
          );
          const lastDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth() + 1,
            1
          );
          console.log("Month: firstDay: " + firstDay + ", lastDay: " + lastDay);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              firstDay <= new Date(user.acf.start_time) &&
              lastDay >= new Date(user.acf.start_time)
          );

          console.log("result route:");
          console.log(result);
        } else if (date_range == "year") {
          let firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
          let lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

          console.log("first day of year: " + firstDayOfYear);
          console.log("last day of year: " + lastDayOfYear);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastDayOfYear &&
              firstDayOfYear <= new Date(user.acf.start_time)
          );
          console.log("result route:");
          console.log(result);
        } else if (date_range == "range") {
          let firstDayOfRange = new Date(first_day_of_range);
          let lastDayOfRange = new Date(last_day_of_range);

          result = res.data.filter(
            (user) =>
              // example for specific user
              user.acf.user_id == user_id &&
              // // example for specific route
              user.acf.route_id == route_id &&
              // example for traget time range
              new Date(user.acf.start_time) <= lastDayOfRange &&
              firstDayOfRange <= new Date(user.acf.start_time)
          );
          console.log("result route:");
          console.log(result);
        }
      }

      if (route_id === null) {
        for (let i = 0; i < result.length; i++) {
          const start_time = result[i].acf.start_time;
          const end_time = result[i].acf.end_time;

          const diff = new Date(end_time) - new Date(start_time);

          console.log("diff in minutes: " + parseFloat(diff / 1000 / 60));

          let secondsCalc = Math.floor(diff / 1000);
          let minutesCalc = Math.floor(secondsCalc / 60);
          let hoursCalc = Math.floor(minutesCalc / 60);

          const year = start_time.slice(0, 4);
          const month = start_time.slice(5, 7);
          const day = start_time.slice(8, 10);
          const hours = hoursCalc;
          const minutes = minutesCalc;
          const seconds = secondsCalc;

          const resultTimeAndDateOnTask = new Date(
            year,
            month - 1,
            day,
            hours,
            minutes,
            seconds
          );

          // dataResultArray.push(resultTimeAndDateOnTask.toString().slice(0, 24));
          console.log("testtt: " + resultTimeAndDateOnTask);
          dataResultArray.push(
            JSON.stringify({
              day: resultTimeAndDateOnTask.toString().slice(0, 3),
              date: resultTimeAndDateOnTask.toString().slice(4, 15),
              time: resultTimeAndDateOnTask.toString().slice(16, 24),
            })
          );
        }
      } else {
        // צריך לעשות חיתוך של ימים בתוך שבוע נבחר
        // צריך לעשות חיתוך של ימים בתוך חודש נבחר
        // צריך לעשות חיתוך של ימים בתוך שנה נבחרת
        // צריך לעשות חיתוך של ימים בתוך טווח תאריכים נבחר
        // let totalTimeToRoute = 0;
        // for (let i = 0; i < result.length; i++) {
        //   const start_time = result[i].acf.start_time;
        //   const end_time = result[i].acf.end_time;
        //   const diff = new Date(end_time) - new Date(start_time);
        //   totalTimeToRoute = totalTimeToRoute + Math.floor(diff / 1000);
        // }
        // const info = new Date(result[0].acf.start_time);
        // console.log("info: " + info);
        // dataResultArray.push(
        //   JSON.stringify({
        //     day: info.toString().slice(0, 3),
        //     date: info.toString().slice(4, 15),
        //     time: totalTimeToRoute,
        //   })
        // );
        // console.log("dataResultArray; " + dataResultArray);
      }

      const arrResult = [dataResultArray.length];
      for (let i = 0; i < dataResultArray.length; i++) {
        // Delete new Date() if u want this as a String instead of Date Object

        const jsonParseObject = JSON.parse(dataResultArray[i]);
        arrResult[i] = {
          day: jsonParseObject.day,
          date: jsonParseObject.date,
          timeOnTask: jsonParseObject.time,
        };

        console.log("Route time number " + i + ": " + dataResultArray[i]);
      }

      console.log(arrResult);
    });
  };

  useEffect(() => {
    (async () => {
      await gettingData(
        user_id,
        task_id,
        route_id,
        date_range,
        first_day_of_range,
        last_day_of_range
      );
    })();
  }, []);

  return <div className=""></div>;
};

export default TimeData;
