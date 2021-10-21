import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import ProjectPop from "./ProjectPop";
import Pagination from "../pagination/pagination";

function ProjectList() {
  document.title = "Projects"
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [Idvalue, setIdvalue] = useState([]);
  const [q, setQ] = useState("");
  const [emessage, setMessage] = useState('')
  const [searchParam] = useState(["project_name"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage, setProjectPerPage] = useState(4);
  const [popTrigger, setPopTrigger] = useState(false);


  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/delete-project/" + id, {
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
    const response = await fetch("http://localhost:8000/api/list-project");
    const result = await response.json();
    console.log("hello", result);
    setItems(result.data);
    setIsLoaded(false);
  };

  const getTeams = async () => {
    const response = await fetch("http://localhost:8000/api/list-team");
    const result = await response.json();
    console.log("hi", result);
    setTeams(result.data);
    setIsLoaded(false);
  };

  useEffect(() => {
    getData();
    getTeams();
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
    const indexOfLastProject = currentPage * projectPerPage;
    const indexOfFirstProject = indexOfLastProject - projectPerPage;
    const currentProject = search(items).slice(indexOfFirstProject, indexOfLastProject);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div>
        <Dashboard />
        <div className="table-wrapper" style={{ margin: "5% 5% 0 20%" }}>
          <h1>Projects</h1>
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
          {error ? <p style={{color : 'red'}}> {emessage} </p> : null}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>

                <th>Project Name</th>
                <th>Teams</th>
                <th>Created At</th>
                <th style={{ width: "80px" }}>Delete</th>
                <th style={{ width: "80px" }}>Edit</th>
                <th style={{ width: "80px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              {search(currentProject).map((item) => (
                <tr onClick={()=> setIdvalue(item.id)}> 
                  <td>{item.id}</td>
                  <td>{item.project_name}</td>
                  <td  className="clickable" onClick={() => setPopTrigger(true)}>{item.team.length}</td>
                  <td>{item.created_at.substr(0,10)}</td>
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
                    <Link to={"/projects-update/" + item.id}>
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
                    <Link to={"/project/" + item.id}>
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
            postsPerPage={projectPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
          <Link className="edit-link" to={"/projects-add"}>
            <Button
              variant="primary"
              size="lg"
              block="block"
              type="submit"
              style={{ margin: "2% 0 10% 0" }}
            >
              Add Project
            </Button>
          </Link>
        </div>
        {popTrigger ? (
              <ProjectPop IdProject={Idvalue} setPopTrigger={setPopTrigger} />
              
            ) : null}
      </div>
    );
  }
}
export default ProjectList;
