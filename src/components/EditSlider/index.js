import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';
 
export default function EditSlider(props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(props.goal_progress);
 
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
  const changeProg = () => {
    console.log(value)
    const progObj = {
      goal_progress: value
    }
    API.editGoal(props.goal_id, progObj, props.token)
      .then(res => {
        console.log(res)
        history.goBack();
        setTimeout(window.location.reload.bind(window.location), 200);
      })
  }

  return (
    <>
      <Slider
        show={show}
        onHide={() => setShow(false)}
        // value={editProg || 0}
        value={value}
        onChange={handleChange}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={props.goal_target}
        valueLabelDisplay="auto"
      />
      <Button
        onClick={() => changeProg()}
      />
    </>
  );
 
};