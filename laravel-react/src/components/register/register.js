import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../login/login.css";

const Register = () => {
  document.title = "Register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Register </h2>

        <div className="fadeIn first">
          <img
            src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4bb8cd84a079defaef3e2d%2F0x0.jpg"
            id="icon"
            alt="User Icon"
          />
        </div>

        <form onSubmit={submit}>
          <input
            type="text1"
            id="login"
            className="fadeIn second"
            name="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text1"
            id="email"
            className="fadeIn third"
            name="register"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="register"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
