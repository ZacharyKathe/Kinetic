import React from "react";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import {confirmable } from 'react-confirm';
import {ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


function DashboardCard(props) {
    
  const history = useHistory();

  const removeThisGoal = () => {
    if (window.confirm("Are you sure you want to delete this goal? It cannot be undone.")) {
      API.deleteGoal(props.id, props.token).then(res => history.go(0))
    } else return;
  }

  const percent = 70

  return (
    <div className='progressBar'>
    <div className="card">
      <div className="content">
      <h3 className='goalheading'>{props.goal_category}</h3>
          <p className='goalInfo'>
            <strong>Type</strong>: {props.goal_name}
          </p>
      </div>
      
      <div className='contentRight'>
        <p className='endDate'> <strong>Frequency</strong>: {props.goal_frequency}</p>
      </div>
      <span onClick={() => removeThisGoal()} className="remove">
        ...
      </span>
      
    </div>
    <ProgressBar now={percent} label={`${percent}% compleated`} />
    </div>
    
  );
}

export default DashboardCard;
