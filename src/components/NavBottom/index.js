import React from "react";
import "./style.css";

function NavBottom(props) {
    return (
        <div className="bottom-nav">
           <img src={props.homeBtn} alt="home button" />
           <img src={props.groupsBtn} alt="groups button" />
           <img src={props.calendarBtn} alt="calendar button" />
        </div>
    )
}

export default NavBottom;