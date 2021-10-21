import Dashboard from "../dashboard/dashboard";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function CreateProject() {
  const [project_name, setProjectName] = useState("");
  const [error, setError] = useState(false);
  let history = useHistory();



  async function addProject() {
    const formData = new FormData();

    formData.append("project_name", project_name);

    let result = await fetch("http://localhost:8000/api/addproject", {
      method: "POST",
      body: formData,
    });

    if (result.status == 201) {
      Swal.fire("Good job!", "Project Added Successfully", "success");
      history.push("/projects-list");
      setError(false);
    } else if (result.status == 500) {
      setError(true);
    }
    console.log("helloo", result);
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <br />
        <h1>Create a Project</h1>
        <br />
        {error? <span style={{color : 'red'}}>Project name already exist.</span> : null}
        <input
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          className="form-control"
          placeholder="Project Name"
        />
        <br />
      </div>
      <br />
      <br />
      <div className="col-sm-6 offset-sm-3">
        <button
          className="btn btn-primary"
          onClick={addProject}
          style={{
            marginTop: "-10%",
            marginLeft: "-10%",
            width: "150px",
            height: "50px",
          }}
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
export default CreateProject;
