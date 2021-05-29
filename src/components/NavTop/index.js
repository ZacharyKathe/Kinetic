import React from "react";
import backBtn from "../../images/back.png";
import exit from "../../images/exit.png";
import "./style.css";

function NavTop(props) {
    return (
        <div className="top-nav">
           <img src={backBtn} alt="back button" />
           <p className="header-text">{props.header}</p>
           <img src={exit} alt="log out button" />
        </div>
    )
}

export default NavTop;