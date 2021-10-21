import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
function EmployeesList() {
  document.title = "Employees"
  let history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState([
    "employee_id",
    "fname",
    "lname",
    "email",
    "team_id",
    "phonenum",
  ]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage, setEmployeePerPage] = useState(3);
  // const [selectedOption, setSelectedOption] = useState(options[0]);
  async function deleteOperation(id) {
    let result = await fetch(
      "http://localhost:8000/api/delete-employee/" + id,
      {
        method: "DELETE",
      }
    );
    result = await result.json();
    getData();
    Swal.fire("Good job!", "Employee Deleted Successfully", "success");
  }

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/employees`);
    const result = await response.json();
    setItems(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  function search(items) {
    return items.filter((item) => {
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

        <div className="table-wrapper" style={{ margin: "5% 5% 0 20%" }}>
          <h1>Employees</h1>
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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th style={{ width: "130px" }}>Customized Id</th>
                <th>FName</th>
                <th>LName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Team</th>

                <th style={{ width: "70px" }}>Photo</th>
                <th style={{ width: "50px" }}>Delete</th>
                <th style={{ width: "50px" }}>Edit</th>
                <th style={{ width: "50px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              {search(currentEmployee).map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.employee_id}</td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenum}</td>
                  <td>{item.team ? item.team.name : 'Not assigned' }</td>

                  <td>
                    <img
                      style={{ width: "60px", height: "50px" }}
                      src={"http://localhost:8000/" + item.file_path}
                    ></img>
                  </td>
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
                    <Link to={"/employees-update/" + item.id}>
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
                    {" "}
                    <Link to={"/employee/" + item.id}>
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
export default EmployeesList;
