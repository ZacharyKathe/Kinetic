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
import LiveGoalsBtn from "../components/LiveGoalsBtn";




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
    API.getCompleteGoals(token).then(res => {
      console.log(res.data)
      setUserGoals(res.data.Goals)
      setUserGroups(res.data.Groups)
      console.log(res.data.Goals[0].completedDate);
    }).catch(err => {
      console.log(err);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <NavTop header="Completed Goals" />

      <>
            <div className='goals-page' >
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
                    is_complete={item.isComplete}
                    completed_date={item.completedDate}
                    value_type={item.value_type}
                    id={item.id}
                    key={item.id}
                    token={props.token}
                    setUserGoals={setUserGoals}
                  />
                )) : console.log("no goals right now")}
              </div>
              <LiveGoalsBtn />
            </div>
          </>

      <div className="nav-btm-fixed">
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
