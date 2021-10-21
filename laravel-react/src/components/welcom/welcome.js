import React, { Component } from "react";
import "./welcome.css";

export default class Welcome extends Component {
  componentDidMount(){
    document.title = "Welcome"
  }
  render() {
    return (
      <div className="background">
        <button style={{ fontFamily: "Arial" }} class="btn-5">
          <a href="/login">LOGIN</a>
        </button>
      </div>
    );
  }
}
