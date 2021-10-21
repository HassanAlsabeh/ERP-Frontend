import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./team.css";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import EmployeeTeamList from "../employees/employee-team-list";
import Swal from "sweetalert2";
const Team = () => {
  const [error, setError] = useState(false);
  const [emessage, setMessage] = useState("");
  const [team, setTeam] = useState("");
  const [items, setItems] = useState([]);
  let { id } = useParams();

  const getEmployeesUnassigned = async () => {
    const response = await fetch(`http://localhost:8000/api/filter`);
    const result = await response.json();
    console.log(result, "ksha");
    setItems(result);
  };

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/team/${id}`);
    const result = await response.json();
    console.log("hello00", result.data);
    setTeam(result.data);
  };
  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/delete-team/" + id, {
      method: "DELETE",
    });
    if (result.status == 500) {
      setError(true);
      let message = await result.json();
      setMessage(message.message);
    } else if (result.status == 201) {
      getData();
      setError(false);
      Swal.fire("Good job!", "Team Deleted Successfully", "success");
    }
  }

  const removeFromTeam = async (id) => {
    let team_id = null;
    const formData = new FormData();
    formData.append("team_id", team_id);

    let result = await fetch(
      "http://localhost:8000/api/removefromteam/" + id + "?_method=put",
      {
        method: "post",
        body: FormData,
      }
    );
    getData();
    getEmployeesUnassigned();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Dashboard />
      {team && (
        <div>
          <h2 style={{ color: "black", marginLeft: "45%", fontSize: "2em" }}>
            {team.name}
          </h2>
          <div className="select_project" style={{ marginTop: "3%" }}>
            {error ? <p style={{ color: "red" }}> {emessage}</p> : null}
            <div className="team_container">
              <div className="team_container--section">
                {team.employees.map((x) => {
                  return (
                    <div
                      className="team_container--data"
                      style={{ marginLeft: "10%" }}
                    >
                      <Link className="link" to={`/employee/${x.id}`}>
                        <ul>
                          <li>{x.id}</li>
                          <li>{`${x.fname} ${x.lname}`}</li>
                          <li>
                            {!x.role_id || x.role == null ? (
                              <> No current role</>
                            ) : (
                              <> {x.role.role_name} </>
                            )}
                          </li>
                        </ul>
                      </Link>
                      <span className="team--lastchild">
                        <Link onClick={() => removeFromTeam(x.id)}>
                          <i class="fas fa-minus-circle"></i>{" "}
                        </Link>
                      </span>
                    </div>
                  );
                })}
              </div>
              <Link onClick={() => deleteOperation(team.id)}>
                <button>Delete Team</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      ;
      <EmployeeTeamList
        items={items}
        getDataInsideTeam={getData}
        getEmployeesUnassigned={getEmployeesUnassigned}
      />
    </>
  );
};

export default Team;
