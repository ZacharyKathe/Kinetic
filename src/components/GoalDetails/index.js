import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
import SaveGoalBtn from '../SaveGoalBtn';
import App from '../../App';
import './style.css';

const moment = require("moment");

export default function GoalDetails(props) {
    const [show, setShow] = useState(false);
    const [goalDetails] = useState({
      goal_name: props.goal_name,
      goal_description: props.goal_description,
      goal_category: props.goal_category,
      goal_frequency: props.goal_frequency,
      goal_target: props.goal_target,
      goal_progress: props.goal_progress,
      value_type: props.value_type,
      goal_start: props.goal_start,
      goal_finish: props.goal_finish
      
    });

    const history = useHistory();

    return (
        <>
        <span onClick={() => setShow(true)} className="remove">
          Details
        </span>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            <Row className="goal-title-row">
              <Col size="12">
                <h1 className="goal-details-name">
                    {goalDetails.goal_name}
                </h1>
              </Col>
            </Row>
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
                    {goalDetails.goal_start} through {goalDetails.goal_finish}
                </p>
              </Col>
            </Row>
            <Row className="goal-details-row">
              <Col size="12">
                <p className="goal-details-progress">
                    {goalDetails.goal_progress} of {goalDetails.goal_target} {goalDetails.value_type} completed.
                </p>
              </Col>
            </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
        </Modal>
      </>
    );
}