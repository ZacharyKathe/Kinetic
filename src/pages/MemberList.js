import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import calendar from "../images/calendar.png";
import GroupCard from "../components/GroupCard";
import API from "../utils/API"
import { useHistory } from "react-router-dom";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";


export default function MemberList(props) {
  const history = useHistory();

  // const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token')
    // Checks if user is logged in, and sends them to login if not
    if (!token) {
      history.push('/')
    }
    // gathers data from props and sets them as local state
    API.getDashboard(token).then(res => {
      // setUserGoals(res.data.Goals)
      setUserGroups(res.data.Groups)
    }).catch(err => {
      console.log(err);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function checks the selectedTab state and renders the correct component accordingly

  return (
    <div>
      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
      />

      <NavTop 
        header="Group Members"
        username={props.user.username}
      />
            <div className='groupList'>
              {userGroups ? userGroups.map(item => (
                <GroupCard
                  name={item.name}
                  users={item.Users}
                  key={item.id}
                  id={item.id}
                />
              )) : console.log('no groups')}
            </div>
      <div className="nav-btm-fixed">
        <NavBottom
          homeBtn={home}
          groupsBtn={groupsActive}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}
