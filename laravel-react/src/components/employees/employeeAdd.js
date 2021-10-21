import Dashboard from "../dashboard/dashboard";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function CreateTeam() {
  let history = useHistory();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [teams, setTeams] =useState([]);
  const [phonenum, setPhonenum] = useState("");
  const [team_id, setTeamId] = useState('');
  const [error, setError] = useState(false);
  const [file, setFile] = useState("");
  const [role_id, setRoleId] = useState('');
  const [role, setRole] = useState([]);

  async function addEmployee(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("phonenum", phonenum);
    formData.append("team_id", team_id);
    formData.append("file_path", file);
    formData.append('role_id', role_id)

    let result = await fetch("http://localhost:8000/api/addemployee", {
      method: "POST",
      body: formData,
    });
    if (result.status == 500) {
      setError(true);
    } else if (result.status == 201) {
      Swal.fire("Good job!", "Employee Added Successfully", "success");
      history.push("/employees-list");
      setError(false);
    }
  }

  const getTeams = async () => {
    let response = await fetch("http://localhost:8000/api/list-team", {
      method: "get",
    });
    const result = await response.json();
    let teams = result.data;
    setTeams(teams);
  };

  const getRoles = async () => {
    let response = await fetch('http://localhost:8000/api/roles', {
      method : 'get'
    })
    const result = await response.json();
    const roles = result.data
    setRole(roles)
  }

  useEffect(() => {
    getTeams();
    getRoles()
  }, []);
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 5% 0 20%" }}>
        <br />
        <h1>Create Employee</h1>
        <br />
        {error ? (
          <span style={{ color: "red" }}>
            Please fill all the required fields and check if email or
            phonenumber are already in use
          </span>
        ) : null}

        <input
          type="text"
          onChange={(e) => setFname(e.target.value)}
          className="form-control"
          placeholder="First Name"
          required
        />
        <br />
        <input
          type="text"
          onChange={(e) => setLname(e.target.value)}
          className="form-control"
          placeholder="Last Name"
          required
        />
        <br />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
          required
        />
        <br />
        <input
          type="text"
          onChange={(e) => setPhonenum(e.target.value)}
          className="form-control"
          placeholder="Phone Number"
          required
        />
        <br />

        <select class="form-select" aria-label="Default select example"
          onChange={(e) => {
            const value = e.target.value;
            setTeamId(value);
          }}
          name="cars"
          id="cars"
        >
          <option value="none" defaultValue>
            Team
          </option>
          {teams.map((item) => {
            return <option value={item.id}> {item.name} </option>;
          })}
        </select>

        <br />

        <select class="form-select" aria-label="Default select example"
          onChange={(e) => {
            const value = e.target.value;
            setRoleId(value);
          }}
          name="cars"
          id="cars"
        >
          <option value="none" defaultValue>
            Role
          </option>
          {role.map((item) => {
            return <option value={item.id}> {item.role_name} </option>;
          })} 
         </select>
        <br></br>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />

        <br />
        <button
          className="btn btn-primary"
          onClick={addEmployee}
          style={{
            marginTop: "2%",
            marginBottom: "5%",
            width: "150px",
            height: "50px",
          }}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}
export default CreateTeam;
