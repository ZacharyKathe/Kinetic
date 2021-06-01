import React, { useState, useRef } from 'react'
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Overlay, Popover, Button } from 'react-bootstrap';
import EditGoal from '../EditGoal/index';
import GoalDetails from '../GoalDetails/index';
import "./style.css"
import { TextureGarbageCollector } from 'pixi.js';




export default function Dropdown(props) {
  // target = useRef(null)
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };


  const removeThisGoal = () => {
    console.log(props.token)
    if (window.confirm("Are you sure you want to delete this goal? It cannot be undone.")) {
      API.deleteGoal(props.goalID, props.token)
      .then(result =>     
        API.getDashboard(props.token).then(res => {
        props.setUserState({
          token: props.token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username,
            goals: res.data.Goals,
            groups: res.data.Groups,
          }
          
        })
        history.push('/dashboard')
      }).catch(err => {
        console.log(err);
        // console.log("no logged in user")
        // localStorage.removeItem("token");
        // props.setUserState({
        //   token: "",
        //   user: {}
        // })
      }))
    } else return;
  }



  return (
    <>
      {/* Hidden on page load */}
      <GoalDetails
        show={detailsShow}
        setShow={setDetailsShow}
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

      <EditGoal
        show={editShow}
        setShow={setEditShow}
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


      <div ref={ref}>
        <Button onClick={handleClick}><i className="fas fa-ellipsis-v"></i></Button>

        <Overlay
          show={show}
          target={target}
          placement="left"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3" className="text-center">Menu</Popover.Title>
            <Popover.Content>

              <span onClick={() => {
                setDetailsShow(true);
                setShow(false)
              }} className="remove">
                Details
              </span>

              <span onClick={() => {
                setEditShow(true)
                setShow(false)
              }} className="remove">
                Edit
              </span>

              <span onClick={() => props.markComplete()} className="remove">
                Complete
              </span>

              <span onClick={() => removeThisGoal()} className="remove">
                Delete
              </span>
              
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>
    </>
  )
}
