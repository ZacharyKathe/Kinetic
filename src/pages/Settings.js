import React from 'react'
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-inactive.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";
import { useHistory } from "react-router-dom";

export default function Settings(props) {
  return (
    <div>
      <DesktopNav
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
        actionBtn={<p className="desktop-header-text">Settings</p>}
      />
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