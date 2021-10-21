import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const ProjectPop = (props) => {
  const [items, setItems] = useState({
    team: [],
  });

  const getData = async () => {
    const response = await fetch(
      `http://localhost:8000/api/project/${props.IdProject}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    setItems({
      team: result.team,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="popup_container">
      <div className="popup">
        <div className="popup_details">
          <ul>
            {items.team.map((y) => {
              return (
                <Link to={`/team/${y.id}`}>
                  <li>{y.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <FaWindowClose
        className="exit"
        onClick={() => props.setPopTrigger(false)}
        style={{ width: "30px", height: "30px" }}
      />
    </div>
  );
};

export default ProjectPop;
