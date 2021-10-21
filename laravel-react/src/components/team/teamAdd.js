import Dashboard from "../dashboard/dashboard";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function CreateTeam() {
  const [name, setName] = useState("");
  const [error, setError] =useState(false);

  let history = useHistory();

  async function addTeam() {
    console.warn(name);
    const formData = new FormData();

    formData.append("name", name);

    let result = await fetch("http://localhost:8000/api/addteam", {
      method: "POST",
      body: formData,
    });

    if (result.status == 500) {
      setError(true);
    } else if (result.status == 201) {
      setError(false);
      Swal.fire("Good job!", "Team Added Successfully", "success");
      history.push("/teams-list");
    }
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <br />
        <h1>Create a Team</h1>
        <br />
        {error ? <span style={{color : 'red'}}> Team name already in use. </span> : null}
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Name"
        />
        <br />
        <br />
      </div>
      <br />
      <br />
      <div className="col-sm-6 offset-sm-3">
        <button
          className="btn btn-primary"
          onClick={addTeam}
          style={{
            marginTop: "-10%",
            marginLeft: "-10%",
            width: "150px",
            height: "50px",
          }}
        >
          Add team
        </button>
      </div>
    </div>
  );
}
export default CreateTeam;
