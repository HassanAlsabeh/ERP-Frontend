import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function ShowAdmins() {
  document.title = "Admins";
  const [admins, setAdmins] = useState();
  const [deleted, setDeleted] = useState(false);

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/list");
    const result = await response.json();
    console.log(result);
    setAdmins(result);
  };
  async function deleteUser(id) {
    let result = await fetch("http://localhost:8000/api/admins/" + id, {
      method: "DELETE",
    });
    result = await result.json();

    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ width: "50%", margin: "auto", marginTop: "10rem" }}>
      <Dashboard />
      <h1 style={{ marginBottom: "5%", marginTop: "-10%" }}>Admins</h1>
      {deleted === true ? (
        <span style={{ color: "red" }}> Admin deleted successfully </span>
      ) : null}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.created_at.substr(0, 10)}</td>
                  <td>
                    <Link to={`/update-admins/${item.id}`}>
                      {" "}
                      <Button
                        size="sm"
                        variant="info"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td onClick={() => deleteUser(item.id)}>
                    <Link>
                      {" "}
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Link to={"/admins"}>
        <Button
          variant="primary"
          size="lg"
          block="block"
          type="submit"
          style={{ margin: "2% 0 10% 0" }}
        >
          Add Admin
        </Button>
      </Link>
    </div>
  );
}
