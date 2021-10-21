import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
export default function Rate() {
  const [kpi_id, setKpiId] = useState("");
  const [rating, setRating] = useState("");
  const [employeekpi, setEmployeeKpi] = useState([]);
  const [error, setError] = useState(false);

  let { id } = useParams();

  const getSkillNames = async () => {
    let response = await fetch("http://localhost:8000/api/kpi", {
      method: "GET",
    });

    let result = await response.json();
    let skillNames = result.data;
    setEmployeeKpi(skillNames);
  };

  async function addKpi() {
    const formData = new FormData();

    formData.append("kpi_id", kpi_id);
    formData.append("employee_id", id);
    formData.append("rating", rating);

    let result = await fetch("http://localhost:8000/api/employeekpi", {
      method: "POST",
      body: formData,
    });
    console.log(result);
    if (result.status == 201) {
      Swal.fire("Good job!", "Skill Added Successfully", "success");

      setError(false);
    } else if (result.status == 500) {
      setError(true);
    }
  }
  const ratingChanged = (newRating) => {
    setRating(newRating * 2);
  };

  useEffect(() => {
    getSkillNames();
  }, []);

  return (
    <div>
      <h2 style={{ color: "black", marginLeft: "45%", fontSize: "2em" }}>
        Rating
      </h2>
      <div className="form-wrapper" style={{ margin: "2% 35% 0 38%" }}>
        {error ? (
          <span style={{ color: "red" }}>
            Both Skills and rate are required
          </span>
        ) : null}
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            const value = e.target.value;
            setKpiId(value);
          }}
        >
          <option>{null}</option>
          {employeekpi.map((item) => {
            return <option value={item.id}> {item.kpi_name} </option>;
          })}
        </select>
        <br></br>
        <span style={{ color: "black" }}>Rating &emsp; {"(1-5)"}</span>

        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={40}
          activeColor="red"
        />
        <br></br>
        <Button onClick={addKpi}>Add</Button>
      </div>
    </div>
  );
}
