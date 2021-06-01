import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';
const token = localStorage.getItem('token')

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
    API.editGoal(props.goal_id, progObj, token)
      .then(result => {

        props.modalShow(false);
        getDashboard();
        history.push('/dashboard')
      }).catch(err => {
        console.log(err);

      })
  }

  // Doesnt auto render yet!
  const getDashboard = () => {
    API.getDashboard(token).then(res => {

      props.setUserState({
        token: token,
        user: {
          email: res.data.email,
          id: res.data.id,
          username: res.data.username,
          goals: res.data.Goals,
          groups: res.data.Groups,
        }

      })
    }).catch(err => {
      console.log(err);
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
      >
        Save Progress
      </Button>
    </>
  );

};