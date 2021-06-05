import React from 'react';
// import { useHistory } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import API from '../../utils/API';
import Col from '../Col/index';
import Row from '../Row/index';

export default function AddGoalToGroup(props) {

  // const history = useHistory();

  const handleGoalAdd = (goalID) => {
    const token = localStorage.getItem('token');
    const goalObj = {
      goal_id: goalID
    }
    console.log(goalObj);
    API.addGoalToGroup(props.group_id, goalObj, token)
      .then(res => {
        
        props.updateGoals();
        props.setModalShow(false);
      })
      .catch(err => {
        console.log(err);
      })

  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setModalShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="goals-to-choose"
      >
        <Modal.Header closeButton>
          <Modal.Title id="goals-to-choose">
            <h1>Share which goal?</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.goals ? props.goals.map((goal => {
            return (
              <Row className="create-goal-row" key={goal.id}>
                <Col size="12">
                  <button onClick={() => handleGoalAdd(goal.id)}>{goal.goal_name}</button>
                </Col>
              </Row>
            )
          })) :
            console.log('no goals')
          }
        </Modal.Body>

      </Modal>
    </>
  );
}