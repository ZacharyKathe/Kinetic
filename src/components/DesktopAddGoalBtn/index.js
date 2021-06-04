import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";
import { Link } from "react-router-dom";

function DesktopAddGoalBtn(props) {
    return (
          <div className="btnCont">
              <Link  to="/creategoal">
              <div className="desktop-add-goal-btn">
                    <img className='save' src={addBtn} alt="add button" />
                    <p id="add-goal-text"> ADD GOAL</p> 
                </div>
              </Link>
          </div>  
            
            
    )
}

export default DesktopAddGoalBtn;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */