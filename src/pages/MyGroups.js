import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import AddGroupBtn from "../components/AddGroupBtn";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import calendarActive from "../images/calendar-active.png";
import GroupCard from "../components/GroupCard";
import { useHistory } from "react-router-dom";


export default function MyGroups(props) {
  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);

  const [selectedTab, setSelectedTab] = useState('My Groups')

  let allGoals = props.user.goals || [];
  const allGroups = props.user.groups || [];

  useEffect(() => {
    console.log(props.user)
    // Checks if user is logged in, and sends them to login if not
    if (!props.user.email) {
      history.push('/')
    }
      // gathers data from props and sets them as local state
      if (allGroups) {
        setUserGroups(props.user.groups)
      }
      console.log(props.user)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function checks the selectedTab state and renders the correct component accordingly

  return (
    <div>
      <NavTop 
        header="My Groups"
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
      <AddGroupBtn />
        <NavBottom
          homeBtn={home}
          groupsBtn={groupsActive}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}
