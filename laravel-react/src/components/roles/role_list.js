import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Pagination from "../pagination/pagination";

function RoleList() {
  document.title = "Roles"
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["role_name"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolePerpage, setRolePerpage] = useState(4);
  const [emessage, setMessage] = useState("");

  async function deleteRole(id) {
    let result = await fetch("http://localhost:8000/api/delete-roles/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    
    getData();
  }

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/roles");

    const result = await response.json();
    console.log("hello", result.data);
    setItems(result.data);
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
    const indexOfLastTeam = currentPage * rolePerpage;
    const indexOfFirstTeam = indexOfLastTeam - rolePerpage;
    const currentRole = search(items).slice(indexOfFirstTeam, indexOfLastTeam);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div>
        <Dashboard />
        <div className="table-wrapper" style={{ margin: "5% 10% 0 20%" }}>
          <h1>Roles</h1>
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
          {error ? <p style={{color : 'red'}}> {emessage} </p>: null}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Role Name</th>

                <th>Created At</th>
                <th style={{ width: "80px" }}>Delete</th>
                <th style={{ width: "80px" }}>Edit</th>
               
              </tr>
            </thead>
            <tbody>
              {console.log("hi", items)}
              {search(currentRole).map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.role_name}</td>
                  <td>{item.created_at.substr(0, 10)}</td>
                  <td>
                    <Link
                      className="edit-link"
                      onClick={() => deleteRole(item.id)}
                    >
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/roles-update/" + item.id}>
                      <Button
                        size="sm"
                        variant="info"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            postsPerPage={rolePerpage}
            totalPosts={items.length}
            paginate={paginate}
          />
          <Link className="edit-link" to={"/roles-add"}>
            <Button
              variant="primary"
              size="lg"
              block="block"
              type="submit"
              style={{ margin: "2% 0 10% 0" }}
            >
              Add Role
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
export default RoleList;
