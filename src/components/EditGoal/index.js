import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';
// import SaveGoalBtn from '../SaveGoalBtn';
// import App from '../../App';

// const moment = require("moment");

export default function EditGoal(props) {
    // const [show, setShow] = useState(false);
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

            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Description</p>
                <input
                  className="create-goal-input"
                  type="text"
                  placeholder=" Describe your goal..."
                  name="goal_description"
                  value={editGoal.goal_description}
                  onChange={(e) => setEditGoal({...editGoal, goal_description: e.target.value})}
                />
              </Col>
            </Row>
            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Goal Category</p>
                <select
                  className="create-goal-input"
                  type="text"
                  placeholder=" Choose a goal category..."
                  name="goal_category"
                  value={editGoal.goal_category}
                  onChange={(e) => setEditGoal({...editGoal, goal_category: e.target.value})}
                >
                  <option value="" disabled defaultValue hidden> </option>
                  <option value="Diet">Diet</option>
                  <option value="Education">Education</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Financial">Financial</option>
                  <option value="Habit">Habit</option>
                  <option value="Health">Health</option>
                  <option value="Relationship">Relationship</option>
                  <option value="Work">Work</option>
                </select>  
              </Col>
            </Row>
            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Goal frequency</p>
                <select
                  className="create-goal-input"
                  type="text"
                  placeholder=" Choose a goal frequency..."
                  name="goal_frequency"
                  value={editGoal.goal_frequency}
                  onChange={(e) => setEditGoal({...editGoal, goal_frequency: e.target.value})}
                >
                  <option value="" disabled defaultValue hidden> </option>
                  <option value="One Time">One Time</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </Col>
            </Row>
            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Goal Target</p>
                <input
                  className="create-goal-input"
                  type="number"
                  placeholder=" Choose a target number for your goal..."
                  name="goal_target"
                  value={editGoal.goal_target}
                  onChange={(e) => setEditGoal({...editGoal, goal_target: e.target.value})}
                />
              </Col>
            </Row>
            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Goal Progress</p>
                <input
                  className="create-goal-input"
                  type="number"
                  placeholder=" How much have you achieved towards your goal?"
                  name="goal_target"
                  value={editGoal.goal_progress}
                  onChange={(e) => setEditGoal({...editGoal, goal_progress: e.target.value})}
                />
              </Col>
            </Row>
            <Row className="create-goal-row">
              <Col size="12">
                <p className="create-goal-label">Target value type</p>
                <select
                  className="create-goal-input"
                  type="text"
                  placeholder=" What type of value is your target..."
                  name="value_type"
                  value={editGoal.value_type}
                  onChange={(e) => setEditGoal({...editGoal, value_type: e.target.value})}
                >
                  <option value="Other" defaultValue hidden>Other</option>
                  <option value="Event">Event</option>
                  <option value="Hours">Hours</option>
                  <option value="Kilograms">Kilograms</option>
                  <option value="Liters">Liters</option>
                  <option value="Miles">Miles</option>
                  <option value="Minutes">Minutes</option>
                  <option value="Kilometers">Kilometers</option>
                  <option value="Pounds">Pounds</option>
                  {/* <option value="Other">Other</option> */}
                </select>
              </Col>
            </Row>
            <div className="goal-dates">
              <div className="actual-dates">
                <p className="create-goal-label">
                  Start date
                </p>
                <input
                  className="create-goal-input"
                  type="date"
                  name="goal_start"
                  value={editGoal.goal_start}
                  onChange={(e) => setEditGoal({...editGoal, goal_start: e.target.value})}
                />
              </div>
              <div className="actual-dates">
              <p className="create-goal-label">
                  End date
                </p>
                <input
                  className="create-goal-input"
                  type="date"
                  placeholder=" mm/dd/yyyy"
                  name="goal_finish"
                  value={editGoal.goal_finish}
                  onChange={(e) => setEditGoal({...editGoal, goal_finish: e.target.value})}
                />
              </div>
            </div>
            <Button 
              className="saveEditBtn"
              variant="outline-primary"
              size="lg" 
              block
              type="submit"
            >
              Save
            </Button>
          </Modal.Body>
          </form>
        </Modal>
      </>
    );
}