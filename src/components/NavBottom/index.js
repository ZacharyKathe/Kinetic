import React from "react";
import "./style.css";

function NavBottom(props) {
    return (
        <div className="bottom-nav">
            <div className='homeBtn' onClick={() => props.setSelectedTab('My Goals')}><img src={props.homeBtn} alt="home button" /></div>
            <div className='groupBtn' onClick={() => props.setSelectedTab('My Groups')}><img src={props.groupsBtn} alt="groups button" /></div>
            <div className='calenderBtn' onClick={() => props.setSelectedTab('Calendar')}><img src={props.calendarBtn} alt="calendar button" /></div>
        </div>
    )
}

export default NavBottom;