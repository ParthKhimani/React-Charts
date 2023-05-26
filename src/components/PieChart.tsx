import React, { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = (props: HighchartsReact.Props) => {

  const [status, setStatus] = useState([
    {
      active: 0,
      inactive: 0,
      disabled: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3434/statusData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        setStatus(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    title: {
      text: "Active / Inactive Users",
    },
    series: [
      {
        type: "pie",
        data: [
          { name: "Active", y: status[0].active },
          { name: "Inactive", y: status[0].inactive },
          { name: "Disabled", y: status[0].disabled },
        ],
        name: "Status",
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        {...props}
      />
    </>
  );
};
export default PieChart;
