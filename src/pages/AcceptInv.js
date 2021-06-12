import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import { useParams, useHistory } from "react-router-dom";

export default function AcceptInv() {

  const [groupName, setGroupName] = useState("");
  
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Checks if user is logged in, and sends them to login if not
    if (!token) {
      history.push('/')
    }
    API.getOneGroup(id).then(res => setGroupName(res.data.name))
  }, [id, history])


  const acceptInv = () => {
    const token = localStorage.getItem('token');

    const emptyObj = {
      obj: ""
    }

    API.addUserToGroup(id, emptyObj, token)
      .then(res => history.push('/dashboard/mygroups'))
      .catch(err => console.log(err))
  }


  return (
    <div className="invite-page">
      <h2 className="group-name">{groupName ? `Join "${groupName}"!` : "Join My Group!"}</h2>
      <div className="inv-header"> Once you click "Join Group", you will be a part of this group, which means you can choose which goals you would like to automatically share when you update them.
      </div>
      <div className="inv-header">You will also have the ability to comment on the other group member's goals, and get to see whenever they make progress. Have fun!</div>
      <button className="accept-inv-btn" onClick={acceptInv}>Join Group!</button>
      <a href="/dashboard">Ignore Invitation</a>
    </div>
  )
}
