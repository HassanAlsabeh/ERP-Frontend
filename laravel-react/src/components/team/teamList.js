import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Pagination from "../pagination/pagination";
import TeamsPop from "./TeamsPop";

function TeamsList() {
  document.title = "Teams"

  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamPerPage, setTeamPerPage] = useState(4);
  const [emessage, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [popTrigger, setPopTrigger] = useState(false);
  const [Idvalue, setIdvalue] = useState("");

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

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/list-team");

    const result = await response.json();
    setItems(result.data);
    setEmployees(result.data.employees);

    setIsLoaded(false);
  };

  useEffect(() => {
    getData();
  }, []);

  function search(items) {
    return items.filter((item) => {
      if (item.name == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (isLoaded) {
    return <>loading...</>;
  } else {
    const indexOfLastTeam = currentPage * teamPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamPerPage;
    const currentTeam = search(items).slice(indexOfFirstTeam, indexOfLastTeam);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div>
        <Dashboard />
        <div className="table-wrapper" style={{ margin: "5% 5% 0 20%" }}>
          <h1>Teams</h1>
          <input
            style={{ width: "200px", marginBottom: "4%" }}
            type="text"
            name="search-form"
            id="search-form"
            className="form-control"
            placeholder="Search for..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {error ? <p style={{ color: "red" }}> {emessage} </p> : null}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Team Name</th>
                <th>Employee Count</th>
                <th>Created At</th>
                <th style={{ width: "80px" }}>Delete</th>
                <th style={{ width: "80px" }}>Edit</th>
                <th style={{ width: "80px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              {search(currentTeam).map((item) => (
                <tr onClick={() => setIdvalue(item.id)}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td className="clickable" onClick={() => setPopTrigger(true)}>
                    {item.employees.length}
                  </td>
                  <td>{item.created_at.substr(0, 10)}</td>
                  <td>
                    <Link
                      className="edit-link"
                      onClick={() => deleteOperation(item.id)}
                    >
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/teams-update/" + item.id}>
                      <Button
                        size="sm"
                        variant="info"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={"/team/" + item.id}>
                      <Button
                        size="sm"
                        variant="info"
                        style={{ marginRight: "10px" }}
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            postsPerPage={teamPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
          <Link className="edit-link" to={"/teams-add"}>
            <Button
              variant="primary"
              size="lg"
              block="block"
              type="submit"
              style={{ margin: "2% 0 10% 0" }}
            >
              Add Team
            </Button>
          </Link>
        </div>
        {popTrigger ? (
          <TeamsPop
            id={Idvalue}
            employees={employees}
            setPopTrigger={setPopTrigger}
          />
        ) : null}
      </div>
    );
  }
}
export default TeamsList;
