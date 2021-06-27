import React from "react";
import { Modal } from "react-bootstrap";
import API from "../../utils/API";
import Moment from "moment";
import renderActivityIcon from "../renderCategoryIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "./style.css";
// import CommentModel from "../CommentModal"

export default function AddGoalToGroup(props) {
  // const [goalsInGroup, setGoalsInGroup] = useState([])

  // const history = useHistory();
  // let tempGoalsArr = [];

  // const goalArr = []
  // useEffect(() => {
  //   // setGoalsInGroup([])
  //   console.log(props.group_id);
  //   if (props.goals) {
  //     props.goals.map(goal => {
  //       console.log(goal);
  //       goal.Groups.map(group => {
  //         console.log(group.id);
  //         if (Number(props.group_id) === group.id) {
  //           console.log(goal);
  //           setGoalsInGroup(goalsInGroup => [...goalsInGroup, goal])
  //         }
  //       })
  //     });
  //   }

  // }, [])

  // const renderGroupName = (goal) => {
  //   if (goalsInGroup) {
  //     for (const groupGoal of goalsInGroup) {
  //       // console.log(goal.id);
  //       // console.log(groupGoal.id);
  //       // console.log(groupGoal);
  //       if (goal.id === groupGoal.id) {
  //         // console.log(props.thisGroup);
  //         return props.thisGroup.name;
  //       } else return false;
  //     }
  //   }
  // }

  const handleGoalAdd = (goalID) => {
    const token = localStorage.getItem("token");
    const goalObj = {
      goal_id: goalID,
    };
    console.log(goalObj);
    API.addGoalToGroup(props.group_id, goalObj, token)
      .then((res) => {
        props.updateGoals();
        props.setModalShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <h2>Share which goal?</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.goals
            ? props.goals.map((goal) => {
                return (
                  <List className="pt-0">
                    <div key={goal.id} className="border-topper">
                      <div onClick={() => handleGoalAdd(goal.id)}>
                        <ListItem>
                          <ListItemIcon>
                            {renderActivityIcon(goal.goal_category)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <h4 className="text-primary">{goal.goal_name}</h4>
                            }
                            // ${renderGroupName(goal) ? `(already a part of ${renderGroupName(goal)})` : ""}`}
                            secondary={
                              goal.lastUpdate
                                ? `Last Updated: ${Moment(
                                    goal.lastUpdate
                                  ).format("MMMM Do hh:mma")}`
                                : ""
                            }
                            // secondary={renderGroupName(goal) ? `already a part of ${renderGroupName(goal)}` : ""}
                          />
                        </ListItem>
                      </div>
                    </div>
                  </List>
                );
              })
            : console.log("no goals")}
        </Modal.Body>
      </Modal>
    </>
  );
}
