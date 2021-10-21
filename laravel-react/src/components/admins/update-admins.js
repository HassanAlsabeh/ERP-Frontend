import Dashboard from "../dashboard/dashboard";
import { withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateAdmins(props) {
  const [data, setData] = useState([]);
  const [name, steName] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();

  useEffect(async () => {
    let result = await fetch(
      "http://localhost:8000/api/admins/" + props.match.params.id
    );
    result = await result.json();
    setData(result);
    steName(result.name);
    setEmail(result.email);
  }, []);

  async function editAdmin(id) {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    let result = await fetch(
      "http://localhost:8000/api/update/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Admin Updated Successfully", "success");
    history.push("/show-admins");
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <h1>Update Admin</h1>
        <input
          type="text"
          onChange={(e) => steName(e.target.value)}
          defaultValue={data.name}
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={data.email}
          className="form-control"
        />{" "}
        <br />
        <button
          onClick={() => editAdmin(data.id)}
          className="btn btn-primary"
          style={{ marginBottom: "5%" }}
        >
          Update Admin
        </button>
      </div>
    </div>
  );
}
export default withRouter(UpdateAdmins);
