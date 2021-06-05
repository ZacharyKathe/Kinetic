import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavTop from "../components/NavTop";
import InviteUser from "../components/InviteUser";
import API from "../utils/API";
import Moment from "moment";
import DesktopNav from "../components/DesktopNav";
import GoalUpdateCard from "../components/GoalUpdateCard";
import AddGoalToGroup from "../components/AddGoalToGroup"
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";





function Group(props) {

  const [myGoals, setMyGoals] = useState()
  const [myGroup, setMyGroup] = useState()
  const [groupUsers, setGroupUsers] = useState([])
  const [groupGoals, setGroupGoals] = useState([])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [modalShow, setModalShow] = useState(false);

  const history = useHistory();

  // Grabs url group id
  const { id } = useParams();
  let goalArray = [];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/')
    }

    API.getIncompleteGoals(token)
      .then(res => {
      setMyGoals(res.data.Goals)
    }).catch(err => {
      console.log(err);
    })

    API.getOneGroup(id)
      .then(res => {

        console.log(res.data.Goals);
        
        // Set the group
        setMyGroup(res.data)



        // Set the group users
        setGroupUsers(res.data.Users)

        goalArray = res.data.Goals;

        // Sort the array by which goal was most recently updated
        goalArray.sort(function (a, b) {
          var keyA = new Date(a.lastUpdate),
            keyB = new Date(b.lastUpdate);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        
        // Set the sorted user goals!
        setGroupGoals(goalArray)
        
      })
      .catch(err => {
        console.log(err);
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  if (groupGoals) {
  console.log(groupGoals);
  }
  

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
      <AddGoalToGroup
        goals={myGoals ? myGoals : ""}
        group_id={id}
        show={modalShow}
        setModalShow={setModalShow}
        useEffect={useEffect} />

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
      <h4 className="add-goal-to-group text-center" onClick={() => setModalShow(true)}>Add a goal to this group!</h4>
      <div className="group-updates">
        {groupGoals ? groupGoals.map((item) => <GoalUpdateCard goal={item} user={assignUsername(item.user_id)} />) : console.log('no goals to share!')}
      </div>
    </div>
  );
}

export default Group;