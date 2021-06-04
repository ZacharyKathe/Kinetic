import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';

export default function AddGoalToGroup(props) {
    // const [show, setShow] = useState(false);
    // const [editGoal, setEditGoal] = useState({
    //   goal_name: props.goal_name,
    //   goal_description: props.goal_description,
    //   goal_category: props.goal_category,
    //   goal_frequency: props.goal_frequency,
    //   goal_target: props.goal_target,
    //   goal_progress: props.goal_progress,
    //   value_type: props.value_type,
    //   goal_start: props.goal_start,
    //   goal_finish: props.goal_finish
      
    // });

    const history = useHistory();

    const handleSubmit = (e) => {
      const token = localStorage.getItem('token');
      e.preventDefault();
      if (token) {
      API.editGoal(props.goal_id, editGoal, token)
        .then(res => {
          API.getIncompleteGoals(token).then(res => {
            if(res.data) {
            props.setUserGoals(res.data.Goals)
            } else {
              props.setUserGoals()
            }
          }).catch(err => {
            console.log(err);
          })
          history.push('/dashboard');
          props.setShow(false);
        })
        .catch(err => {
          console.log(err);
        })
      }
    };

    return (
      <>
        <Modal
          show={props.show}
          onHide={() => props.setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
            <form onSubmit={handleEditSubmit} className="create-goal-form">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            <Row className="create-goal-row">
              <Col size="12">
                <input
                  className="create-goal-input"
                  type="text"
                  placeholder=" Enter a name for your goal..."
                  name="goal_name"
                  value={editGoal.goal_name}
                  onChange={(e) => setEditGoal({...editGoal, goal_name: e.target.value})}
                />
              </Col>
            </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>sup</div>
          </Modal.Body>
          </form>
        </Modal>
      </>
    );
}