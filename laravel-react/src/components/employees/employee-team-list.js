import React from "react";

import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
function EmployeeTeamList(props) {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["fname", "lname", "email"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage, setEmployeePerPage] = useState(3);
  const [roles, setRoles] = useState([]);
  const [val, setVal] = useState("");

  const updateRole = async (id, role) => {
    const formData = new FormData();
    formData.append("role_id", role);
    const response = await fetch(
      `http://localhost:8000/api/updaterole/${id}?_method=PUT`,
      {
        method: "POST",
        body: formData,
      }
    );

    let result = response.json();
    props.getDataInsideTeam();
    props.getEmployeesUnassigned();
  };

  const getRoles = async () => {
    const response = await fetch(`http://localhost:8000/api/roles`);
    const result = await response.json();
    setRoles(result.data);
  };

  const getData1 = async () => {
    const response = await fetch("http://localhost:8000/api/list-team");
    const result = await response.json();
    setItems1(result.data);
    setIsLoaded(false);
  };

  async function editEmployee(id, team_id) {
    const formData = new FormData();
    formData.append("team_id", team_id);

    let result = await fetch(
      "http://localhost:8000/api/updateOneEmployee/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Employee Added Successfully", "success");
    props.getDataInsideTeam();
    props.getEmployeesUnassigned();
  }

  useEffect(() => {
    props.getEmployeesUnassigned();
    getData1();
    getRoles();
  }, []);

  function search() {
    return props.items.filter((item) => {
      if (item.fname == filterParam) {
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

  if (error) {
    return <>{error.message}</>;
  } else if (isLoaded) {
    return <>loading...</>;
  } else {
    const indexOfLastEmployee = currentPage * employeePerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;
    const currentEmployee = search(items).slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div>
        <Dashboard />

        <div className="table-wrapper" style={{ margin: "5% 15% 0 20%" }}>
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

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>FName</th>
                <th>LName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Team </th>
                <th style={{ width: "70px" }}>Photo</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployee.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenum}</td>
                  <td>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setVal(value);
                      }}
                      name="cars"
                      id="cars"
                    >
                      <option value={null}  selected>
                        {null}
                      </option>
                      {items1.map((item) => {
                        return <option value={item.id} > {item.name} </option>;
                      })}
                    </select>
                  </td>
                  <td>
                    <img
                      style={{ width: "60px", height: "50px" }}
                      src={"http://localhost:8000/" + item.file_path}
                    ></img>
                  </td>
                  <td>
                    <Button
                      onClick={() => editEmployee(item.id, val)}
                      variant="primary"
                      size="small"
                      block="block"
                      type="submit"
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            postsPerPage={employeePerPage}
            totalPosts={items.length}
            paginate={paginate}
          />

          <Link className="edit-link" to={"/employees-add"}>
            <Button
              variant="primary"
              size="lg"
              block="block"
              type="submit"
              style={{ margin: "2% 0 10% 0" }}
            >
              Add Employee
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
export default EmployeeTeamList;
