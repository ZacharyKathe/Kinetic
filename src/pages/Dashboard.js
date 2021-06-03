import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import Goal from "../components/Goal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import API from "../utils/API";
import NavTop from "../components/NavTop";
import AddGoalBtn from "../components/AddGoalBtn";
import NavBottom from "../components/NavBottom";
import homeActive from "../images/home-active.png";
import groups from "../images/groups.png";
import calendar from "../images/calendar.png";
import DashboardCard from '../components/DashboardCard'
import OldGoalsBtn from "../components/OldGoalsBtn";




function Dashboard(props) {


  const history = useHistory();

  const [userGoals, setUserGoals] = useState([]);

  const [userGroups, setUserGroups] = useState([]);

  const myUser = props.user.username;
  // console.log(props.token);


  useEffect(() => {
    const token = localStorage.getItem('token')
    // Checks if user is logged in, and sends them to login if not
    if (!token) {
      history.push('/')
    }
    // gathers data from props and sets them as local state
    API.getIncompleteGoals(token).then(res => {
      setUserGoals(res.data.Goals)
      setUserGroups(res.data.Groups)
    }).catch(err => {
      console.log(err);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(userGoals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUserGoals(items);
  }


  return (
    <div>
      <NavTop
        header="My Goals"
        username={props.user.username} />

      <>
        <div className='goals-page' >
          <OldGoalsBtn />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="goalCards">
              {(provided) => (
                <div className='goalCards' {...provided.droppableProps} ref={provided.innerRef}>

                  {userGoals ? userGoals.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            className='dash-card'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DashboardCard
                              goal_name={item.goal_name}
                              goal_description={item.goal_description}
                              goal_category={item.goal_category}
                              goal_frequency={item.goal_frequency}
                              goal_target={item.goal_target}
                              goal_progress={item.goal_progress}
                              goal_start={item.goal_start}
                              goal_finish={item.goal_finish}
                              value_type={item.value_type}
                              id={item.id}
                              completed_date={item.completedDate}
                              last_refresh={item.lastRefresh}
                              key={item.id}
                              token={props.token}
                              setUserGoals={setUserGoals}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                    : console.log("no goals right now")}
                  {provided.placeholder}
                </div>
              )
              }
            </Droppable>
          </DragDropContext>
        </div>
      </>

      <div className="nav-btm-fixed">
        <AddGoalBtn />
        <NavBottom
          homeBtn={homeActive}
          groupsBtn={groups}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}

export default Dashboard;
