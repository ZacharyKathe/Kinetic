import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";


function GroupCard(props) {

  // Current # of members in each group
  const memberNum = props.users.length;
  console.log(props.id);

  return (
    // Trying to find best way to route to that group page
    <Link to={`/group/${props.key}`} className="link-text">
      <div key={props.key} className="card groupcard">
        <h3 className='groupheading'>{props.name}</h3>
        <p className='endDate'><strong>Members:</strong> {memberNum}</p>
      </div>
    </Link>
  );
}

export default GroupCard;