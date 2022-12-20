import { ConstructionOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { get } from "../../api/api";

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

  async function getRouteTimeBySpecificDay(user_id, route_id, day)
  {
    console.log("day: " + day);

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
        result = arrayTemp.filter(
          (user) =>
            // example for specific user
            user.acf.user_id == user_id &&
            // // example for specific route
            user.acf.route_id == route_id &&
            // example for traget time range
            user.acf.start_time.slice(0, 10) == day
        );
    });
    console.log("result");

    console.log(result);
    let totalTimeToRoute = 0;

    console.log("result.length: " + result.length) ;

    for (let i = 0; i < result.length; i++) {
      const start_time = result[i].acf.start_time;
      const end_time = result[i].acf.end_time;

      const diff = new Date(end_time) - new Date(start_time);

      totalTimeToRoute = totalTimeToRoute + Math.floor(diff / 1000);
    }

    try
    {
      const info = new Date(result[0].acf.start_time);
      console.log("info: " + info);
      dataResultArray.push(
        JSON.stringify({
           day: info.toString().slice(0, 3),
           date: info.toString().slice(4, 15),
           time: totalTimeToRoute,
         })
       );

       console.log("total time on route (json objeceet): " + dataResultArray);
    }
    catch (error) {
      console.error("אין מידע קיים עבור המשתמש הנבחר בתאריך זה");
    }

    return dataResultArray;


    // const arrResult = [dataResultArray.length];
    // for (let i = 0; i < dataResultArray.length; i++)
    // {
    //   // Delete new Date() if u want this as a String instead of Date Object

    //   const jsonParseObject = JSON.parse(dataResultArray[i]);
    //     arrResult[i] = {
    //     day: jsonParseObject.day,
    //     date: jsonParseObject.date,
    //       timeOnTask: jsonParseObject.time,
    //     };

    //     console.log("Route time number " + i + ": " + dataResultArray[i]);
    // }
    // console.log("arrResult: ");
    // console.log(arrResult);
  }

  async function getTaskTimeBySpecificDay(user_id, task_id, day) {

    await get(`https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`, {

      params: {
        per_page: 99,
        "Cache-Control": "no-cache",
      },
    }).then(async (res) => {
      let max_pages = res.headers["x-wp-totalpages"];
      arrayTemp = res.data;

      if (max_pages > 1) {
        for (let i = 2; i <= max_pages; i++) {
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

        console.log("day fucntion: " + day);


        result = arrayTemp.filter(
          (user) =>
            // example for specific user
            user.acf.user_id == user_id &&
            // // example for specific task
            user.acf.task_id == task_id &&
            // example for traget time range
            user.acf.start_time.slice(0, 10) == day
        );
    });
    console.log("result task");

    console.log(result);

    return result;
    
  }

  async function getTaskTimeBySpecificMonth(user_id, task_id, month){

  }

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
    
    const currDate = new Date();
    currDate.setDate(currDate.getDate() - 2);

    const currDateString = currDate.toJSON().slice(0, 10);


    // const yesterdayDate = currDate.toJSON().slice(0, 10);
    // currDate.setDate(currDate.getDate() + 1);


    // console.log("try function:");
    // await getRouteTimeBySpecificDay(user_id, route_id, currDateString);
    // console.log("end of function:");

    // console.log("try function task:");
    // await getTaskTimeBySpecificDay(user_id, task_id, currDateString);
    // console.log("end of function task:");



    await get(`https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      // },
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

      //   print all time data
      //   console.log("res time data:", res.data);

      const currDate = new Date();

      const currDateString = currDate.toJSON().slice(0, 10);
      console.log("currDate: " + currDateString);

      if (route_id === null) {
        console.log("task case senario");
        if (date_range == "today") {
          const todayData = await getTaskTimeBySpecificDay(user_id, task_id, currDateString);
          console.log("todayData: ");
          console.log(todayData);

        } else if (date_range == "yesterday") {

          currDate.setDate(currDate.getDate() - 1);
          const yesterdayDate = currDate.toJSON().slice(0, 10);
          currDate.setDate(currDate.getDate() + 1);
          console.log("yesterdayDate: " + yesterdayDate);

          const yesterdayData = await getTaskTimeBySpecificDay(user_id, task_id, yesterdayDate);

          console.log("yesterdayData: ");
          console.log(yesterdayData);
        } else if (date_range == "week") {


          // thats how u do it to do current week instead of 7 days ago

          // console.log("currDate: 11 " + currDate);
          // let first = currDate.getDate() - currDate.getDay(); // First day is the day of the month - the day of the week
          // let last = first + 6; // last day is the first day + 6

          // let firstday = new Date(currDate.setDate(first));
          // let lastday = new Date(currDate.setDate(last));

          console.log("currDate: 11 " + currDate);
          let first = currDate.getDate() -6;

          let firstday = new Date(currDate.setDate(first));

          let weekData = {};

          currDate.setDate(currDate.getDate() + 7);

          firstday.setHours(10);
          firstday.setMinutes(0);
          firstday.setSeconds(0);

          console.log("firstday week: " + firstday);


          for (let i=0; i <= 6; i++)
          {
            weekData[i] = await getTaskTimeBySpecificDay(user_id, task_id, firstday.toJSON().slice(0, 10));
            firstday.setDate(firstday.getDate() + 1);
          }

          console.log("weekData");
          console.log(weekData);


        } else if (date_range == "month") {
          const firstDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth() ,
            1, 10
          );
          const lastDay = new Date(
            currDate.getFullYear(),
            currDate.getMonth() + 1,
            1, 10
          );

          let MonthData = {};

          console.log("clgclg1: " +firstDay)

          lastDay.setDate(lastDay.getDate() - 1);
          const daysInMonth = parseInt(lastDay.toString().slice(8,10));

          console.log("daysInMonth: " + daysInMonth);

          console.log("clgclg2: " +firstDay.toJSON().slice(0, 10))

          for (let i=0; i < daysInMonth; i++)
          {
            MonthData[i] = await getTaskTimeBySpecificDay(user_id, task_id, firstDay.toJSON().slice(0, 10));
            console.log("i :" + i);
            console.log("first111:" + firstDay)
            console.log("firstDay.toJSON().slice(0, 10: " + firstDay.toJSON().slice(0, 10));
            console.log("MonthData[i]: " + MonthData[i]);
            firstDay.setDate(firstDay.getDate() + 1);
          }

          console.log("MonthData");
          console.log(MonthData);

        
        } else if (date_range == "year") {
          let firstDayOfYear = new Date(new Date().getFullYear(), 0, 1, 10);
          let lastDayOfYear = new Date(new Date().getFullYear(), 11, 31, 10);

          
          let yearData = {};

          let temp = firstDayOfYear;


          for (let i=0; i < 12; i++)
          {

            console.log("temp: " + temp);
            temp.setMonth(temp.getMonth() + 1);


          }



        } else if (date_range == "range") {
          let firstDayOfRange = new Date(first_day_of_range);
          let lastDayOfRange = new Date(last_day_of_range);

          result = arrayTemp.filter(
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
          result = arrayTemp.filter(
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
          result = arrayTemp.filter(
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
          result = arrayTemp.filter(
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

          result = arrayTemp.filter(
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

          result = arrayTemp.filter(
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

          result = arrayTemp.filter(
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

        if (date_range === "month")
      {
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

      }

        let totalTimeToRoute = 0;
        for (let i = 0; i < result.length; i++) {
          const start_time = result[i].acf.start_time;
          const end_time = result[i].acf.end_time;

          const diff = new Date(end_time) - new Date(start_time);

          totalTimeToRoute = totalTimeToRoute + Math.floor(diff / 1000);
        }

        try{
        const info = new Date(result[0].acf.start_time);
        console.log("info: " + info);
        dataResultArray.push(
          JSON.stringify({
            day: info.toString().slice(0, 3),
            date: info.toString().slice(4, 15),
            time: totalTimeToRoute,
          })
        );

        console.log("dataResultArray; " + dataResultArray);
      }
      catch (error) {
      console.error("אין מידע קיים עבור המשתמש הנבחר בתאריך זה");
  }
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
