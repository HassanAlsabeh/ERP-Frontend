import Dashboard from "../dashboard/dashboard";
import { withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateProject(props) {
  const [data, setData] = useState([]);
  const [team_id, setTeamID] = useState("");
  const [project_name, setProjectName] = useState("");
  let history = useHistory();

  useEffect(async () => {
    let result = await fetch(
      "http://localhost:8000/api/project/" + props.match.params.id
    );
    result = await result.json();
    setData(result);
    setTeamID(result.team_id);
    setProjectName(result.project_name);
  }, []);

  async function editProject(id) {
    const formData = new FormData();

    formData.append("team_id", team_id);
    formData.append("project_name", project_name);

    let result = await fetch(
      "http://localhost:8000/api/update_project/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Project Updated Successfully", "success");
    history.push("/projects-list");
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <h1>Update a Project</h1>
        <input
          type="text"
          onChange={(e) => setTeamID(e.target.value)}
          defaultValue={data.team_id}
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          defaultValue={data.project_name}
          className="form-control"
        />{" "}
        <br />
        <button
          onClick={() => editProject(data.id)}
          className="btn btn-primary"
          style={{ marginBottom: "5%" }}
        >
          Update Project
        </button>
      </div>
    </div>
  );
}
export default withRouter(UpdateProject);
