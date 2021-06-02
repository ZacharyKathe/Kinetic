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
// import update from '../../images/compass-update.png';

export default function GoalDetails(props) {
  const [goalDetails] = useState({
    goal_name: props.goal_name,
    goal_description: props.goal_description,
    goal_category: props.goal_category,
    goal_frequency: props.goal_frequency,
    goal_target: props.goal_target,
    goal_progress: props.goal_progress,
    value_type: props.value_type,
    is_complete: props.is_complete,
    completed_date: props.completed_date,
    goal_start: props.goal_start,
    goal_finish: props.goal_finish

  });

  const checkComplete = () => {
    if (props.goal_target === props.goal_progress) {
      return (
        <Alert key="success" variant="success" className="goal-alert">
          Way to go!
        </Alert>
      )
    } else return (
      <Alert key="warning" variant="warning" className="goal-alert">
        Keep up the good work!
      </Alert>
    )
  }

  const percent = ((props.goal_progress / props.goal_target) * 100)
  const pctComplete = percent.toFixed(2)

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => { props.setShow(false) }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Row className="goal-title-row">
              <Col size="12">
                <h1 className="goal-details-name">
                  {goalDetails.goal_name}
                </h1>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="no-padding">
          <Row className="goal-details-row">
            <Col size="12">
              <p className="goal-details-description">
                {goalDetails.goal_description}
              </p>
            </Col>
          </Row>
          <Row className="goal-details-row">
            <Col size="12">
              <p className="goal-details-description">
                {goalDetails.goal_category}
              </p>
            </Col>
          </Row>
          <Row className="goal-details-row">
            <Col size="12">
              <p className="goal-details-start">
                Active  {goalDetails.goal_frequency.toLowerCase()} from {Moment(goalDetails.goal_start).format("MMMM D")} to {Moment(goalDetails.goal_finish).format("MMMM D, YYYY")}.
              </p>
            </Col>
          </Row>
          {props.is_complete ?
            <Row className="goal-details-row">
              <Col size="12">
                <p className="goal-details-progress">
                  {goalDetails.goal_progress} out of {goalDetails.goal_target} {goalDetails.value_type} completed on {Moment(props.completed_date).format("MMMM DD, YYYY")}.
                </p>
              </Col>
            </Row>
            :
            <Row className="goal-details-row">
              <Col size="12">
                <p className="goal-details-progress">
                  {goalDetails.goal_progress} out of {goalDetails.goal_target} {goalDetails.value_type} completed.
                </p>
              </Col>
            </Row>
          }
          <Row className="goal-details-row">
            <Col size="12">
              {!props.is_complete ? checkComplete() : ""}
              <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type} completed!`} />
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
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

//id="example-custom-modal-styling-title"