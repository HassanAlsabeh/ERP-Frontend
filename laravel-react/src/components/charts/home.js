import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard/dashboard";
import BarChart from "./barchart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import "./charts.css";
const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setName(content.name);
    })();
  });

  return (
    <div>
      
      <Dashboard />
      <div className="container">
        <BarChart />
        <PieChart />
      </div>
      <div className="container">
        <LineChart />
      </div>
    </div>
  );
};

export default Home;
