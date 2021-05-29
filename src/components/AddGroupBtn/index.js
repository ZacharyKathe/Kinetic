import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";

function AddGroupBtn(props) {
    return (
        <div className="add-group-btn">
            <img src={addBtn} alt="add button" />
            <p id="add-group-text"> CREATE GROUP</p>
        </div>
    )
}

export default AddGroupBtn;