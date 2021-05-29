import React from "react";


function DashboardCard(props) {
  return (
    <div className="card">
      
      <div className="content">
        <ul>
          <li>
            <strong>Goal Category:</strong> {props.goal_category}
          </li>
          <li>
            <strong>Description:</strong> {props.goal_description}
          </li>
          <li>
            <strong>Frequency:</strong> {props.goal_frequency}
          </li>
        </ul>
      </div>
      <span onClick={() => props.removeFriend(props.id)} className="remove">
        𝘅
      </span>
    </div>
  );
}

export default DashboardCard;
