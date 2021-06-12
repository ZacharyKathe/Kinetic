import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import API from "../../utils/API";
import Col from '../Col/index';
import Row from '../Row/index';
import Moment from "moment";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import commentIcon from '../../images/comment.png';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import renderActivityIcon from '../renderCategoryIcon'
import './style.css';
import cheer from '../../images/trophy.png';
import comment from '../../images/comment.png';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// import API from '../../utils/API';
// import Chip from '@material-ui/core/Chip';
// import update from '../../images/compass-update.png';

export default function GoalDetails(props) {


  const [goalComments, setGoalComments] = useState([]);
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

  useEffect(() => {
    API.getOneGoal(props.goal_id)
      .then(res => {
        setGoalComments(res.data.Comments)
      })
      .catch(err => console.log(err, "f"))
  }, [props.goal_id])

  const checkComplete = () => {
    // const token = localStorage.getItem('token');
    if (props.goal_progress === 0) {
      return (
        <Tooltip 
          title="Start Them Gains Doge. Click + Btn to Add Progress!"
          placement="right-start"
        >
        <Chip
          label="Let's Get Started!"
        />
        </Tooltip>
      )
    }
    if (props.goal_target === props.goal_progress) {
      return (
        <Tooltip 
          title="Click Check Btn to Save!"
          placement="right-start"
        >
        <Chip
          label="Goal Complete!"
          style={{
            backgroundColor: "#b8ffa9",
            color: "black"
          }}
        />
        </Tooltip>
      )
    } else return (
      <Tooltip 
        title="Oh Yeah! Nice! Click + Btn to Add Progress!"
        placement="right-start"
        >
      <Chip
        label="Keep it up!"
        style={{
          backgroundColor: "#fff3cd",
          color: "black"
        }}
      />
      </Tooltip>
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
          <Row className="goal-details-row italic">
            <Col size="12">
              <p id="goal-details-description" className="goal-details-description">
                {goalDetails.goal_description}
              </p>
            </Col>
          </Row>
          <Row className="goal-details-row">
            <Col size="12">
              <p className="goal-details-description">
                {renderActivityIcon(goalDetails.goal_category)} {goalDetails.goal_category}
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
                  {goalDetails.goal_progress} out of {goalDetails.goal_target} {goalDetails.value_type.toLowerCase()} completed.
                </p>
              </Col>
            </Row>
          }
          <Row className="goal-details-row">
            <Col size="12">
              <div id="chip-row">
                {!props.is_complete ? checkComplete() : ""}
              </div>
              <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type.toLowerCase()} completed!`} />
            </Col>
          </Row>
          <Row>
            <Col size="6">
              <div className="bt-div">
                <img src={cheer} alt="cheer icon" /><p id="cheer-total">0 cheers</p>
              </div>
            </Col>
            <Col size="6">
              <div className="bt-div">
                <img src={comment} alt="comment icon" /><p id="comment-total">{goalComments.length === 1 ? `${goalComments.length} comment` :  `${goalComments.length} comments`}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="12">
              <div className="border-top padding">
              <List>
            {goalComments ? goalComments.map((comment => {
              return (
                <div key={comment.id}>

                  <ListItem>
                    <ListItemIcon>
                      <img src={commentIcon} alt="comment icon"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={comment.comment_content}
                      secondary={<p>Posted by <span className="username text-primary">{comment.User.username}</span>, {Moment(comment.updatedAt).format("M/D/YY hh:mma")}</p>}
                    />
                  </ListItem>

                </div>
              )
            })) :
              console.log('no goals')
            }
          </List>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

//id="example-custom-modal-styling-title"