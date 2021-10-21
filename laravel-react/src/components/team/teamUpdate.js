import Dashboard from "../dashboard/dashboard";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
function UpdateTeam(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");


  let history = useHistory();
  useEffect(async () => {
    let result = await fetch(
      "http://localhost:8000/api/team/" + props.match.params.id
    );
    result = await result.json();
    setData(result.data);
    setName(result.name);
  
  
  }, []);

  async function editTeam(id) {
    const formData = new FormData();

 
    formData.append("name", name);
  
    let result = await fetch(
      "http://localhost:8000/api/update_team/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    Swal.fire("Good job!", "Team Updated Successfully", "success");
    history.push("/teams-list");
  }
  return (
    <div>
      <Dashboard />
      <div className="form-wrapper" style={{ margin: "5% 20% 0 20%" }}>
        <h1>Update a Team</h1>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={data.name}
          className="form-control"
          
        />
        
     
       
        <br /> <br />
        <button
          onClick={() => editTeam(data.id)}
          className="btn btn-primary"
          style={{ marginBottom: "5%" }}
        >
          Update Team
        </button>
      </div>
    </div>
  );
}
export default withRouter(UpdateTeam);
