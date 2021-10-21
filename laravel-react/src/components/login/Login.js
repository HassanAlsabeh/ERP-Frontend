
import React , {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
function Login1()
{  document.title = "Login"  
  const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem("user-info")){
            history.push("/login")
        }
    },[])

    async function login() {
     
    
        let item={email, password}
       
        let result= await fetch ("http://localhost:8000/api/login",
        {
            method:'POST', 
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result= await result.json();
        if(result.success){
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/home");
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong Username or Passworlogind!   Try Again',
               
                
              })
        }
       
    }
    
    return(

<div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Sign In </h2>

        <div className="fadeIn first">
          <img
            src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4bb8cd84a079defaef3e2d%2F0x0.jpg"
            height="120px"
           
            id="icon"
            alt="User Icon"
          />
        </div>

       <br></br>
          <input
            type="text1"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input type="submit" onClick={login} className="fadeIn fourth" value="Log In" />
      

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>



    )
}
export default Login1   