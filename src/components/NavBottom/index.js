import React from "react";
import "./style.css";

function NavBottom(props) {
    return (
        <div className="bottom-nav">
            <div onClick={() => props.setSelectedTab('Home')}><img src={props.homeBtn} alt="home button" /></div>
            <div onClick={() => props.setSelectedTab('Groups')}><img src={props.groupsBtn} alt="groups button" /></div>
            <div onClick={() => props.setSelectedTab('Calendar')}><img src={props.calendarBtn} alt="calendar button" /></div>
        </div>
    )
}

export default NavBottom;