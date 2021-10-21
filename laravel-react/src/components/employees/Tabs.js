import React, { useState } from "react";

const Tabs = (props) => {
  const [toggle, setToggle] = useState(1);

  const toggleState = (index) => {
    setToggle(index);
  };
  return (
    <div className="tab_container">
      <div className="tab_button--container">
        <div
          onClick={() => toggleState(1)}
          className={toggle === 1 ? "tab_button tab-toggle" : "tab_button"}
        >
          About
        </div>
        <div
          onClick={() => toggleState(2)}
          className={toggle === 2 ? "tab_button tab-toggle" : "tab_button"}
        >
          Skills
        </div>
        <div
          onClick={() => toggleState(3)}
          className={toggle === 3 ? "tab_button tab-toggle" : "tab_button"}
        >
          Achiecments
        </div>
      </div>

      <div className={toggle === 1 ? "tabs_content" : "tabs_content inactive"}>
        <div className="employee-details">
          <ul>
            <li>
              <span className="employee-details-span">Email: </span>{" "}
            </li>
            <li>
              <span className="employee-details-span">Phone Number: </span>{" "}
            </li>
            <li>
              <span className="employee-details-span">Current Team: </span>{" "}
            </li>
          </ul>

          <ul>
            <li>
              <span className="employee_answers">{props.employee.email}</span>
            </li>
            <li>
              <span className="employee_answers">
                {props.employee.phonenum}
              </span>
            </li>
            <li>
              <span className="employee_answers">
                {props.team ? props.team.name : <>Unassigned</>}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={toggle === 2 ? "tabs_content" : "tabs_content inactive"}
      ></div>
      <div className={toggle === 3 ? "tabs_content" : "tabs_content inactive"}>
        <h1>Achievements</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          dolores quidem, pariatur accusantium commodi nobis quos provident
          nihil facilis reprehenderit.
        </p>
      </div>
    </div>
  );
};

export default Tabs;
