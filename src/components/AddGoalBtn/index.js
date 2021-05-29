import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";

function AddGoalBtn(props) {
    return (
        <div className="add-goal-btn">
            <img src={addBtn} alt="add button" />
            <p id="add-goal-text"> ADD GOAL</p>
        </div>
    )
}

export default AddGoalBtn;