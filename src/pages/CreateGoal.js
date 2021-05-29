import React, { useState } from "react";
import Container from "../components/Container";
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

      <Container className="create-goal-form">
        <form onSubmit={handleSubmit}>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Goal name</p>
              <input
                className="create-goal-input"
                type="text"
                placeholder="Enter a name for your goal..."
                name="goal_category"
                // value={goal_category}
                onChange={(event) => setusername(event.target.value)}
              />
            </Col>
          </Row>
          <Row className="create-goal-row">
            <Col size="12">
              <p className="create-goal-label">Description</p>
              <input
                className="create-goal-input"
                type="password"
                placeholder="Describe your goal..."
                name="password"
                // value={password}
                onChange={(event) => setpassword(event.target.value)}
              />
            </Col>
          </Row>
          
        </form>
        <div className="nav-btm-fixed">
          <SaveGoalBtn />
          <NavBottom
              homeBtn={homeActive}
              groupsBtn={groups}
              calendarBtn={calendar}
            />
        </div>
      </Container>
    </div>
  );
};

export default CreateGoal;

/* <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
  Dashboard
</Link> */
