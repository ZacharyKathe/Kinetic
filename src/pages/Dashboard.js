import React, { useEffect, useState } from "react";
import Goal from "../components/Goal";
import API from "../utils/API";
import NavTop from "../components/NavTop";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import AddGoalBtn from "../components/AddGoalBtn";
import AddGroupBtn from "../components/AddGroupBtn";

function Dashboard(props) {
  const [user, setUser] = useState(
    {
      username: '',
      email: '',
      id: 0,
    });

  const [userGoals, setUserGoals] = useState(
    {
      goals: [],
    }
  )


    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      
      /* API.getUser(user.id).then(res=>{
        console.log(res.data);
        }, []);*/
      });

  return (
    <div>
      <NavTop header="Goals" />
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
      <NavBottom homeBtn={homeActive} groupsBtn={groups} calendarBtn={calendar} />
    </div>
  );
}

export default Dashboard;
