import React, { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = (props: HighchartsReact.Props) => {
  const [signedUpYear, setSignedUpYear] = useState();
  const [selectedYear, setSelectedYear] = useState(2021);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3434/signedUpData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        setSignedUpYear(jsonData.created_at.getFullYear());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const [chartType, setChartType] = useState("line");
  const chartOptions = {
    title: {
      text: "Signed-up Users",
    },
    series: [
      {
        type: chartType,
        data: [1, 2, 3, 4, 5],
        name: "Signed-up history",
      },
    ],
  };

  const handleChangeChartType = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setChartType(event.target.value);
  };

  const handleYearChange = async (event: {
    target: { value: React.SetStateAction<any> };
  }) => {
    const year = event.target.value;
    setSelectedYear(year);
    try {
      const response = await fetch("http://localhost:3434/signedUpData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year }),
      });
    } catch (error) {
      console.error("Error occurred during data sending:", error);
    }
  };

  return (
    <>
      <center>
        <select
          value={chartType}
          onChange={handleChangeChartType}
          style={{ padding: "5px 15px", margin: "5px 15px" }}
        >
          <option value="line">Line Graph</option>
          <option value="bar">Bar Graph</option>
        </select>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ padding: "5px 15px", margin: "5px 15px" }}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </center>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        {...props}
      />
    </>
  );
};
export default PieChart;
