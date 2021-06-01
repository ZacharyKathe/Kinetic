import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import EditSlider from '../EditSlider/index';
import addBtn from '../../images/add-btn.png';

export default function SliderModal(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShow(true)} 
        variant="primary"
      >
        <img src={addBtn} alt=""/>
      </Button>
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
