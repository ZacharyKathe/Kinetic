import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
import Moment from "moment";
import './style.css';
import trophyAct from '../../images/trophy-active.png';
import trophyInact from '../../images/trophy-inactive.png';
import commentIcon from '../../images/comment.png';
import CommentModal from "../CommentModal"
import renderActivityIcon from "../renderCategoryIcon"
import { TextField, Button } from '@material-ui/core';

export default function GoalUpdateCard({ goal, user, group_id, current_user, updateGoals, cheers }) {

  const [comment, setComment] = useState("");
  const [isCheered, setIsCheered] = useState(false)
  const [cheerAmnt, setCheerAmnt] = useState()
  const [goalComments, setGoalComments] = useState([]);
  const [modalShow, setModalShow] = useState(false);


  const token = localStorage.getItem('token')
  const percent = ((goal.goal_progress / goal.goal_target) * 100)
  const pctComplete = percent.toFixed(2)

  useEffect(() => {
    API.getOneGoal(goal.id)
      .then(res => {
        setGoalComments(res.data.Comments)
        setCheerAmnt(res.data.cheers)
      })
      .catch(err => console.log(err))
  }, [goal.id])


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


  const removeFromGroup = (id) => {
    const goalObj = {
      goal_id: id
    }
    API.removeGoalFromGroup(group_id, goalObj, token)
      .then(res => {
        updateGoals();

      })
      .catch(err => console.log(err))

  }

  const giveCheers = () => {
    
    let cheerObj = {
      addCheers: (isCheered ? false : true)
    }

    API.editCheer(goal.id, cheerObj, token)
      .then(res => {
        API.getOneGoal(goal.id)
        .then(res => setCheerAmnt(res.data.cheers))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    setIsCheered(!isCheered)
  }

  const submitComment = () => {
    const commentObj = {
      comment_content: comment,
      goal: goal.id
    }
    API.createComment(commentObj, token)
      .then(res => {
        API.getOneGoal(goal.id)
          .then(res => {
            setGoalComments(res.data.Comments)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <CommentModal
        comments={goalComments}
        show={modalShow}
        setModalShow={setModalShow}
        username={current_user}
        goalID={goal.id}
        setGoalComments={setGoalComments}

      />
      <div className="goal-update-card containerZK">
        <div className="update-header">
          <h3 className="text-center">{goal.goal_name}</h3>
        </div>

        <Row className="goal-details-row">
          <Col size="12" className="goal-name-hide">
            <p className="goal-details-description user-name text-primary">
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
              {renderActivityIcon(goal.goal_category)} {goal.goal_category}
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
            <div className="bt-div one">
              <img className="trophy" alt="trophy-icon" src={isCheered ? trophyAct : trophyInact} onClick={() => giveCheers()}/><p id="cheer-total">{cheerAmnt} {cheerAmnt === 1 ? 'cheer' : 'cheers'}</p>
            </div>
          </Col>

          <Col size="6" className="goal-details-row">
            <div className="bt-div two" onClick={() => setModalShow(true)}>
              <img src={commentIcon} alt="comment icon" /><p id="comment-total">{goalComments.length === 1 ? `${goalComments.length} comment` :  `${goalComments.length} comments`}</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="12">
            <div className="border-top padding">
              <div className="form-box">
                <form onSubmit={() => submitComment()}>
                  <TextField
                    // id=""
                    label="Comment"
                    placeholder="Cheer them on!"
                    multiline
                    rows={2}
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    fullWidth
                    variant="outlined"
                  />
                  <Button type="submit">Submit Comment</Button>
                </form>
              </div>
            </div>
            <div className="border-top">
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
