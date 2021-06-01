import React from "react";
import backBtn from "../../images/back.png";
import exit from "../../images/exit.png";
import "./style.css";
import { useHistory } from "react-router-dom";

function NavTop(props) {

    const history = useHistory();
    
    return (
        
        <div className="top-nav" >
            <img src={backBtn} alt="back button" onClick={() => history.goBack()}/>
            <p className="header-text">{props.header}</p>
            <img src={exit} alt="log out button" onClick={()=> window.localStorage.clear()+ window.location.reload()}/>
        </div>
    )
}

export default NavTop;