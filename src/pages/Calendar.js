import React, { useState } from 'react'
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groups from "../images/groups.png";
import calendarActive from "../images/calendar-active.png";
import CalendarCard from "../components/CalendarCard";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-inactive.png";
import desktopCalendar from "../images/desktop-calendar-active.png";


export default function Calendar(props) {

  // const [userGoals, setUserGoals] = useState([]);

  // const [userGroups, setUserGroups] = useState([]);

  return (
    <div>
      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
        actionBtn={<p className="desktop-header-text">Calendar</p>}
      />
    
      <NavTop 
        header="Calendar" 
        username={props.user.username}
      />

      <CalendarCard/>
      <div className="nav-btm-fixed">
        <NavBottom
          homeBtn={home}
          groupsBtn={groups}
          calendarBtn={calendarActive}
        />
      </div>
  </div>
  )
}
