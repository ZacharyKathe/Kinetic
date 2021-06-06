import React from 'react';
import { Modal } from 'react-bootstrap';
import API from '../../utils/API';
import Moment from "moment";
// import renderActivityIcon from '../renderCategoryIcon'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import commentIcon from '../../images/comment.png';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function CommentModal(props) {

  const deleteComment = (id) => {
    const token = localStorage.getItem('token');
    API.deleteComment(id, token)
      .then(res => {
        // console.log(res)
        API.getOneGoal(props.goalID)
          .then(res => {
            props.setGoalComments(res.data.Comments)
          })
          .catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

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
                      <img src={commentIcon} alt="comment icon" />
                    </ListItemIcon>
                    <ListItemText
                      primary={comment.comment_content}
                      secondary={<p>Posted by <span className="username text-primary">{comment.User.username}</span>, {Moment(comment.updatedAt).format("M/D/YY hh:mma")}</p>}
                    />
                    <ListItemIcon>
                      {props.username === comment.User.username ?
                        <div onClick={() => deleteComment(comment.id)}>
                          <DeleteForeverIcon fontSize="default" />
                        </div>
                        : ""}
                    </ListItemIcon>
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