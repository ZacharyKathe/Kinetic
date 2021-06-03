import React, { useEffect, useState } from "react";
// import Container from "../Container";
import Col from "../Col";
import Row from '../Row/index';
import { Modal } from 'react-bootstrap';
import API from "../../utils/API";
import "./style.css"

export default function InviteUser(props) {

  const [invitedUser, setInvitedUser] = useState("")



  const handleEmailSend = (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    props.setShow(false);
    const inviteObj = {
      groupUrl: `localhost:3000/group/${props.group_id}`,
      groupName: props.group_name,
      invitedUser: invitedUser
    }
    API.inviteUser(inviteObj, token)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }


  return (
    <>
      <Modal
        show={props.show}
        onHide={() => { props.setShow(false) }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="invite-header">
          <Modal.Title>
            <Row className="goal-title-row">
              <Col size="12">
                <h1 className="goal-details-name invite-header">
                  Invite to your group!
               </h1>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="no-padding">
          <form onSubmit={handleEmailSend}>
            <div className="signInForm">
              <div className="col-12">
                <input className="form-control" required type="text" placeholder=" Email" autoComplete="on" name="email" value={invitedUser} onChange={event => setInvitedUser(event.target.value)} />
              </div>
              <button className="btn btn-outline-primary btn-block btn-lg" type="submit">
                Invite User
            </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
