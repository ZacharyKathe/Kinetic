import React from "react";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import {ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


function DashboardCard(props) {
    
  const history = useHistory();

  const removeThisGoal = () => {
    if (window.confirm("Are you sure you want to delete this goal? It cannot be undone.")) {
      API.deleteGoal(props.id, props.token).then(res => history.go(0))
    } else return;
  }

  const percent = ((props.goal_progress / props.goal_target) * 100)
  const pctComplete = percent.toFixed(2) 
  console.log("goal target:", props.goal_target);
  console.log("current progress:", props.goal_progress);
  console.log(pctComplete);

  return (
    <div className='containerZK'>
      <div className="card">
        <div className="content">
          <h3 className='goalheading'>{props.goal_category}</h3>
          <span onClick={() => removeThisGoal()} className="remove">
         ▪▪▪
        </span>
        </div>
      
        <div className='contentRight'>
        <p className='goalInfo'>
            <strong>Type</strong>: {props.goal_name}
          </p>
          <p className='endDate'> <strong>Frequency</strong>: {props.goal_frequency}</p> 
       </div>
        
      </div>
      <ProgressBar now={percent} label={`${percent}% compleated`} />
    </div>
    
  );
}

export default DashboardCard;
