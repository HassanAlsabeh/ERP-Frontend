import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EmployeesList from "./components/employees/employee-listing.component";
import CreateEmployee from "./components/employees/employeeAdd";
import UpdateEmployee from "./components/employees/edit-employee.component";
import ProjectList from "./components/projects/ProjectList";
import CreateProject from "./components/projects/ProjectAdd";
import UpdateProject from "./components/projects/ProjectUpdate";
import Login from "./components/login/Login";
import Welcome from "./components/welcom/welcome";
import Admins from "./components/admins/admins";
import ShowAdmins from "./components/admins/showadmins";
import UpdateAdmins from "./components/admins/update-admins";
import addTeam from "./components/team/teamAdd";
import TeamsList from "./components/team/teamList";
import CreateTeam from "./components/team/teamUpdate";
import Home from "./components/charts/home";
import Register from "./components/register/register";
import Employee from "./components/employees/Employee";
import Project from "./components/projects/Project";
import Team from "./components/team/team";
import KPI from "./components/KPIs/kpis";
import KpiAddList from "./components/KPIs/kpi-add-list";
import Roles from "./components/roles/roles_add";
import RolesList from "./components/roles/role_list";
import UpdateRole from "./components/roles/roles_update";
import Report from "./components/reports/report";
function App() {
  return (
    <div className='root_root'>
      <Route path="/" exact component={Welcome} />
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/admins" exact component={Admins} />
      <Route path="/show-admins" exact component={ShowAdmins} />
      <Route path="/update-admins/:id" exact component={UpdateAdmins} />
      <Route path="/employees-list" exact component={EmployeesList}  />
      <Route path="/employees-add" exact component={CreateEmployee} />
      <Route path="/employees-update/:id" exact component={UpdateEmployee} />
      <Route path="/employee/:id" exact component={Employee} />
      <Route path="/projects-list" exact component={ProjectList} />
      <Route path="/projects-add" exact component={CreateProject} />
      <Route path="/projects-update/:id" exact component={UpdateProject} />
      <Route path="/teams-add" exact component={addTeam} />
      <Route path="/teams-list" exact component={TeamsList} />
      <Route path="/teams-update/:id" exact component={CreateTeam} />
      <Route path="/project/:id" exact component={Project} />
      <Route path="/team/:id" exact component={Team} />
      <Route path="/rate/:id" exact component={KpiAddList} />
      <Route path="/kpi-rating" exact component={KPI} />
      <Route path="/roles-add" exact component={Roles} />
      <Route path="/roles-list" exact component={RolesList} />
      <Route path="/roles-update/:id" exact component={UpdateRole} />
      <Route path="/report" exact component={Report} />
    </div>
  );
}

export default App;
