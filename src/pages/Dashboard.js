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

  const [selectedTab, setSelectedTab] = useState('Home')


  console.log(props.user.goals);

  const allGoals = props.user.goals || [];
  useEffect(() => {
    if (!props.user.email) {
      history.push('/')
    }
    if (allGoals) {
      setUserGoals(allGoals)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  // This function checks the selectedTab state and renders the correct component accordingly
  const renderSelectedTab = () => {
    let result = null;

    console.log(selectedTab);

    switch (selectedTab) {
      case "Home":
        return (
          <div className='goalCards'>
            {allGoals.map(item => (
              <DashboardCard
                goal_name={item.goal_name}
                goal_category={item.goal_category}
                goal_description={item.goal_description}
                goal_frequency={item.goal_frequency}
                goal_finish={item.goal_finish}
              />
            ))}
          </div>
        )
      case "Groups":
        return (
          <div className='groupList'>
            <h2>Put group list component here</h2>
          </div>
        )
      case "Calendar":
        return (
          <div className='calendar'>
            <h2>Put calendar component here</h2>
          </div>
        )
    }

    return result;
  }

  return (
    <div>
      <NavTop header={selectedTab} />

      {/* Dashboard renders here based off what tab you are in */}
      {renderSelectedTab()}

      <AddGoalBtn />
      <NavBottom
        setSelectedTab={setSelectedTab}
        homeBtn={homeActive}
        groupsBtn={groups}
        calendarBtn={calendar}
      />
    </div>
  );
}

export default Dashboard;
