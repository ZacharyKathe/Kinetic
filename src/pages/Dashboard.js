import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Goal from "../components/Goal";
//import API from "../utils/API";
import NavTop from "../components/NavTop";
// import AddGoalBtn from "../components/AddGoalBtn";
import NavBottom from "../components/NavBottom";
// import addBtn from "../../images/add-btn.png";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";



function Dashboard(props) {
  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);

  const [selectedTab, setSelectedTab] = useState('Home')


  const allGoals = props.user.goals || [];



  useEffect(() => {
    if (!props.user.email) {
      history.push('/')
    }
    if (allGoals.length > 0) {
      setUserGoals(allGoals);
    }
    console.log(userGoals);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function checks the selectedTab state and renders the correct component accordingly
  const renderSelectedTab = () => {
    let result = null;

    console.log(selectedTab);

    switch (selectedTab) {
      case "Home":
        result = <h2>Put goal list component here</h2>;
        break;
      case "Groups":
        result = <h2>Put group list component here</h2>
        break;
      case "Calendar":
        result = <h2>Put calendar component here</h2>
        break;
    }

    return result;
  }

  return (
    <div>
      <NavTop />
      <h1>Dashboard Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Whichever tab is clicked, this function renders the component: */}
      {renderSelectedTab()}

      <NavBottom
        setSelectedTab={setSelectedTab}
        homeBtn={homeActive}
        groupsBtn={groups}
        calendarBtn={calendar}
      />
    </div>
  );
}

export default Dashboard;
