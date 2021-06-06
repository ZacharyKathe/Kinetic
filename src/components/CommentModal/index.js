import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import API from '../../utils/API';
import Moment from "moment";
import renderActivityIcon from '../renderCategoryIcon'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import commentIcon from '../../images/comment.png';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default function CommentModal(props) {

  // const [goalsInGroup, setGoalsInGroup] = useState([])


  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setModalShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="goals-to-choose"
      >
        <Modal.Header closeButton>
          <Modal.Title id="goals-to-choose">
            <h2>Comments</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <List>
            {props.comments ? props.comments.map((comment => {
              return (
                <div key={comment.id}>
                  <div className="border-top" />

                    <ListItem>
                      <ListItemIcon>
                        <img src={commentIcon} />}
                      </ListItemIcon>
                      <ListItemText
                        primary={comment.comment_content}
                        // secondary={goal.lastUpdate ? `Last Updated: ${Moment(goal.lastUpdate).format("MMMM Do hh:mma")}` : ""}
                        // secondary={renderGroupName(goal) ? `already a part of ${renderGroupName(goal)}` : ""}
                      />
                    </ListItem>

                </div>
              )
            })) :
              console.log('no goals')
            }
          </List>
        </Modal.Body>

      </Modal>
    </>
  );
}