import React from 'react'
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import "./style.css"




export default function Dropdown(props) {

  const history = useHistory();

  
  const editGoal = () => {
    alert("this will link to an edit page")
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
              <span onClick={() => editGoal()} className="remove">
                Edit
              </span>
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
