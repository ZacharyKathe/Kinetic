import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavTop from "../components/NavTop";
import InviteUser from "../components/InviteUser";
import API from "../utils/API";
import Moment from "moment";
import DesktopNav from "../components/DesktopNav";
import GoalUpdateCard from "../components/GoalUpdateCard";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";





function Group(props) {

  const [myGroup, setMyGroup] = useState()
  const [groupUsers, setGroupUsers] = useState([])
  const [userGoals, setUserGoals] = useState([])
  const [inviteOpen, setInviteOpen] = useState(false)

  const history = useHistory();

  // Grabs url group id
  const { id } = useParams();
  let userGoalsArr = [];
  const goalArray = [];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/')
    }
    // Fetches the group based off the url id, then sets state as group
    const goals = [];
    API.getOneGroup(id)
      .then(res => {

        // Set the group
        setMyGroup(res.data)

        // Set the group users
        setGroupUsers(res.data.Users)

        // Push all the users' goal arrays into new array
        res.data.Users.map(user => goalArray.push(user.Goals))

        // Push each indivual goal from that arry into new array
        goalArray.map(goalArr => goalArr.map(goal => userGoalsArr.push(goal)))

        // Sort the array by which goal was most recently updated
        userGoalsArr.sort(function(a, b) {
          var keyA = new Date(a.lastUpdate),
            keyB = new Date(b.lastUpdate);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        // console.log(userGoalsArr);
        
        // Set the sorted user goals!
        setUserGoals(userGoalsArr)
      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignUsername = (userID) => {
    for (const user of groupUsers) {
      if (user.id === userID) {
        return user.username;
      }
    }
  }

  const groupName = (myGroup ? myGroup.name : "My Group")

  return (
    <div>
      <InviteUser
        group_id={id}
        group_name={groupName}
        show={inviteOpen}
        setShow={setInviteOpen} />

      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
      />

      <NavTop group_id={id} setInviteOpen={setInviteOpen} />
      <h1 className="feed-page-header text-center text-primary pb-4">{groupName} Feed</h1>
      {/* <button onClick */}
      <div className="group-updates">
        {userGoals ? userGoals.map((item) => <GoalUpdateCard goal={item} user={assignUsername(item.user_id)} />) : console.log('no goals to share!')}
      </div>
    </div>
  );
}

export default Group;