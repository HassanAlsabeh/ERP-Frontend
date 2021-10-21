import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pop from "../Popups/pop";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const KPIS = () => {
  const [frontend, setFrontend] = useState([]);
  const [frontendTrigger, setPopTrigger] = useState(false);

  let { id } = useParams();

  const getfront = async () => {
    const rating_front = await fetch(
      `http://localhost:8000/api/lastfront/${id}`
    );
    const result_two = await rating_front.json();
    const data_two = await result_two.data;
    setFrontend(data_two);
  };

  useEffect(() => {
    getfront();
  }, []);

  return (
    <>
      <div
        className="rating_section"
        style={{ marginRight: "7%", marginTop: "8%" }}
      >
        <ul>
          <li>
            <span onClick={() => setPopTrigger(true)} className="rating_title">
              Frontend
            </span>

            <>
              {frontend ? (
                <span style={{ width: 85, height: 85, margin: "10% 0 10% 0" }}>
                  <CircularProgressbar
                    value={frontend.rating * 10}
                    text={`${frontend.rating * 10}%`}
                  />
                </span>
              ) : (
                <span style={{ width: 85, height: 85, margin: "10% 0 10% 0" }}>
                  <CircularProgressbar value={0} text={`${0}%`} />
                </span>
              )}
            </>
          </li>
        </ul>
      </div>

      {frontendTrigger ? <Pop id={id} setPopTrigger={setPopTrigger} /> : null}
    </>
  );
};

export default KPIS;
