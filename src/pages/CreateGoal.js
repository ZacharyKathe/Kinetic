import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Col from "../components/Col";
import Row from "../components/Row";
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import SaveGoalBtn from "../components/SaveGoalBtn";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import "../index.css";


// repurposed from login, needs update for create goal
const CreateGoal = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    setusername("");
    setpassword("");
  };

  const location = useLocation();

  return (
    <div className="create-goal">
      <NavTop header="Create Goal" />


        <form onSubmit={handleSubmit}>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal name</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder=" Enter a name for your goal..."
                name="goal_name"
                // value={goal_name}
                //onChange={(event) => setusername(event.target.value)}
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
                // value={goal_description}
                // onChange={(event) => setpassword(event.target.value)}
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
                // value={goal_description}
                // onChange={(event) => setpassword(event.target.value)}
              >
                <option value="" disabled selected hidden> </option>
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
                // value={goal_description}
                // onChange={(event) => setpassword(event.target.value)}
              >
                <option value="" disabled selected hidden> </option>
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
                type="text"
                placeholder=" Choose a target number for your goal..."
                name="goal_target"
                // value={goal_target}
                // onChange={(event) => setpassword(event.target.value)}
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Number type</p>
              <select
                className="create-goal-input"
                type="text"
                placeholder=" What type of number is your target..."
                name="number_type"
                // value={number_type}
                // onChange={(event) => setpassword(event.target.value)}
              >
                <option value="" disabled selected hidden> </option>
                <option value="Event">Event</option>
                <option value="Hours">Hours</option>
                <option value="Kilograms">Kilograms</option>
                <option value="Liters">Liters</option>
                <option value="Miles">Miles</option>
                <option value="Minutes">Minutes</option>
                <option value="Kilometers">Kilometers</option>
                <option value="Pounds">Pounds</option>
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
                type="text"
                placeholder=" mm/dd/yyyy"
                name="goal_start"
                // value={goal_start}
                // onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            <div className="actual-dates">
            <p className="create-goal-label">
                End date
              </p>
              <input
                className="create-goal-input"
                type="text"
                placeholder=" mm/dd/yyyy"
                name="goal_finish"
                // value={goal_finish}
                // onChange={(event) => setpassword(event.target.value)}
              />
            </div>
          </div>
          
        </form>
        <div className="nav-btm-fixed">
          <SaveGoalBtn />
          <NavBottom
              homeBtn={homeActive}
              groupsBtn={groups}
              calendarBtn={calendar}
            />
        </div>
    </div>
  );
};

export default CreateGoal;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */
