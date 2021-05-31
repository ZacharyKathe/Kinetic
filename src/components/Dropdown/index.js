import React, { useState } from 'react'
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import EditGoal from '../EditGoal/index';
import "./style.css"




export default function Dropdown(props) {

  const history = useHistory();
  const [show, setShow] = useState(false);
  
  const editGoal = () => {
  }
  

  const completeGoal = () => {
    alert("this will complete the goal by changing its boolean")
  }

  const removeThisGoal = () => {
    if (window.confirm("Are you sure you want to delete this goal? It cannot be undone.")) {
      API.deleteGoal(props.goalID, props.token).then(res => history.go(0))
    } else return;
  }



  return (
    <>
      {
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={
            <Popover id='popover-positioned-left'>
              {/* <span onClick={() => editGoal()} className="remove">
                Edit
              </span> */}
              <EditGoal 
                goal_id={props.goalID}
                token={props.token}
                goal_name={props.goal_name}
                goal_category={props.goal_category}
                goal_description={props.goal_description}
                goal_frequency={props.goal_frequency}
                goal_target={props.goal_target}
                goal_progress={props.goal_progress}
                value_type={props.value_type}
                goal_start={props.goal_start}
                goal_finish={props.goal_finish}
              />
              <span onClick={() => completeGoal()} className="remove">
                Complete
              </span>
              <span onClick={() => removeThisGoal()} className="remove">
                Delete
              </span>
            </Popover>
          }
        >
          <Button variant="secondary" className="more-popup">
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </OverlayTrigger>
      }
    </>
  )
}
