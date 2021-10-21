import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const Pop = (props) => {
  const [items, setItems] = useState({
      team:[]
  });


  const getData = async () => {
    const response = await fetch(`http://localhost:8000/api/project/${props.IdProject}`,{
        method:"GET"
    });
    const result = await response.json();
    setItems({
        team:result.team
    });
   
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="popup_container">
      <div className="popup">
         {items.team.map((y)=>{
             return(
                <div className="team_list" >
                    <Link className="link" to={`/team/${y.id}`}>
                    <ul>
                      <li>{y.name}</li>
                      </ul>
                    </Link>
                    </div>
             )
         })}
      
        <a
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            color: "blue",
            fontSize: "1.5em",
          }}
          onClick={() => props.setPopTrigger(false)}
        >
            

          <FaWindowClose style={{ width: "30px", height: "30px" }} />
        </a>
      </div>
    </div>
  );
};

export default Pop;
