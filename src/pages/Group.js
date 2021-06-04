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
  const [inviteOpen, setInviteOpen] = useState(false)


  // Grabs url group id
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // Fetches the group based off the url id, then sets state as group
    API.getOneGroup(id)
      .then((res => {
        console.log(res.data);
        setMyGroup(res.data)
      }))
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