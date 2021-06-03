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


export default function Calendar(props) {

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);

  const [selectedTab, setSelectedTab] = useState('Calendar')

  return (
    <div>
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
