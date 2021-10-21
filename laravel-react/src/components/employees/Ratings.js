import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pop from "../Popups/pop";
import { CircularProgressbar } from "react-circular-progressbar";
const Ratings = () => {
  const [lastRating, setLastRating] = useState([]);

  const [kpiid, setKpiId] = useState("");
  const [kpiname, setkpiName] = useState([]);
  const [popTrigger, setPopTrigger] = useState(false);
  let { id } = useParams();

  const getData = async () => {
    let response = await fetch(`http://localhost:8000/api/employeekpi/${id}`, {
      method: "GET",
    });
    let result = await response.json();

    setLastRating(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="rateContainer">
      {lastRating.map((item) => {
        return (
          <>
            <div
              onClick={() => setPopTrigger(true)}
              className="circleContainer"
              style={{ marginRight: "7%", marginTop: "8%" }}
            >
              <ul>
                <li onClick={() => setKpiId(item.kpi_id)}>
                  <span className="rating_title">{item.kpi.kpi_name}</span>
                  <span onClick={() => setkpiName(item.kpi)}></span>
                  <>
                    {item.kpi.kpi_name ? (
                      <span
                        style={{ width: 85, height: 85, margin: "10% 0 10% 0" }}
                      >
                        <CircularProgressbar
                          value={item.rating * 10}
                          text={`${item.rating * 10}%`}
                        />
                      </span>
                    ) : (
                      <span
                        style={{ width: 85, height: 85, margin: "10% 0 10% 0" }}
                      >
                        <CircularProgressbar value={0} text={`${0}%`} />
                      </span>
                    )}
                  </>
                </li>
              </ul>
            </div>

            {popTrigger ? (
              <Pop
                id={id}
                kpiId={kpiid}
                kpinamevalue={kpiname}
                setPopTrigger={setPopTrigger}
              />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Ratings;
