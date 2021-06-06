import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


function MemberCard(props) {

  return (
      <div className="member-card">
        <h3 className='member-heading'>{props.name}</h3>
      </div>
  );
}

export default MemberCard;