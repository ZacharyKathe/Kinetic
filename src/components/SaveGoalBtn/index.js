import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function SaveGoalBtn(props) {


    return (

        
        <button className="save-goal-btn" type="submit">
            <img src={saveBtn} alt="save button" />
            <p id="save-goal-text"> SAVE GOAL</p>
        </button>
    )
}

export default SaveGoalBtn;