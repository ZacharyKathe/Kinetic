import React, { useState } from "react";
import Moment from "moment";
import "./style.css";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu';
import {
  MenuItem,
  MenuList,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
} from "@material-ui/core";

// import DesktopAddGoalBtn from "../DesktopAddGoalBtn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function DesktopNav(props) {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    Moment().format("MMMM Do h:mma")
  );
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    setCurrentTime(Moment().format("MMMM Do h:mma"));

    setInterval(() => {
      setCurrentTime(Moment().format("MMMM Do h:mma"));
      // console.log(currentTime);
    }, 1000 * 10);

    prevOpen.current = open;
  }, [open, currentTime]);

  return (
    <div className="desktop-nav">
      <div className="primary-navigation-left">
        <div
          className="kinetik-homeBtn"
          onClick={() => history.push("/dashboard")}
        >
          <img src={props.homeBtn} alt="kinetik logo" />
        </div>

        <div
          className="desktop-groupBtn"
          onClick={() => history.push("/dashboard/mygroups")}
        >
          <img src={props.groupBtn} alt="groups button" />
        </div>

        <div
          className="desktop-calendarBtn"
          onClick={() => history.push("/dashboard/mycalendar")}
        >
          <img src={props.calendarBtn} alt="calendar button" />
        </div>
      </div>

      <div className="desktop-add-goal-center">{props.actionBtn}</div>

      <div className="account-menu-right" onClick={handleToggle}>
        <p className="pr-3 text-secondary">{currentTime}</p>
        <AccountCircleIcon
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          color="disabled"
          fontSize="large"
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => {
                        setOpen(false);
                        history.push(`/profile/${props.username}`);
                      }}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        setOpen(false);
                        history.push("/profile/settings");
                      }}
                    >
                      Settings
                    </MenuItem>

                    {props.group_id ? (
                      <MenuItem
                        onClick={() => {
                          API.leaveGroup(props.group_id, { obj: "" }, token)
                            .then((res) => history.push("/dashboard/mygroups"))
                            .catch((err) => console.log(err));
                        }}
                      >
                        Leave Group
                      </MenuItem>
                    ) : (
                      ""
                    )}

                    <MenuItem
                      onClick={() =>
                        window.localStorage.clear() + window.location.reload()
                      }
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <p>▾</p>
      </div>
    </div>
  );
}

export default DesktopNav;

//      <DesktopNav header="Desktop View" />
//<p className="desktop-header-text">{props.header}</p>
