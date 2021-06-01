import React from "react";
import API from "../../utils/API";
import { ProgressBar, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from "../Dropdown";
import SliderModal from "../SliderModal/index";
import Moment from "moment";
import "./style.css"
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


function DashboardCard(props) {


  const checkComplete = () => {
    const token = localStorage.getItem('token');
    if (props.goal_target === props.goal_progress) {
      return (
        <Alert key="success" variant="success" className="goal-alert">
          Way to go! 
          <button className="complete-link" onClick={() => {
            const updatedGoal = {
              isComplete: true,
              completedDate: Moment().format("YYYY-MM-DD")
            }
            API.editGoal(props.id, updatedGoal, token).then(res => {
              API.getIncompleteGoals(token).then(res => {
                if(res.data) {
                props.setUserGoals(res.data.Goals)
                } else {
                  props.setUserGoals()
                }
              }).catch(err => {
                console.log(err);
              })
            })
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
    const token = localStorage.getItem('token');
    API.editGoal(props.id, { goal_progress: props.goal_target }, token).then(res => {
      API.getIncompleteGoals(token).then(res => {
        props.setUserGoals(res.data.Goals)
      }).catch(err => {
        console.log(err);
      })
    })
  }

  const renderActivityIcon = () => {
    switch  (props.goal_category) {
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
    <div className='containerZK'>
      <div className="card bt-card">
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
            value_type={props.value_type}
            setUserGoals={props.setUserGoals}
            markComplete={markComplete}
          />
        </div>

        <div className='contentRight'>
          <p className='goalInfo'>
            {renderActivityIcon()} {props.goal_category}
          </p>
          <p className='endDate'> <UpdateRoundedIcon></UpdateRoundedIcon> {props.goal_frequency}</p>
        </div>
      </div>
      <div className="bigCont">
        <div className="sliderCont">
          <SliderModal
            goal_target={props.goal_target}
            goal_progress={props.goal_progress}
            goalID={props.id}
            token={props.token}
            setUserGoals={props.setUserGoals}
          />
        </div>
        <div className="progCont">
          {checkComplete()}
          <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type} completed!`} />
        </div>
      </div>
    </div>

  );
}

export default DashboardCard;
