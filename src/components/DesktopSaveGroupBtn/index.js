import React from "react";
import "./style.css";
import saveBtn from "../../images/save-btn.png";

function DesktopSaveGroupBtn(props) {
    return (
        <button type="submit" className="desktop-save-group-btn">
            <img src={saveBtn} alt="save button" />
            <p id="save-group-text"> SAVE GROUP</p>
        </button>  
    )
}

export default DesktopSaveGroupBtn;