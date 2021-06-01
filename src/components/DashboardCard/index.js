import React, { useEffect } from "react";
import API from "../../utils/API";
// import { useHistory } from "react-router-dom";
import { ProgressBar, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from "../Dropdown";
import Moment from "moment";
import "./style.css"

function DashboardCard(props) {

  // const history = useHistory();

  // useEffect(() =>)

  const checkComplete = () => {
    if (props.goal_target === props.goal_progress) {
      return (
        <Alert key="success" variant="success" className="goal-alert">
          Way to go! 
          <button className="complete-link" onClick={() => {
            const updatedGoal = {
              isComplete: true,
              completedAt: Moment().format("YYYY-MM-DD")
            }
            API.editGoal(props.id, updatedGoal, localStorage.getItem('token')).then(res => setTimeout(window.location.reload.bind(window.location), 300))
          }}>CLEAR GOAL</button>
        </Alert>
      )
    } else return (
      <Alert key="warning" variant="warning" className="goal-alert">
        Keep up the good work! 
      </Alert>
    )
  }

  const markComplete = () => {
    API.editGoal(props.id, { goal_progress: props.goal_target }, localStorage.getItem('token')).then(res => setTimeout(window.location.reload.bind(window.location), 300))
  }




  const percent = ((props.goal_progress / props.goal_target) * 100)
  const pctComplete = percent.toFixed(2)
  // console.log("goal target:", props.goal_target);
  // console.log("current progress:", props.goal_progress);
  // console.log(pctComplete);

  return (
    <div className='containerZK'>
      <div className="card">
        <div className="content">
          <h3 className='goalheading'>{props.goal_name}</h3>
          {/* This opens up a dropdown for editing, completing, and deleting goal */}
          <Dropdown
            goalID={props.id}
            token={props.token}
            goal_name={props.goal_name}
            goal_description={props.goal_description}
            goal_target={props.goal_target}
            goal_progress={props.goal_progress}
            goal_category={props.goal_category}
            goal_frequency={props.goal_frequency}
            goal_start={props.goal_start}
            goal_finish={props.goal_finish}
            markComplete={markComplete}
          />
        </div>

        <div className='contentRight'>
          <p className='goalInfo'>
            <strong>Type</strong>: {props.goal_category}
          </p>
          <p className='endDate'> <strong>Frequency</strong>: {props.goal_frequency}</p>
        </div>

      </div>
      {checkComplete()}
      <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type} completed!`} />
    </div>

  );
}

export default DashboardCard;
