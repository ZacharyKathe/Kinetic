import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


function GroupCard(props) {

  // Current # of members in each group
  const memberNum = props.users.length;

  return (
    // Trying to find best way to route to that group page
    <Link to={`/group/${props.id}`} className="group-link-text">
      <div className="groupcard">
        <h3 className='groupheading'>{props.name}</h3>
        <p className='endDate'><strong>Members:</strong> {memberNum}</p>
      </div>
    </Link>
  );
}

export default GroupCard;