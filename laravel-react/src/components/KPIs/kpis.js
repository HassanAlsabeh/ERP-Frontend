import React from "react";
import './kpi.css';
import { useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
import AddKpiComponent from "./AddKpiComponent";
function KPI() {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["fname", "lname", "email"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage, setEmployeePerPage] = useState(4);

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
    console.log("helloo", result.data);
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
        <AddKpiComponent/>
        <div className="table-wrapper" style={{ margin: "5% 25% 0 20%" }} >
          <h1>KPI Ratings</h1>
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

          <Table bordered hover>
            <thead  >
              <tr >
                <th style={{ width: "50px" }}>Id</th>
                <th style={{ width: "50px" }}>Name</th>
               
              

                <th style={{ width: "70px" }}>Photo</th>
            
                <th style={{ width: "50px" }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {search(currentEmployee).map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.fname} {item.lname}</td>
                 

                  <td>
                    <img
                      style={{ width: "60px", height: "50px" }}
                      src={"http://localhost:8000/" + item.file_path}
                    ></img>
                  </td>
                  
                  <td>
                    {" "}
                    <Link to={"/rate/" + item.id}>
                      <Button
                        size="sm"
                        variant="warning"
                        style={{ marginRight: "10px" }}
                       
                      >
                        Rate
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
          /><br>
          </br>
<br></br>
         
        </div>
      </div>
    );
  }
}
export default KPI;
