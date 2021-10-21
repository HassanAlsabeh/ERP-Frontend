import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectPop = (props) => {
  const [items, setItems] = useState({
    projects: [],
  });

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/team/${props.id}`);

    const result = await response.json();
    setItems({
      projects: result.data.projects,
    });
    console.log(result.data.projects);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="popup_container">
      <div className="popup">
        <div className="popup_details">
          <ul>
            {items.projects.map((y) => {
              return (
                <Link className="link" to={`/project/${y.id}`}>
                  <li>
                    {y.project_name} 
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
          onClick={() => props.setPopTrigger1(false)}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
};

export default ProjectPop;
