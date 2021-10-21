import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

const TeamsPop = (props) => {
  const [items, setItems] = useState({
    employees: [],
  });

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/team/${props.id}`);

    const result = await response.json();
    setItems({
      employees: result.data.employees,
    });
    console.log(result.data.employees);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="popup_container">
      <div className="popup">
        <div className="popup_details">
          <ul>
            {items.employees.map((y) => {
              return (
                <Link className="link" to={`/employee/${y.id}`}>
                  <li>
                    {y.fname} {y.lname}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <FaWindowClose
          className="exit"
          onClick={() => props.setPopTrigger(false)}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
};

export default TeamsPop;
