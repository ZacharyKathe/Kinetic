import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";
import { Link } from "react-router-dom";

function DesktopAddGoalBtn(props) {
    return (
          <div className="btnCont">
              <div className="desktop-add-goal-btn" onClick={() => props.setShow(true)}>
                    <img className='save' src={addBtn} alt="add button" />
                    <p id="add-goal-text"> Invite Someone! </p> 
                </div>
          </div>  
            
            
    )
}

export default DesktopAddGoalBtn;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */