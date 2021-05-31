import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function SaveGroupBtn(props) {
    return (
        <div className="save-group-btn">
            <img src={saveBtn} alt="save button" />
            <p id="save-group-text"> SAVE GROUP</p>
        </div>
    )
}

export default SaveGroupBtn;