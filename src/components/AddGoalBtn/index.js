import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";
import { Link } from "react-router-dom";

function AddGoalBtn(props) {
    return (
          <div>
              <Link  to="/creategoal">
              <div className="add-goal-btn">
                    <img className='save' src={addBtn} alt="add button" />
                    <p id="add-goal-text"> ADD GOAL</p> 
                </div>
              </Link>
          </div>  
            
            
    )
}

export default AddGoalBtn;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */