import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
import { Modal, ProgressBar, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
import Moment from "moment";
import './style.css';
import cheer from '../../images/trophy.png';
import comment from '../../images/comment.png';
import Chip from '@material-ui/core/Chip';

export default function GoalUpdateCard({ goal: goal, user: user }) {

  // console.log(goal);
  const percent = ((goal.goal_progress / goal.goal_target) * 100)
  const pctComplete = percent.toFixed(2)


  return (
    <div className="goal-update-card">
      <h3 className="text-center">{user}</h3>
      <Row className="goal-details-row">
        <Col size="12">
          <p className="goal-details-description">
            {goal.goal_description}
          </p>
        </Col>
      </Row>
      <Row className="goal-details-row">
        <Col size="12">
          <p className="goal-details-description">
            {goal.goal_category}
          </p>
        </Col>
      </Row>
      <Row className="goal-details-row">
        <Col size="12">
          <p className="goal-details-start">
            Active  {goal.goal_frequency.toLowerCase()} from {Moment(goal.goal_start).format("MMMM D")} to {Moment(goal.goal_finish).format("MMMM D, YYYY")}.
              </p>
        </Col>
      </Row>
      {goal.is_complete ?
        <Row className="goal-details-row">
          <Col size="12">
            <p className="goal-details-progress">
              {goal.goal_progress} out of {goal.goal_target} {goal.value_type} completed on {Moment(goal.completed_date).format("MMMM DD, YYYY")}.
                </p>
          </Col>
        </Row>
        :
        <Row className="goal-details-row">
          <Col size="12">
            <p className="goal-details-progress">
              {goal.goal_progress} out of {goal.goal_target} {goal.value_type} completed.
                </p>
          </Col>
        </Row>
      }
      <Row className="goal-details-row">
        <Col size="12">
          <ProgressBar now={pctComplete} label={goal.value_type === "Event" || goal.value_type === "Other" || !goal.value_type ? `${goal.goal_progress} out of ${goal.goal_target} completed!` : `${goal.goal_progress} out of ${goal.goal_target} ${goal.value_type} completed!`} />
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
          <div className="border-top padding">
          </div>
        </Col>
      </Row>
    </div>
  )
}
