import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavTop from "../components/NavTop";
import InviteUser from "../components/InviteUser";
import API from "../utils/API";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";



function Group(props) {

  const [myGroup, setMyGroup] = useState()
  const [groupUsers, setGroupUsers] = useState([])
  const [userGoals, setUserGoals] = useState([])
  const [inviteOpen, setInviteOpen] = useState(false)


  // Grabs url group id
  const { id } = useParams();

  useEffect(() => {
    // Fetches the group based off the url id, then sets state as group
    API.getOneGroup(id)
      .then(res => {
        const groupUserGoalArrays = []
        const groupUserGoals = []
        console.log(res.data);

        // Set the specific group
        setMyGroup(res.data)

        // Set all the group users
        setGroupUsers(res.data.Users)

        // Iterate through each user and push their goal arrays into an empty array
        for (const user of groupUsers) {
            groupUserGoalArrays.push(user.Goals)
        }

        // Iterate through THAT array, and push each individual goal into another array
        for (const array of groupUserGoalArrays) {
          for (let i = 0; i < array.length; i++) {
            const goal = array[i];
            groupUserGoals.push(goal)
            
          }
        }
        // Finally, set all the goals in this group
        setUserGoals(groupUserGoals);


      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <h1 className="feed-page-header">{groupName}</h1>
      <div className="group-updates">
        <h3>Updates render here</h3>
      </div>
    </div>
  );
}

export default Group;