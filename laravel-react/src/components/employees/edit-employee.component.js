import Dashboard from "../dashboard/dashboard";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateEmployee(props) {
  const [data, setData] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [teams, setTeams] =useState([])
  const [role, setRole] = useState([]);
  const [file, setFile] = useState("");
  const [team_id, setTeamId] = useState('');
  const [role_id, setRoleName] = useState('');

  let history = useHistory();

  useEffect(async () => {
    
      let response = await fetch("http://localhost:8000/api/list-team", {
        method: "get",
      });
      const result = await response.json();
      let teams = result.data;
      setTeams(teams);
      console.log(setTeams);
    

   
      let response1 = await fetch('http://localhost:8000/api/roles', {
        method : 'get'
      })
      const result1 = await response1.json();
      const roles = result1.data
      setRole(roles)
      console.log(setRole);
    


    let result2 = await fetch(
      "http://localhost:8000/api/employee/" + props.match.params.id
    );
    result2 = await result2.json();
    setData(result2);
    setFname(result2.fname);
    setLname(result2.lname);
    setEmail(result2.email);
    setPhonenum(result2.phonenum);
    setTeamId(result2.team_id);
    setRoleName(result2.role_name);
    setFile(result2.file);
    
  }, []);

  async function editEmployee(id) {
    const formData = new FormData();

    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("phonenum", phonenum);
    formData.append("team_id", team_id);
    formData.append("role_id", role_id);
    formData.append("file", file);

   
  


    let result = await fetch(
      "http://localhost:8000/api/update_employee/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Employee Updated Successfully", "success");
    history.push("/employees-list");
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <h1>Update Employee</h1>
        <input
          type="text"
          onChange={(e) => setFname(e.target.value)}
          defaultValue={data.fname}
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setLname(e.target.value)}
          defaultValue={data.lname}
          className="form-control"
        />{" "}
        <br />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={data.email}
          className="form-control"
        />{" "}
        <br></br>
      


        <select class="form-select" aria-label="Default select example"
          onChange={(e) => {
            const value = e.target.value;
            setTeamId(value);
          }}
          name="cars"
          id="cars"
        >
          <option value="none" defaultValue>
            None
          </option>
          {teams.map((item) => {
            return <option value={item.id}> {item.name} </option>;
          })}
        </select>

        <br />

        <select class="form-select" aria-label="Default select example"
          onChange={(e) => {
            const value = e.target.value;
            setRoleName(value);
          }}
          name="cars"
          id="cars"
        >
          <option value="none" defaultValue>
            None
          </option>
          {role.map((item) => {
            return <option value={item.id}> {item.role_name} </option>;
          })} 
         </select>
         <br></br>
        <input
          placeholder="Employee photo"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          defaultValue={data.file_path}
          className="form-control"
        />{" "}
        <br />
        <img
          style={{ width: 300 }}
          src={"http://localhost:8000/" + data.file_path}
        />
        <br /> <br />
        <button
          onClick={() => editEmployee(data.id)}
          className="btn btn-primary"
          style={{ marginBottom: "5%" }}
        >
          Update Team
        </button>
      </div>
    </div>
  );
}
export default withRouter(UpdateEmployee);
