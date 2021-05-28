import React, { useEffect, useState } from "react";
import Goal from "../components/Goal";
import API from "../utils/API";

function Dashboard(props) {
  const [user, setUser] = useState(
    {
      username: '',
      email: '',
      id: "",
    });

  const [userGoals, setUserGoals] = useState(
    {
      goals: [],
    }
  )


    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      
      API.getUser(user.id).then(res=>{
        console.log(res.data.Goals);
        setUserGoals({
          goals: res.data.Goals,
          
        })
        }, []);

  
      });

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>
        
      </p>
      <Goal />
    </div>
  );
}

export default Dashboard;
