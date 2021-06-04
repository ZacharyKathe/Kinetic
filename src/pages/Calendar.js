import React, { useState } from 'react'
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import calendarActive from "../images/calendar-active.png";
import CalenderCard from "../components/CalenderCard";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-inactive.png";
import desktopCalendar from "../images/desktop-calendar-active.png";


export default function Calendar(props) {

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);

  const [selectedTab, setSelectedTab] = useState('Calendar')

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

    <>
    
    </>
    <CalenderCard/>
    <div className="nav-btm-fixed">
      <NavBottom
        homeBtn={selectedTab === "My Goals" ? homeActive : home}
        groupsBtn={selectedTab === "My Groups" ? groupsActive : groups}
        calendarBtn={selectedTab === "Calendar" ? calendarActive : calendar}
      />
    </div>
  </div>
  )
}
