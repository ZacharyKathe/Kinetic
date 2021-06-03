import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import EditSlider from '../EditSlider/index';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Moment from "moment";
import API from "../../utils/API";

export default function SliderModal(props) {
  const [show, setShow] = useState(false);

  // const theme = {
  //   spacing: 8,
  // }

  return (
    <>
      {props.goal_target !== props.goal_progress ?
      <IconButton 
        className="addIcon"
        onClick={() => setShow(true)} 
        color="primary"
        style={{padding: "0"}}
      >
        <AddCircleIcon
          className="addIcon"
          fontSize="large"
          style={{
            color: "#3d3d3d"
          }}
        />
      </IconButton>
      :
      <IconButton 
      className="saveIcon"
      onClick={() => {
        const token = localStorage.getItem('token');
        setShow(false);
        const updatedGoal = {
          isComplete: true,
          completedDate: Moment().format("YYYY-MM-DD")
        }
        API.editGoal(props.goal_id, updatedGoal, token).then(res => {
          API.getIncompleteGoals(token).then(res => {
            if (res.data) {
              props.setUserGoals(res.data.Goals)
            } else {
              props.setUserGoals()
            }
          }).catch(err => {
            console.log(err);
          })
        })
      }}
      color=""
      style={{padding: "0"}}
    >
      <CheckCircleOutlineIcon
        className="addIcon"
        fontSize="large"
        style={{ 
          color: "#caffbf"
        }}
      />
    </IconButton>
      }
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal"
        show={show}
        onHide={() => setShow(false)}
      >
          <EditSlider 
            goal_target={props.goal_target}
            goal_progress={props.goal_progress}
            goal_id={props.goal_id}
            token={props.token}
            modalShow={setShow}
            setUserGoals={props.setUserGoals}
            handleClick={props.handleClick}
          />
      </Modal>
    </>
  )
}
