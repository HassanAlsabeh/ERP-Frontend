import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import TeamPop from "./teamPop";
import ProjectPop from "./ProjectPop";
function Report() {
  document.title = "Reports"
  const [error, setError] = useState(null);
  const [project, setProject] = useState([]);
  const [emessage, setMessage] = useState("");
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [popTrigger, setPopTrigger] = useState(false);
  const [popTrigger1, setPopTrigger1] = useState(false);
  const [Idvalue, setIdvalue] = useState("");
  const [Idvalue1, setIdvalue1] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const getTeam = async () => {
    const response = await fetch("http://localhost:8000/api/list-team");

    const result = await response.json();
    setTeams(result.data);
    setEmployees(result.data.employees);
  };

  const getProject = async () => {
    const response = await fetch("http://localhost:8000/api/list-project");
    const result = await response.json();
    console.log("hello", result);
    setProject(result.data);
  };

  const getEmployees = async () => {
    const response = await fetch(`http://localhost:8000/api/employees`);
    const result = await response.json();
    setEmployeesList(result.data);
  };

  useEffect(() => {
    getProject();
    getTeam();
    getEmployees();
  }, []);

  return (
    <div>
      <Dashboard />
      <div className="table-wrapper" style={{ margin: "2% 10% 0 20%" }}>
        <h1>Reports</h1>
        <h2 style={{ color: "black" }}>Projects</h2>
        {error ? <p style={{ color: "red" }}> {emessage} </p> : null}
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Project Name</th>
              <th>Teams</th>
              <th>employees</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {project.map((item) => (
              <tr >
                <td>{item.id}</td>

                <td>{item.project_name}</td>
                <td>
                  {item.team.map((x) => (
                    <div>
                      <td>{x.name} &emsp;</td>
                    </div>
                  ))}
                </td>
                <td>
                  {item.team.map((y) => (
                    <div onClick={() => setIdvalue(y.id)}>
                      <td
                        className="clickable"
                        onClick={() => setPopTrigger(true)}
                      >
                        {y.employees.length}
                      </td>
                    </div>
                  ))}
                </td>

                <td>{item.created_at.substr(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
       
        <h2 style={{ color: "black" }}>Teams</h2>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Team Name</th>
              <th>Projects</th>
              <th>Employees</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((item) => (
              <tr onClick={() => setIdvalue1(item.id)}>
                <td>{item.id}</td>
                <td>{item.name}</td>

                <td   className="clickable"
                        onClick={() => setPopTrigger1(true)}>{item.projects.length}</td>
                <td>{item.employees.length}</td>
                <td>{item.created_at.substr(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <h2 style={{ color: "black" }}>Employees</h2>
        <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th style={{ width: "130px" }}>Customized Id</th>
                <th>FName</th>
                <th>LName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Team</th>
                <th>Employee Role</th>

                <th style={{ width: "70px" }}>Photo</th>
         
              </tr>
            </thead>
            <tbody>
              {employeesList.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.employee_id}</td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenum}</td>
                  <td>{item.team ? item.team.name : 'Not assigned' }</td>
                <td>{item.role ? item.role.role_name : 'Not assigned' }</td>
                  <td>
                    <img
                      style={{ width: "60px", height: "50px" }}
                      src={"http://localhost:8000/" + item.file_path}
                    ></img>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
      {popTrigger ? (
        <TeamPop
          id={Idvalue}
          employees={employees}
          setPopTrigger={setPopTrigger}
        />
      ) : null}
       {popTrigger1 ? (
        <ProjectPop
          id={Idvalue1}
          project={project}
          setPopTrigger1={setPopTrigger1}
        />
      ) : null}
    </div>
  );
}

export default Report;

{
  /* <td>{x.employees.map((y)=>(
  <td>{y.fname}</td>
)

)}</td> */
}

// {project.map((item) => (
//   <tr>
//     <td>{item.id}</td>

//     <td>{item.project_name}</td>
//     <td>
//       {item.team.map((x) => (
//         <div>
//           <td>{x.name} &emsp;</td>

//         </div>
//       ))}
//     </td>
//     <td>
//             {item.team.map((y) => (

//                 <td>{y.employees.map(z=>(
//                   <td>{z.fname}</td>
//                 ))}
//                 </td>
//             ))}
//           </td>

//     <td>{item.created_at.substr(0, 10)}</td>
//   </tr>
// ))}
