import Dashboard from "../dashboard/dashboard";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
function UpdateRole(props) {
  const [data, setData] = useState([]);
  const [role_name, setRoleName] = useState("");

  let history = useHistory();
  useEffect(async () => {
    let result = await fetch(
      "http://localhost:8000/api/roles/" + props.match.params.id
    );
    result = await result.json();
    setData(result);
    setRoleName(result.role_name);
  }, []);

  async function editRole(id) {
    const formData = new FormData();

    formData.append("role_name", role_name);

    let result = await fetch(
      "http://localhost:8000/api/roles-update/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Role Updated Successfully", "success");
    history.push("/roles-list");
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <h1>Update a Role</h1>
        <input
          type="text"
          onChange={(e) => setRoleName(e.target.value)}
          defaultValue={data.role_name}
          className="form-control"
        />
        <br /> <br />
        <button
          onClick={() => editRole(data.id)}
          className="btn btn-primary"
          style={{ marginBottom: "5%" }}
        >
          Update Role
        </button>
      </div>
    </div>
  );
}
export default withRouter(UpdateRole);
