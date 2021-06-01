import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function SaveGroupBtn(props) {
    return (
        <button type="submit" className="save-goal-btn">
            <img src={saveBtn} alt="save button" />
            <p id="save-group-text"> SAVE GROUP</p>
        </button>
    )
}

export default SaveGroupBtn;