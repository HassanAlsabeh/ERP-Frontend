import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddKpiComponent = () => {
  document.title = "KPI"
  const [kpi_name, setKpiName] = useState("");
  const [error, setError] = useState(false);

  let kpi = {
    kpi_name,
  };

  const AddSkill = async (e) => {
      e.preventDefault()
    const response = await fetch("http://localhost:8000/api/kpi", {
      method: "POST",
      body: JSON.stringify(kpi),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if(response.status == 500){
        setError(true)
    }else if(response.status == 201){
        Swal.fire("Good job!", "Skill Added Successfully", "success");
        setError(false)
    }
  };

  return (
    <>
      <div className='error'>
      {error ? (
        <span style={{ color: "red" }}> something went wrong try again</span>
      ) : (
        null
      )}
      </div>
      <div className="add--skill">
        <input
          onChange={(e) => setKpiName(e.target.value)}
          type="text"
          placeholder="Add a new skill"
          for="skill"
        />
        <button onClick={AddSkill} className="add--skill--button">
          Add skill
        </button>
      </div>
    </>
  );
};

export default AddKpiComponent;
