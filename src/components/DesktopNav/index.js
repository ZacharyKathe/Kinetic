import React, { useState } from "react";
import backBtn from "../../images/back.png";
import exit from "../../images/exit.png";
import "./style.css";
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, MenuList, Fade, Button, ClickAwayListener, Grow, Paper, Popper } from '@material-ui/core';
import kinetikLogo from "../../images/kinetik-active.png";
import desktopGroups from "../../images/desktop-groups.png";

function DesktopNav(props) {

    const history = useHistory();

    const [open, setOpen] = useState(false)
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    
    return (
        
        <div className="desktop-nav" >

            <div className='kinetik-homeBtn' onClick={() => history.push('/dashboard')}><img src={kinetikLogo} alt="kinetik logo" /><p>kinetik</p></div>

            <div className='desktop-groupBtn' onClick={() => history.push('/dashboard/mygroups')}><img src={desktopGroups} alt="groups button" /><p>Groups</p></div>

            <p className="desktop-header-text">{props.header}</p>
            <MenuIcon
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="disabled"
                fontSize="large"
                onClick={handleToggle}
            />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={() => {
                                        setOpen(false);
                                        history.push(`/profile/${props.username}`)
                                    }}>Profile</MenuItem>

                                    <MenuItem onClick={() => {
                                        setOpen(false);
                                        history.push('/profile/settings')
                                    }}>Settings</MenuItem>

                                    <MenuItem onClick={
                                        () => window.localStorage.clear() + window.location.reload()
                                    }>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </div>
    )
}

export default DesktopNav;

//      <DesktopNav header="Desktop View" />