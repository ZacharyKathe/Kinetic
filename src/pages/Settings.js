import React from 'react'
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import { useHistory } from "react-router-dom";

export default function Settings(props) {
  return (
    <div>
      <NavTop 
        header="Settings" 
        username={props.user.username}
      />
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