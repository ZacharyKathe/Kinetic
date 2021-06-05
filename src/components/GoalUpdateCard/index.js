import React from 'react';
// import { useHistory } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
import Moment from "moment";
import './style.css';
import cheer from '../../images/trophy.png';
import comment from '../../images/comment.png';
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
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

export default function GoalUpdateCard({ goal, user, group_id, current_user, updateGoals }) {

  // console.log(goal);
  const percent = ((goal.goal_progress / goal.goal_target) * 100)
  const pctComplete = percent.toFixed(2)
  // console.log(current_user);
  // console.log(group_id);
  // console.log(goal.id);


  const renderFrequency = () => {
    switch (goal.goal_frequency) {
      case "Daily":
        return "today";
      case "Weekly":
        return "this week";
      case "Monthly":
        return "this month";
      default: return "so far"
    }
  }

  const renderActivityIcon = () => {
    switch (goal.goal_category) {
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

  const removeFromGroup = (id) => {
    const token = localStorage.getItem('token');
    const goalObj = {
      goal_id: id
    }
    API.removeGoalFromGroup(group_id, goalObj, token)
      .then(res => {
        console.log(res.data)
        updateGoals();

      })
      .catch(err => console.log(err))

  }

  return (

    <div className="goal-update-card containerZK">
      <div className="update-header">
        <h3 className="text-center">{goal.goal_name}</h3>
      </div>

      <Row className="goal-details-row">
        <Col size="12" className="goal-name-hide">
          <p className="goal-details-description text-primary">
            {user}
          </p>
        {goal.isComplete ?
          <div className="text-success is-complete">COMPLETED {renderFrequency().toUpperCase()}!</div>
          : ""}
        {user === current_user ?
          <div className="hide-button" onClick={() => removeFromGroup(goal.id)}>(hide)</div>
          : ""}
        </Col>
      </Row>

      <Row className="goal-details-row">
        <Col size="12">
          <p className="update-descr">
            {goal.goal_description}
          </p>
        </Col>

      </Row>
      <Row className="goal-details-row">
        <Col size="12">
          <p className="goal-details-description">
            {renderActivityIcon()} {goal.goal_category}
          </p>
        </Col>
      </Row>

      <Row className="goal-details-row">
        <Col size="12">
          <p className="update-freq">
            (Active  {goal.goal_frequency.toLowerCase()} from {Moment(goal.goal_start).format("MMMM D")} to {Moment(goal.goal_finish).format("MMMM D, YYYY")}.)
              </p>
          {goal.lastUpdate ?
            <p className="last-updated">{goal.isComplete ? "Completed" : "Last updated"} <span className="text-warning">{Moment(goal.lastUpdate).format("MMMM Do h:mm a")}</span></p>
            : ""}
        </Col>
      </Row>

      <Row className="goal-details-row">
        <Col size="12">
          <ProgressBar now={pctComplete} />
        </Col>
      </Row>

      <Row className="goal-details-row">
        <Col size="12">
          <p className="text-center update-prog">
            {goal.is_complete ?
              goal.value_type === "Event" || goal.value_type === "Other" || !goal.value_type ? `${goal.goal_progress} out of ${goal.goal_target} completed!` : `${goal.goal_progress} out of ${goal.goal_target} ${goal.value_type.toLowerCase()} completed on ${Moment(goal.completed_date).format("MMMM Do, YYYY")}!`
              : goal.value_type === "Event" || goal.value_type === "Other" || !goal.value_type ? `${goal.goal_progress} out of ${goal.goal_target} completed!` : `${goal.goal_progress} out of ${goal.goal_target} ${goal.value_type.toLowerCase()} completed ${renderFrequency()}!`}
          </p>
        </Col>
      </Row>

      <Row>
        <Col size="6">
          <div className="bt-div">
            <img src={cheer} alt="cheer icon" /><p id="cheer-total">7 cheers</p>
          </div>
        </Col>

        <Col size="6">
          <div className="bt-div">
            <img src={comment} alt="comment icon" /><p id="comment-total">5 comments</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col size="12">
          <div className="border-top padding">
            <p>comments go here</p>
          </div>
          <div className="border-top">
          </div>
        </Col>
      </Row>
    </div>
  )
}
