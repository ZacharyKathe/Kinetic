import React, { useEffect } from 'react'
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import ProfileEdit from "../components/ProfileEdit";
import AddGoalBtn from "../components/AddGoalBtn";
import home from "../images/home.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import { useHistory } from "react-router-dom";

export default function Profile(props) {
  const navHeader = `${props.user.username}'s profile`
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/')
    }
  }, [history])


  return (
    <div>
      <NavTop className="profile-nav" header={navHeader}/>
      <div className="profile-page">
      <AddGoalBtn />
      <ProfileEdit user={props.user}/>
      
      </div>
      <div className="nav-btm-fixed">
        <NavBottom
          homeBtn={home}
          groupsBtn={groups}
          calendarBtn={calendar}
        />
      </div>
    </div>
  )
}
