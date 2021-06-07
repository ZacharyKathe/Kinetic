import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavTop from "../components/NavTop";
import InviteUser from "../components/InviteUser";
import API from "../utils/API";
import DesktopNav from "../components/DesktopNav";
import GoalUpdateCard from "../components/GoalUpdateCard";
import AddGoalToGroup from "../components/AddGoalToGroup"
import DesktopInviteBtn from "../components/DesktopInviteBtn"
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";
import "./group.scss"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import calendar from "../images/calendar.png";
import GroupBottomNav from "../components/GroupBottomNav";
import GroupDesktopNav from "../components/GroupDesktopNav";
import MobileInviteBtn from "../components/MobileInviteBtn";





function Group(props) {

  const [myUser, setMyUser] = useState()
  const [myGoals, setMyGoals] = useState()
  // const [goalsNotInGroup, setGoalsNotInGroup] = useState()
  const [thisGroup, setThisGroup] = useState()
  const [inGroup, setInGroup] = useState(false)
  const [groupUsers, setGroupUsers] = useState([])
  const [groupGoals, setGroupGoals] = useState([])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  // Grabs url group id
  const { id } = useParams();
  let goalArray = [];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/')
    }

    API.getDashboard(token)
      .then(res => {
        setMyUser(res.data.username)
        setMyGoals(res.data.Goals)

      })
      .then(res => {
      }).catch(err => {
        console.log(err);
      })

    API.getOneGroup(id)
      .then(res => {

        // Set the group
        setThisGroup(res.data)
        // checkIfInGroup();    

        // Set the group users
        setGroupUsers(res.data.Users)

        if (checkIfInGroup()) {
          setInGroup(true);
        }
        updateGoals(res.data.Goals)

      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sees if current user is in group
  const checkIfInGroup = () => {
    if (groupUsers) {
      const amInGroup = groupUsers.filter(user => user.username === myUser);
      // console.log(amInGroup);
      return amInGroup;
    } else return false;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const updateGoals = (goals) => {
    if (!goals) {
      API.getOneGroup(id)
        .then(res => {
          goalArray = res.data.Goals;

          // Sort the array by which goal was most recently updated
          goalArray.sort(function (a, b) {
            var keyA = new Date(a.lastUpdate),
              keyB = new Date(b.lastUpdate);
            // Compare the 2 dates
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });

          // Set the sorted user goals!
          setGroupGoals(goalArray)
        })
        .catch(err => console.log(err))
    } else {
      goalArray = goals;

      // Sort the array by which goal was most recently updated
      goalArray.sort(function (a, b) {
        var keyA = new Date(a.lastUpdate),
          keyB = new Date(b.lastUpdate);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });

      // Set the sorted user goals!
      setGroupGoals(goalArray)
    }
  }

  const assignUsername = (userID) => {
    for (const user of groupUsers) {
      if (user.id === userID) {
        return user.username;
      }
    }
  }

  const groupName = (thisGroup ? thisGroup.name : "My Group")

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message="Email Sent"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {inGroup ?
        <>
          <AddGoalToGroup
            goals={myGoals ? myGoals : ""}
            group_id={id}
            show={modalShow}
            thisGroup={thisGroup}
            setModalShow={setModalShow}
            useEffect={useEffect}
            updateGoals={updateGoals} />

          <InviteUser
            group_id={id}
            group_name={groupName}
            show={inviteOpen}
            myName={myUser}
            setShow={setInviteOpen}
            setOpen={setOpen}
            className="invite-modal" />
        </>

        : ""}

      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
        actionBtn={inGroup ? <DesktopInviteBtn setShow={setInviteOpen} /> : ""}
      />

      <NavTop
        group_id={id}
        setInviteOpen={setInviteOpen}
        header={<MobileInviteBtn setShow={setInviteOpen} />}
      />
      <GroupDesktopNav
        feedStatus="group-desktop-btn-active"
        memberStatus="group-desktop-btn-inactive"
        id={id}
      />
      <h1 className="feed-page-header text-center pb-4">{groupName} Feed</h1>
      {inGroup ? <h4 className="btny btn-5 text-center add-goal" onClick={() => setModalShow(true)}>Share your goal!</h4> : ""}
      <div className="group-updates">
        {groupGoals ? groupGoals.map((item) =>
          <GoalUpdateCard
            goal={item}
            group_id={id}
            key={item.id}
            user={assignUsername(item.user_id)}
            current_user={myUser}
            updateGoals={updateGoals}
          />) : console.log('no goals to share!')}
      </div>
      <div className="nav-btm-fixed">
        <GroupBottomNav
          feedStatus="group-nav-btn-active"
          memberStatus="group-nav-btn-inactive"
          id={id}
        />
        <NavBottom
          homeBtn={home}
          groupsBtn={groupsActive}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}

export default Group;