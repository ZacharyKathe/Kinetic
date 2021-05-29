import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Goal from "../components/Goal";
//import API from "../utils/API";
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import DashboardCard from '../components/DashboardCard'

function Dashboard(props) {
  const history = useHistory();

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
      <NavTop header="Goals" />
      <div className='goalCards'>
      {allGoals.map(item => (
        <DashboardCard
        goal_name = {item.goal_name}
        goal_category = {item.goal_category}
        goal_description = {item.goal_description}
        goal_frequency = {item.goal_frequency}
        goal_finish = {item.goal_finish}
        />
      ))}
      </div>
      
      <AddGoalBtn />
      <NavBottom 
        homeBtn={homeActive}
        groupsBtn={groups}
        calendarBtn={calendar}
        />
    </div>
  );
}

export default Dashboard;


// const allGoals = props.user.goals || [];
//   useEffect(() => {
//     if (!props.user.email) {
//       history.push('/')
//     }
//     if (allGoals.length > 0) {
//     setUserGoals(allGoals);
//   }
//   console.log(userGoals);
  
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);