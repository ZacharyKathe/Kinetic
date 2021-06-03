import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import { useParams, useHistory } from "react-router-dom";

export default function AcceptInv() {


  const [groupName, setGroupName] = useState("");


  useEffect(() => {
    API.getOneGroup(id).then(res => setGroupName(res.data.name))
  }, [])


  const history = useHistory();
  const { id } = useParams();



  const acceptInv = () => {
    const token = localStorage.getItem('token');

    API.addUserToGroup(id, token)
      .then(res => history.push('/dashboard/mygroups'))
      .catch(err => console.log(err))
  }

  return (
    <div className="invite-page">
      <h2 className="group-name">{groupName ? `Join "${groupName}"!` : "Join My Group!"}</h2>
      <h4 className="inv-header"> Once you click "Join Group", you will be a part of this group, which means you can choose which goals you would like to automatically share when you update them.
      </h4>
      <h4 className="inv-header">You will also have the ability to comment on the other group member's goals, and get to see whenever they make progress. Have fun!</h4>
      <button className="accept-inv-btn" onClick={acceptInv}>Join Group!</button>
      <a href="/dashboard">Ignore Invitation</a>
    </div>
  )
}
