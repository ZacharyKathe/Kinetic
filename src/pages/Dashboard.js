import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Goal from "../components/Goal";
//import API from "../utils/API";
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import NavBottom from "../components/NavBottom";
// import addBtn from "../../images/add-btn.png";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";

function Dashboard(props) {
  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);


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

  return (
    <div>
      <NavTop />
      <h1>Dashboard Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
        varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
        Etiam ut feugiat ex. Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
        imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum
        ligula in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare
        elit. Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
        consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et
        malesuada fames ac ante ipsum primis in faucibus.
      </p>
      <Goal />
      <AddGoalBtn />
      <NavBottom 
        homeBtn={homeActive}
        groupsBtn={groups}
        calendarBtn={calendar}
        />
    </div>
  );
}

export default Dashboard;
