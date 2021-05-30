import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function SaveGoalBtn(props) {

    return (
        <div className="save-goal-btn">
            <img src={saveBtn} alt="save button" />
            <p id="save-goal-text"> SAVE GOAL</p>
        </div>
    )
}

export default SaveGoalBtn;