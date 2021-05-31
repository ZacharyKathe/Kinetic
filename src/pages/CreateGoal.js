import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Col from "../components/Col";
import Row from "../components/Row";
import NavTop from "../components/NavTop";
// import NavBottom from "../components/NavBottom";
import SaveGoalBtn from "../components/SaveGoalBtn";
// import homeActive from "../images/home-active.png";
// import groups from "../images/groups.png";
// import calendar from "../images/calendar.png";
import API from "../utils/API"
import "../index.css";

const moment = require("moment");

// repurposed from login, needs update for create goal
const CreateGoal = (props) => {
  const history = useHistory();

  const [newGoal, setNewGoal] = useState({
    goal_name: "",
    goal_description: "",
    goal_category: "",
    goal_frequency: "",
    goal_target: "",
    value_type: "",
    goal_start: moment().format("YYYY-MM-DD"),
    
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(props.token);
    if (props.token) {
    API.createGoal(newGoal, props.token)
      .then(res => {
        // history.push('/dashboard')
        history.goBack();
      })
      .catch(err => {
        // console.log(props.token);
        console.log(err);
      })
    }
  };

  // const location = useLocation();

  return (
    <div className="create-goal">
      <NavTop header="Create Goal" />


        <form onSubmit={handleSubmit} className="create-goal-form">
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal name</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder=" Enter a name for your goal..."
                name="goal_name"
                value={newGoal.goal_name}
                onChange={(e) => setNewGoal({...newGoal, goal_name: e.target.value})}
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Description</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder=" Describe your goal..."
                name="goal_description"
                value={newGoal.goal_description}
                onChange={(e) => setNewGoal({...newGoal, goal_description: e.target.value})}
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal Category</p>
              <select
                className="create-goal-input"
                type="text"
                placeholder=" Choose a goal category..."
                name="goal_category"
                value={newGoal.goal_category}
                onChange={(e) => setNewGoal({...newGoal, goal_category: e.target.value})}
              >
                <option value="" disabled defaultValue hidden> </option>
                <option value="Diet">Diet</option>
                <option value="Education">Education</option>
                <option value="Exercise">Exercise</option>
                <option value="Financial">Financial</option>
                <option value="Habit">Habit</option>
                <option value="Health">Health</option>
                <option value="Relationship">Relationship</option>
                <option value="Work">Work</option>
              </select>  
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal frequency</p>
              <select
                className="create-goal-input"
                type="text"
                placeholder=" Choose a goal frequency..."
                name="goal_frequency"
                value={newGoal.goal_frequency}
                onChange={(e) => setNewGoal({...newGoal, goal_frequency: e.target.value})}
              >
                <option value="" disabled defaultValue hidden> </option>
                <option value="One Time">One Time</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal target</p>
              <input
                className="create-goal-input"
                type="number"
                placeholder=" Choose a target number for your goal..."
                name="goal_target"
                value={newGoal.goal_target}
                onChange={(e) => setNewGoal({...newGoal, goal_target: e.target.value})}
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Target value type</p>
              <select
                className="create-goal-input"
                type="text"
                placeholder=" What type of value is your target..."
                name="value_type"
                value={newGoal.value_type}
                onChange={(e) => setNewGoal({...newGoal, value_type: e.target.value})}
              >
                <option value="Other" defaultValue hidden>Other</option>
                <option value="Event">Event</option>
                <option value="Hours">Hours</option>
                <option value="Kilograms">Kilograms</option>
                <option value="Liters">Liters</option>
                <option value="Miles">Miles</option>
                <option value="Minutes">Minutes</option>
                <option value="Kilometers">Kilometers</option>
                <option value="Pounds">Pounds</option>
                {/* <option value="Other">Other</option> */}
              </select>
            </Col>
          </Row>
          <div className="goal-dates">
            <div className="actual-dates">
              <p className="create-goal-label">
                Start date
              </p>
              <input
                className="create-goal-input"
                type="date"
                name="goal_start"
                value={newGoal.goal_start}
                onChange={(e) => setNewGoal({...newGoal, goal_start: e.target.value})}
              />
            </div>
            <div className="actual-dates">
            <p className="create-goal-label">
                End date
              </p>
              <input
                className="create-goal-input"
                type="date"
                placeholder=" mm/dd/yyyy"
                name="goal_finish"
                value={newGoal.goal_finish}
                onChange={(e) => setNewGoal({...newGoal, goal_finish: e.target.value})}
              />
            </div>
          </div>
          
        <div className="nav-btm-fixed">
          <SaveGoalBtn 
          // handleSubmit={handleSubmit}
          />
          {/* <NavBottom
              homeBtn={homeActive}
              groupsBtn={groups}
              calendarBtn={calendar}
          /> */}
        </div>
        </form>
    </div>
  );
};

export default CreateGoal;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */
