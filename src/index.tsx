import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PieChart from "./components/PieChart";
import LineBarChart from "./components/Line-BarChart";
import DataTable from "./components/Data-Table";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LineBarChart />
    <PieChart />
    <DataTable />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
