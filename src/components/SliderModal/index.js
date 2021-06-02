import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import EditSlider from '../EditSlider/index';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function SliderModal(props) {
  const [show, setShow] = useState(false);

  // const theme = {
  //   spacing: 8,
  // }

  return (
    <>
      <IconButton 
        className="addIcon"
        onClick={() => setShow(true)} 
        color="primary"
        style={{padding: "0"}}
      >
        <AddCircleIcon
          fontSize="large"
        />
      </IconButton>
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
