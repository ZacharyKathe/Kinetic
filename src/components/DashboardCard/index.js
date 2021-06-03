import React, { useState } from "react";
import API from "../../utils/API";
import { ProgressBar, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from "../Dropdown";
import SliderModal from "../SliderModal/index";
import Moment from "moment";
import "./style.css"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';

function DashboardCard(props) {

  const [open, setOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const checkComplete = () => {
    const token = localStorage.getItem('token');
    if (props.goal_progress === 0) {
      return (
        <Chip
          label="Let's Get Started!"
        />
      )
    }
    if (props.goal_target === props.goal_progress) {
      return (
        <Chip
          label="Goal Complete!"
          style={{
            backgroundColor: "#b8ffa9",
            color: "black"
          }}
        />
      )
    } else return (
      <Chip
        label="Keep up the good work!"
        style={{
          backgroundColor: "#fff3cd",
          color: "black"
        }}
      />
    )
  }

  // Just sets the progress to target goal
  const setComplete = () => {
    const token = localStorage.getItem('token');
    API.editGoal(props.id, { goal_progress: props.goal_target }, token).then(res => {
      API.getIncompleteGoals(token).then(res => {
        props.setUserGoals(res.data.Goals)
      }).catch(err => {
        console.log(err);
      })
    })

  }

  // This will actually complete the goal, and send it to the completed page, saving its completion date
  const markComplete = () => {
    const token = localStorage.getItem('token');
    const completedGoal = {
      goal_progress: props.goal_target,
      isComplete: true,
      completedDate: Moment().format("YYYY-MM-DD")
    }
    console.log(completedGoal);
    API.editGoal(props.id, completedGoal, token).then(res => {
      API.getIncompleteGoals(token).then(res => {
        props.setUserGoals(res.data.Goals)
      }).catch(err => {
        console.log(err);
      })
    })
  }



  const renderActivityIcon = () => {
    switch (props.goal_category) {
      case "Diet":
        return (<RestaurantRoundedIcon />);
      case "Intellectual":
        return (<SchoolRoundedIcon />);
      case "Exercise":
        return (<DirectionsRunRoundedIcon />);
      case "Financial":
        return (<MonetizationOnRoundedIcon />);
      case "Habit":
        return (<BallotRoundedIcon />);
      case "Health":
        return (<FavoriteRoundedIcon />);
      case "Relationship":
        return (<SupervisedUserCircleRoundedIcon />);
      case "Work":
        return (<WorkRoundedIcon />);
      case "Productivity":
        return (<TrendingUpRoundedIcon />);
      case "Skill":
        return (<BuildRoundedIcon />);
      default: return (<AccessibilityNewRoundedIcon />);
    }
  }

  const percent = ((props.goal_progress / props.goal_target) * 100)
  const pctComplete = percent.toFixed(2)

  return (
    // <Draggable
    // axis="x"
    // handle=".handle"
    // defaultPosition={{x: 0, y: 0}}
    // position={null}
    // grid={[25, 25]}
    // scale={1}
    // onStart={this.handleStart}
    // onDrag={this.handleDrag}
    // onStop={this.handleStop}>
    <div className={!props.is_complete ? 'containerZK' : 'containerZK containerComplete'}>
      <div className={!props.is_complete ? 'card bt-card' : 'card bt-card containerComplete'}>
        <div className="content">
          <h3 className='goalheading'>{props.goal_name}</h3>
          {/* This opens up a dropdown for editing, completing, and deleting goal */}
          <Dropdown
            style={{
              color: "#a0c4ff"
            }}
            goal_id={props.id}
            token={props.token}
            goal_name={props.goal_name}
            goal_description={props.goal_description}
            goal_target={props.goal_target}
            goal_progress={props.goal_progress}
            goal_category={props.goal_category}
            goal_frequency={props.goal_frequency}
            goal_start={props.goal_start}
            goal_finish={props.goal_finish}
            value_type={props.value_type}
            is_complete={props.is_complete}
            completed_date={props.completed_date}
            last_refresh={props.last_refresh}
            setUserGoals={props.setUserGoals}
            markComplete={markComplete}
            setComplete={setComplete}
          />
        </div>

        <div className="middle-content">
          <div className='contentRight'>
            <p className='goalInfo'>
              {renderActivityIcon()} {props.goal_category}
            </p>
            <p className='endDate'> <UpdateRoundedIcon /> {props.goal_target} {props.value_type !== "Other" ? (props.goal_target === 1 ? props.value_type.toLowerCase().substring(0, props.value_type.length - 1) : props.value_type.toLowerCase()) : (props.goal_type === 1 ? "time" : "times")} {props.goal_frequency.toLowerCase()} until {Moment(props.goal_finish).format("MMMM Do")}</p>
          </div>
          <div className='contentLeft'>
            {!props.is_complete ? checkComplete() : ""}
          </div>
        </div>
        <div className="bigCont">
          <div className="sliderCont">
            {!props.is_complete ? <SliderModal
              goal_target={props.goal_target}
              goal_progress={props.goal_progress}
              goal_id={props.id}
              token={props.token}
              setUserGoals={props.setUserGoals}
              handleClick={handleClick}
            /> : ""}
          </div>
          <div className="progCont">
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message="Progress Saved"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            {props.is_complete ?
              <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type} completed on ${Moment(props.completed_date).format("MMMM Do, YYYY")}!`} />
              : <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type} completed!`} />}
          </div>
        </div>
      </div>
    </div>
    // </Draggable>
  );
}

export default DashboardCard;
