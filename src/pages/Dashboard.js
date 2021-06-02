import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import Goal from "../components/Goal";
import API from "../utils/API";
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import DashboardCard from '../components/DashboardCard'
import OldGoalsBtn from "../components/OldGoalsBtn";
// import DesktopNav from "../components/DesktopNav";




function Dashboard(props) {


  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);


  // console.log(props.token);


  useEffect(() => {
    const token = localStorage.getItem('token')
    // Checks if user is logged in, and sends them to login if not
    if (!token) {
      history.push('/')
    }
    // gathers data from props and sets them as local state
    API.getIncompleteGoals(token).then(res => {
      setUserGoals(res.data.Goals)
      setUserGroups(res.data.Groups)
    }).catch(err => {
      console.log(err);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <NavTop header="My Goals" />
      <>
            <div className='goals-page' >
            <OldGoalsBtn />
              <div className='goalCards'>

                {userGoals ? userGoals.map(item => (
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
                    completed_date={item.completedDate}
                    key={item.id}
                    token={props.token}
                    setUserGoals={setUserGoals}
                  />
                )) : console.log("no goals right now")}
              </div>
            </div>
          </>

      <div className="nav-btm-fixed">
      <AddGoalBtn />
        <NavBottom
          homeBtn={homeActive}
          groupsBtn={groups}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}

export default Dashboard;
