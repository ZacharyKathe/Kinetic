import React from "react";
import "./style.css";
import { useHistory } from 'react-router-dom';


function NavBottom(props) {
    const history = useHistory();
    return (
        <div className="bottom-nav">
            <div onClick={() => history.push('/dashboard')}><img src={props.homeBtn} alt="home button" /></div>
            <div onClick={() => history.push('/dashboard/mygroups')}><img src={props.groupsBtn} alt="groups button" /></div>
            <div onClick={() => history.push('/dashboard/mycalendar')}><img src={props.calendarBtn} alt="calendar button" /></div>
        </div>
    )
}

export default NavBottom;