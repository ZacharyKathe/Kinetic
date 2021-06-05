import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";
import { Link } from "react-router-dom";

function GroupBottomNav(props) {
    return (
          <div className="btnCont">
              <Link  to={`/group/${props.id}`}>
              <div className="group-nav-btn-active">
                    <p id="feed-btn-text"> FEED</p> 
                </div>
              </Link>
              <Link  to={`/group/${props.id}`}>
              <div className="group-nav-btn-inactive">
                    <p id="members-btn-text"> MEMBERS</p> 
                </div>
              </Link>
          </div>  
            
            
    )
}

export default GroupBottomNav;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */