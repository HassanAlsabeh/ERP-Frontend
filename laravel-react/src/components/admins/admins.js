import React, { useState } from "react";
import Dashboard from "../dashboard/dashboard";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function Admins() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function addAdmin(e) {
    e.preventDefault();
    let admin = {
      name,
      email,
      password,
    };

    let result = await fetch("http://localhost:8000/api/register", {
      method: "post",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    Swal.fire("Good job!", "Admin Added Successfully", "success");
    result = await result.json();
    history.push("/show-admins");
  }

  return (
    <div>
      <Dashboard />
      <div style={{ margin: "auto", width: "20%", marginTop: "5rem" }}>
        <h1>Add Admin</h1>
        <Form action="">
          <Col>
            <Form.Control
              style={{ marginBottom: "1rem" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text1"
              style={{width:"260px" , height:"50px" ,marginTop:"10%", marginBottom:"5%" ,backgroundColor:"#F2EFEF"}}
              name="name"
              id=""
              placeholder="Name"
            />
          </Col>
          <Col>
            <Form.Control
              style={{ marginBottom: "1rem" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text1"
              style={{width:"260px" , height:"50px" , marginBottom:"5%" ,backgroundColor:"#F2EFEF"}}
              name="email"
              id=""
              placeholder="Email"
            />
          </Col>
          <Col>
            <Form.Control
              style={{ marginBottom: "1rem" }}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              style={{width:"260px" , height:"50px" ,marginBottom:"5%",backgroundColor:"#F2EFEF"}}
              id=""
              placeholder="Password"
            />
          </Col>
          <Col>
            <Form.Control
              onClick={addAdmin}
              type="submit"
              name=""
              id=""
              value="Add Admin"
              style={{ margin: "0" }}
            />
          </Col>
        </Form>
      </div>
    </div>
  );
}
