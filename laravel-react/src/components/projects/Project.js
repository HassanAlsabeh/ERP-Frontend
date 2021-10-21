import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import "./Project.css";

const Project = () => {
  const [select, setSelect] = useState("");
  const [project, setProject] = useState("");
  const [success, setSuccess] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(false);
  let { id } = useParams();

  let project_id = id;
  let team_id = select;

  const getTeams = async () => {
    const response = await fetch(`http://localhost:8000/api/list-team`);
    const result = await response.json();
    setTeams(result.data);
  };

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/project/${id}`);
    const result = await response.json();
    setProject(result);
  };

  const addTeam = async (e) => {
    let response = await fetch("http://localhost:8000/api/teamsprojects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id,
        team_id,
      }),
    });
    console.log("hello", response);
    if (response.status == 500) {
      setError(true);
      setSuccess(false);
    } else if (response.status == 200) {
      setSuccess(true);
      setError(false);
      getData();
    }
  };

  useEffect(() => {
    getData();
    getTeams();
  }, []);

  return (
    <>
    <Dashboard />
      {project && (
        <div className="select_project">
          <h1> {project.project_name} </h1>

          <label for="cars">Select a team to add to this project :</label>
          {error ? (
            <span style={{ color: "red" }}>
              {" "}
              Could not add team to this project, please try again.{" "}
            </span>
          ) : success ? (
            <span style={{ color: "green"}}> Team added successfully </span>
          ) : null}
          <select
            onChange={(e) => {
              const value = e.target.value;
              setSelect(value);
            }}
            name="cars"
            id="cars"
          >
            <option value="none" defaultValue>
              Select team
            </option>
            {teams.map((item) => {
              return <option value={item.id}> {item.name} </option>;
            })}
          </select>

          <button onClick={addTeam}>Add</button>

          <h3> Teams in this project </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Created At</th>
                <th style={{ width: "80px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              {project.team.map((item) => {
                return (
                  <tr>
                    <td> {item.name} </td>
                    <td> {item.created_at} </td>
                    <td>
                      {" "}
                      <Link to={"/team/" + item.id}>
                        <Button
                          size="sm"
                          variant="info"
                          style={{ marginRight: "10px" }}
                        >
                          View
                        </Button>
                      </Link>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Project;
