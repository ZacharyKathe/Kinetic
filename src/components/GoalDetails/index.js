import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
import SaveGoalBtn from '../SaveGoalBtn';
import App from '../../App';

const moment = require("moment");

export default function GoalDetails(props) {
    const [show, setShow] = useState(false);
    const [editGoal, setEditGoal] = useState({
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

    const handleEditSubmit = (e) => {
      e.preventDefault();
      // console.log(props.token);
      if (props.token) {
      API.editGoal(props.goal_id, editGoal, props.token)
        .then(res => {
          // history.push('/dashboard')
          history.goBack();
          window.location.reload();
        })
        .catch(err => {
          // console.log(props.token);
          console.log(err);
        })
      }
    };

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
            <Row className="create-goal-row">
              <Col size="12">
                <h1 className="goal-details-name">
                    {editGoal.goal_name}
                </h1>
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