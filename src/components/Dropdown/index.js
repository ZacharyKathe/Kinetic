import React, { useState, useRef } from 'react'
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { Overlay, Popover, Button } from 'react-bootstrap';
import EditGoal from '../EditGoal/index';
import GoalDetails from '../GoalDetails/index';
import "./style.css"
// import { TextureGarbageCollector } from 'pixi.js';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';



export default function Dropdown(props) {

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

  const handleClickAway = () => {
    setShow(false);
  };

  const removeThisGoal = () => {
    const token = localStorage.getItem('token');
    if (window.confirm("Are you sure you want to delete this goal? It cannot be undone.")) {
      API.deleteGoal(props.goal_id, props.token)
        .then(result => {
          API.getIncompleteGoals(token).then(res => {
            props.setUserGoals(res.data.Goals)
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
          console.log("no logged in user")
          localStorage.removeItem("token");
          props.setUserState({
            token: "",
            user: {}
          })
        })
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
        is_complete={props.is_complete}
        completed_date={props.completed_date}
        goal_start={props.goal_start}
        goal_finish={props.goal_finish}
      />

      <EditGoal
        show={editShow}
        setShow={setEditShow}
        setUserGoals={props.setUserGoals}
        goal_id={props.goal_id}
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


      <ClickAwayListener onClickAway={handleClickAway}>
      <div ref={ref}>
        <Button onClick={handleClick} className={!props.is_complete ? "custom-class" : "custom-complete"}><i className="fas fa-ellipsis-v"></i></Button>
          {show ? (
          <Overlay
            show={show}
            target={target}
            placement="left"
            container={ref.current}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <Popover.Title as="h3" className="text-center">Select</Popover.Title>
              <Popover.Content>

                <span onClick={() => {
                  setDetailsShow(true);
                  setShow(false)
                }} className="remove">
                  Details
                </span>

                {/* Checks if completed */}
                {!props.is_complete ?
                  <>
                    <span onClick={() => {
                      setEditShow(true)
                      setShow(false)
                    }} className="remove">
                      Edit
                </span>

                    <span onClick={() => {
                      setShow(false);
                      props.markComplete()
                    }} className="remove">
                      Complete
                </span>
                  </> : ""}
                
                {props.is_complete ?
                <span onClick={() => {
                  const token = localStorage.getItem('token');
                  const updatedGoal = {
                    isComplete: false,
                  }
                  API.editGoal(props.goal_id, updatedGoal, token).then(res => {
                    API.getCompleteGoals(token).then(res => {
                      if (res.data) {
                        props.setUserGoals(res.data.Goals)
                      } else {
                        props.setUserGoals()
                      }
                    }).catch(err => {
                      console.log(err);
                    })
                    history.push('/dashboard')
                  })
                }}>Mark Incomplete</span>
                : ""}

                <span onClick={() => {
                  setShow(false);
                  removeThisGoal()
                }} className="remove">
                  Delete
                </span>

              </Popover.Content>
            </Popover>
          </Overlay>
        ) : null }
      </div>
      </ClickAwayListener>
    </>
  )
}
