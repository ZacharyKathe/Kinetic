import React from "react";


function DashboardCard(props) {
  return (
    <div className="card">
      <div className="content">
      <h3 className='goalheading'>{props.goal_category}</h3>
          <p className='goalInfo'>
            Type: {props.goal_name}
          </p>
          <p className='goalInfo'>
            Description: {props.goal_description}
          </p>
      </div>
      <div className='contentRight'>
              <p className='endDate'> Frequency: {props.goal_frequency}</p>
              <p className='endDate'><strong>End date:</strong> {props.goal_finish}</p>
              </div>
      <span onClick={() => props.removeFriend(props.id)} className="remove">
        𝘅
      </span>
    </div>
  );
}

export default DashboardCard;
