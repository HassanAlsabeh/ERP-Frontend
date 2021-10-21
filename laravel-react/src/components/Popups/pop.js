import React, { useEffect, useState } from "react";
import "./Popup.css";
import { Line } from "react-chartjs-2";

import {FaWindowClose} from 'react-icons/fa';

const Pop = (props) => {
  const [front, setPop] = useState([]);
  const [date, setDate] = useState([]);
  const [ten, setTen] = useState([]);
  const [tenDate, setTenDate] = useState([]);


  
  const getfront = async () => {
    const response = await fetch(
      `http://localhost:8000/api/lastfivekpi/${props.id}/${props.kpiId}`,
      {
        method: "GET",
      }
      
    );
     
    let result = await response.json();
    let frontend = result.data;
    let rating = [];
    let label = [];
    console.log(frontend, 'skdj')
    frontend.map((item) => {
     
      return (
        rating.push(parseInt(item.rating)) &&
        label.push(item.created_at.slice(5, 10))
      );
      
    });


    setPop(rating.reverse());
    setDate(label.reverse());
  };

  const getLastTen = async () => {
    const response = await fetch(
        `http://localhost:8000/api/lasttenkpi/${props.id}/${props.kpiId}`,
      {
        method: "GET",
      }
    );
    let result = await response.json();
    let frontend = result.data;
    let rating_ten = [];
    let label_ten = [];

    frontend.map((item) => {
      return (
        rating_ten.push(parseInt(item.rating)) &&
        label_ten.push(item.created_at.slice(5, 10))
      );
    });

    setTen(rating_ten.reverse());
    setTenDate(label_ten.reverse());
  };

  useEffect(() => {
    getfront();
    getLastTen()
  }, []);

  return (
    <div className="popup_main">
      <div className="popup_inner">
        <div className="bar_five">
   
          <h1>{props.kpinamevalue.kpi_name}</h1>
          
          <Line
            const
            data={{
              labels: date,
              datasets: [
                {
                  label: "Last 5 Ratings",
                  data: front,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
            height={200}
            width={400}
          />
        </div>
        <div className="bar_10">
         
          <Line
            const
            data={{
              labels: tenDate,
              datasets: [
                {
                  label: "Last 10 Ratings",
                  data: ten,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                  ],
                  borderColor: [
                    "rgb(69, 170, 216)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
            height={250}
            width={750}
          />
        </div>
        <a style={{position:"absolute" , right:"5%" ,top:"5%" ,color:"blue" , fontSize:"1.5em"}} onClick={() => props.setPopTrigger(false)}  ><FaWindowClose  style={{width:"30px",height:"30px"}}/></a>
      </div>
    </div>
  );
};

export default Pop;
