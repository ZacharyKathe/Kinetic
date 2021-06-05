import React, { useState } from "react";
import backBtn from "../../images/back.png";
import "./style.css";
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { MenuItem, MenuList, ClickAwayListener, Grow, Paper, Popper } from '@material-ui/core';

function NavTop(props) {

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

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);




    return (
        <>
        <div className="top-nav" >
            <img className='goBackBtn' src={backBtn} alt="back button" onClick={() => history.goBack()} />
            <div className="header-text">{props.header}</div>
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

                                    {props.group_id ?
                                    <MenuItem onClick={() => {
                                        setOpen(false);
                                        props.setInviteOpen(true);
                                        // history.push('/profile/settings')
                                    }}>Invite User</MenuItem>
                                    : "" }

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
        </>
    )
}

export default NavTop;