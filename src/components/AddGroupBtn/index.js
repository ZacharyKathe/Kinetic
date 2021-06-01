import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";
import {Link} from "react-router-dom"

function AddGroupBtn(props) {
    return (
      <div>
        <Link to="/createGroup">
          <div className="add-group-btn" >
            <img src={addBtn} alt="add button" />
            <p id="add-group-text"> CREATE GROUP</p>
          </div>
        </Link>
      </div>
    )
}

export default AddGroupBtn;