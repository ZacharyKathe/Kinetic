import React, { useEffect, useState } from "react";
import Goal from "../components/Goal";
import API from "../utils/API";
import DashboardCard from '../components/DashboardCard'

function Dashboard(props) {
  const [user, setUser] = useState(
    {
      username: '',
      email: '',
      id: "",
    });

  const [userGoals, setUserGoals] = useState([]);

  console.log(props.user.goals);
  
  const allGoals = props.user.goals
    useEffect(() => {
      if(allGoals){
        setUserGoals(allGoals)
      }
        }, []);

      
      
    

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
      {allGoals.map(item => (
        <DashboardCard
        goal_category = {item.goal_category}
        goal_description = {item.goal_description}
        goal_frequency = {item.goal_frequency}
        />
      ))}
      </div>
      <Goal />
    </div>
  );
}

export default Dashboard;
