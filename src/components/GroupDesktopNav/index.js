import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function GroupDesktopNav(props) {
    return (
          <div className="desktop-group-btns">
              <Link  to={`/group/${props.id}`}>
              <div className={props.feedStatus}>
                    <p id="desktop-feed-btn-text"> FEED</p> 
                </div>
              </Link>
              <Link  to={`/group/${props.id}/members`}>
              <div className={props.memberStatus}>
                    <p id="desktop-members-btn-text"> MEMBERS</p> 
                </div>
              </Link>
          </div>  
            
            
    )
}

export default GroupDesktopNav;