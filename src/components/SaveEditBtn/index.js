import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function SaveEditBtn(props) {


    return (

        
        <button className="save-edit-btn" type="submit">
            <img src={saveBtn} alt="save button" />
            <p id="save-edit-text"> SAVE GOAL</p>
        </button>
    )
}

export default SaveEditBtn;