import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import EditSlider from '../EditSlider/index';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Moment from "moment";
import API from "../../utils/API";
import Tooltip from '@material-ui/core/Tooltip';
import "./index.css"

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
          style={{ padding: "0" }}
        >

          <AddCircleIcon
            className="addIcon blob-add"
            fontSize="large"
            style={{
              color: "#3d3d3d"
            }}
          />
        </IconButton>
        :
        <Tooltip
          title="Save Goal"
          placement="left"
        >
          <IconButton
            className="saveIcon blob-save"
            onClick={() => {
              const token = localStorage.getItem('token');
              setShow(false);
              const updatedGoal = {
                isComplete: true,
                lastCompletedDate: Moment().format("YYYY-MM-DD")
              }
              const completedDate = {
                goal_id: props.goal_id,
                completedDate: Moment().format("YYYY-MM-DD")
              }
              API.editGoal(props.goal_id, updatedGoal, token).then(res => {
                API.completeGoal(completedDate).then(res => {

                  API.getIncompleteGoals(token).then(res => {
                    if (res.data) {
                      props.setUserGoals(res.data.Goals)
                    } else {
                      props.setUserGoals()
                    }
                  })
                }).catch(err => {
                  console.log(err);
                })
              })
            }}
            style={{ padding: "0" }}
          >
            <CheckCircleIcon
              className="addIcon"
              fontSize="large"
              style={{
                color: "#a0c4ff"
              }}
            />
          </IconButton>
        </Tooltip>
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
          handleclick={props.handleClick}
        />
      </Modal>
    </>
  )
}
