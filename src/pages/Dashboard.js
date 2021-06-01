import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import Goal from "../components/Goal";
//import API from "../utils/API";
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import AddGroupBtn from "../components/AddGroupBtn";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import calendarActive from "../images/calendar-active.png";
import DashboardCard from '../components/DashboardCard'
import GroupCard from "../components/GroupCard";





function Dashboard(props) {
  

  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);

  const [selectedTab, setSelectedTab] = useState('My Goals')

  // console.log(props.token);

  let allGoals = props.user.goals || [];
  const allGroups = props.user.groups || [];

  useEffect(() => {
    // Checks if user is logged in, and sends them to login if not
    if (!props.user.email) {
      history.push('/')
    }
    // gathers data from props and sets them as local state
    if (allGoals) {
      // TRYING TO GET PAGE TO RENDER NEW GOAL AFTER GOAL CREATION
      const incompleteGoals = allGoals.filter(goal => !goal.isComplete)
      console.log(incompleteGoals);
          setUserGoals(incompleteGoals)
        // })
    }
    if (allGroups) {
      setUserGroups(props.user.groups)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  



  // This function checks the selectedTab state and renders the correct component accordingly
  const renderSelectedTab = () => {

    switch (selectedTab) {
      case "My Goals":
        return (
          <>
          {/* <h1 className='blueBack'>Goals</h1> */}
            <div className='goalCards'>
              
              {userGoals.map(item => (
                <DashboardCard
                  
                  goal_name={item.goal_name}
                  goal_description={item.goal_description}
                  goal_category={item.goal_category}
                  goal_frequency={item.goal_frequency}
                  goal_target={item.goal_target}
                  goal_progress={item.goal_progress}
                  goal_start={item.goal_start}
                  goal_finish={item.goal_finish}
                  value_type={item.value_type}
                  id={item.id}
                  key={item.id}
                  token={props.token}
                />
              ))}
            </div>
          </>
        )
      case "My Groups":
        return (
          <>
            <div className='groupList'>
              {userGroups.map(item => (
                <GroupCard
                  name={item.name}
                  users={item.Users}
                  key={item.id}
                  id={item.id}
                />
              ))}
            </div>
          </>
        )
      case "Calendar":
        return (
          <div className='calendar'>
            <h2>Put calendar component here</h2>
          </div>
        )
      default: return (
        <h3>We have encountered an error...</h3>
      )
    }
  }

  const renderSelectedBtn = () => {
    switch (selectedTab) {
      case "My Goals":
        return (<AddGoalBtn />);
      case "My Groups":
        return (<AddGroupBtn />);
      case "Calendar":
        return ("Calendar button here?");
      default: return ("");
    }
  }

  return (
    <div>
      <NavTop header={selectedTab} />

      {/* Dashboard renders here based off what tab you are in */}
      {renderSelectedTab()}
      <div className="nav-btm-fixed">
      {renderSelectedBtn()}
        <NavBottom
          setSelectedTab={setSelectedTab}
          homeBtn={selectedTab === "My Goals" ? homeActive : home}
          groupsBtn={selectedTab === "My Groups" ? groupsActive : groups}
          calendarBtn={selectedTab === "Calendar" ? calendarActive : calendar}
        />
      </div>
    </div>
  );
}

export default Dashboard;
