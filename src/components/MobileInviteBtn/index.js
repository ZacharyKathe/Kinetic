import React from "react";
import "./style.css";
import addBtn from "../../images/add-btn.png";

function MobileInviteBtn(props) {
    return (
        <div className="mobile-invite-content">
            <div className="mobile-invite-btn" onClick={() => props.setShow(true)}>
                <img className='save' src={addBtn} alt="invite button" />
                <div id="mobile-invite-text"> Invite Someone! </div>
            </div>
        </div>


    )
}

export default MobileInviteBtn;