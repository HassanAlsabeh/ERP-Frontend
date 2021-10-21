import React, { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import "./Employee.css";
import Tabs from "./Tabs";
import Ratings from "./Ratings";
import KPIS from "../KPIs/kpi-employee-list";
import Dashboard from "../dashboard/dashboard";

export default function Employee() {
  const [employee, setEmployee] = useState({});
  const [team, setTeam] = useState({});
  const [role, setRole] = useState("");

  let { id } = useParams();

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/employee/${id}`);
    const result = await response.json();
    setEmployee(result);
    setTeam(result.team);
    setRole(result.role);
    console.log("hello", result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="body">
      <Dashboard />

      <div className="employee-container">
        <a
          style={{
            position: "absolute",
            right: "18%",
            top: "5%",
            color: "blue",
            fontSize: "1.5em",
          }}
          href="/employees-list"
        >
          <FaWindowClose style={{ width: "30px", height: "30px" }} />
        </a>
        <div className="employee-info">
          <div className="employee-fullname">
            <span>
              {employee.fname} {employee.lname}
            </span>
            <span className="role_name">
              {role ? role.role_name : "No current role"}
            </span>
          </div>

          <div className="employee-image">
            <img
              src={"http://localhost:8000/" + employee.file_path}
              alt="photo"
            />
          </div>
        </div>

        <div className="graph_tabs" style={{ paddingBottom: "20%" }}>
          {/* <Ratings />

          <Graph id={id} /> */}
          <Tabs employee={employee} team={team} />
          <Ratings />
          {/* <KPIS /> */}
        </div>
      </div>
    </div>
  );
}
