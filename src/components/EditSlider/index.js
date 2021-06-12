import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Moment from "moment";
import API from '../../utils/API';
import "./style.css"
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';


export default function EditSlider(props) {
  const [show, setShow] = useState(false);
  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.goal_progress);

  const history = useHistory();
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
  const changeProg = () => {
    const token = localStorage.getItem('token')
    props.handleclick()
    // console.log(value)
    const progObj = {
      goal_progress: value,
      lastUpdate: Moment()
    }
    API.editGoal(props.goal_id, progObj, token)
    .then(result => {
      
      props.modalShow(false);
      getDashboard();
      history.push('/dashboard')
    }).catch(err => {
      console.log(err);
      // console.log(open, setOpen);
      
    })
  }
  
  
  // Doesnt auto render yet!
  const getDashboard = () => {
    const token = localStorage.getItem('token')
    API.getIncompleteGoals(token).then(res => {
      props.setUserGoals(res.data.Goals)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
    <p className="text-center pt-2">Where are you at today?</p>
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