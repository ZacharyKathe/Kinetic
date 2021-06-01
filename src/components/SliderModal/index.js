import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import EditSlider from '../EditSlider/index';
// import addBtn from '../../images/add-btn.png';
import IconButton from '@material-ui/core/IconButton';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

export default function SliderModal(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <IconButton 
        onClick={() => setShow(true)} 
        color="primary"
      >
        <EditAttributesIcon
          fontSize="large"
        />
      </IconButton>
      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <EditSlider 
          goal_target={props.goal_target}
          goal_progress={props.goal_progress}
          goal_id={props.goalID}
          token={props.token}
        />
      </Modal>
    </>
  )
}
