import React, { Component } from "react";
import "./dashboard.css";
import {useHistory} from 'react-router-dom';
import { Redirect } from "react-router-dom";

const Dashboard = () => {

  const history=useHistory();
 const logout = () => {
  window.localStorage.removeItem("user-info");
    history.push("/login")
  }

  return (
    <html>
      <head></head>
      <body >
        <div class="area"></div>
        {localStorage.getItem("user-info", true) ? (
        <nav class="main-menu" >
          <ul>
            <li>
              <a href="/home">
                <i class="fa fa-home fa-2x"></i>
                <span class="nav-text">Dashboard</span>
              </a>
            </li>
            <li class="has-subnav"> 
    <title>ERP System</title>
              <a href="/show-admins">
                <i class="fa fa-user fa-2x"></i>
                <span class="nav-text">Admins</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="/roles-list">
                <i class="	fa fa-briefcase fa-2x"></i>
                <span class="nav-text">Roles</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="/employees-list">
                <i class="fa fa-list fa-2x"></i>
                <span class="nav-text">Employees</span>
              </a>
            </li>   
            <li class="has-subnav">
              <a href="/teams-list">
                <i class="fa fa-folder-open fa-2x"></i>
                <span class="nav-text">Teams</span>
              </a>
            </li>
            <li>
              <a href="/projects-list">
                <i class="fa fa-laptop fa-2x"></i>
                <span class="nav-text">Projects</span>
              </a>
            </li>
            <li>
              <a href="/kpi-rating">
                <i class="fa fa-star-o fa-2x"></i>
                <span class="nav-text">KPIs Ratings</span>
              </a>
            </li>
            <li>
              <a href="/report">
                <i class="fa fa-bar-chart-o fa-2x"></i>
                <span class="nav-text">Report</span>
              </a>
            </li>
          </ul>

          <ul class="logout">
            <li>
            <a href=""  onClick={logout}> 
                <i class="fa fa-power-off fa-2x"></i>
                <span class="nav-text">
                  Logout
                </span>
                </a>
            </li>
          </ul>
        </nav>):( <Redirect to="/"></Redirect>)}
      </body>
    </html>
  );
};

export default Dashboard;
