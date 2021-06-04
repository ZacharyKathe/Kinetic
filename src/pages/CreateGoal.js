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
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-active.png";
import desktopGroup from "../images/desktop-group-inactive.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";

const moment = require("moment");

// repurposed from login, needs update for create goal
const CreateGoal = (props) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  const [newGoal, setNewGoal] = useState({
    goal_name: "",
    goal_description: "",
    goal_category: "Exercise",
    goal_frequency: "",
    goal_target: 3,
    value_type: "Miles",
    goal_start: moment().format("YYYY-MM-DD"),
    goal_finish: moment().add(1, "weeks").format("YYYY-MM-DD"),
    lastRefresh: moment().format("YYYY-MM-DD")
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      console.log(newGoal);
      if (newGoal.goal_target === "") {
        newGoal.goal_target = 1
      }
    API.createGoal(newGoal, token)
      .then(result => {
        API.getDashboard(token).then(res => {
          
          props.setUserState({
            token: token,
            user: {
              email: res.data.email,
              id: res.data.id,
              username: res.data.username,
              goals: res.data.Goals,
              groups: res.data.Groups,
            }
            
          })
          history.push('/dashboard')
        }).catch(err => {
          console.log(err);
          console.log("no logged in user")
          localStorage.removeItem("token");
          props.setUserState({
            token: "",
            user: {}
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  };


  return (
    <div className="create-goal">
      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
        actionBtn={<p className="desktop-header-text">Create Goal</p>}
      />
      <NavTop header="Create Goal" />


        <form onSubmit={handleSubmit} className="create-goal-form">
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal name</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder="Enter a name for your goal..."
                name="goal_name"
                value={newGoal.goal_name}
                onChange={(e) => setNewGoal({...newGoal, goal_name: e.target.value})}
                required
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Description</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder="What are you trying to accomplish?"
                name="goal_description"
                value={newGoal.goal_description}
                onChange={(e) => setNewGoal({...newGoal, goal_description: e.target.value})}
                required
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal Category</p>
              <select
                className="create-goal-input"
                type="text"
                placeholder="Choose a goal category..."
                name="goal_category"
                value={newGoal.goal_category}
                onChange={(e) => setNewGoal({...newGoal, goal_category: e.target.value})}
              >
                <option value="" disabled defaultValue hidden> </option>
                <option value="Diet">Diet</option>
                <option value="Exercise">Exercise</option>
                <option value="Financial">Financial</option>
                <option value="Habit">Habit</option>
                <option value="Health">Health</option>
                <option value="Intellectual">Intellectual</option>
                <option value="Productivity">Productivity</option>
                <option value="Relationship">Relationship</option>
                <option value="Skills">Skills</option>
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
                placeholder="Choose a goal frequency..."
                name="goal_frequency"
                value={newGoal.goal_frequency}
                onChange={(e) => setNewGoal({...newGoal, goal_frequency: e.target.value})}
              >
                <option value="" disabled  hidden> How often will this goal refresh? </option>
                <option value="One Time">One Time</option>
                <option value="Daily" defaultValue>Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal target (Opt.)</p>
              <input
                className="create-goal-input"
                type="number"
                placeholder="Choose a target number for your goal..."
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
                <option value="Other">Other</option>
                <option value="Events">Events</option>
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
          <SaveGoalBtn />
        </div>
        </form>
    </div>
  );
};

export default CreateGoal;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */
