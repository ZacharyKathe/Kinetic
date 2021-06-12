import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavTop from "../components/NavTop";
import API from "../utils/API";
import SaveGroupBtn from "../components/SaveGroupBtn"
import DesktopSaveGroupBtn from "../components/DesktopSaveGroupBtn";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-active.png";
import desktopGroup from "../images/desktop-group-inactive.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";


const CreateGroup = (props) => {
    const history = useHistory();

    const [newGroup, setNewGroup] = useState({
        name: "",

    })

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        API.createGroup(newGroup, token)
            .then(() => {
                // We should probably omit this, as we will pull the user group info on useEffect for mygroups page
                // API.getDashboard(token).then(res => {
                //     console.log(res.data);
                //     props.setUserState({
                //         token: props.token,
                //         user: {
                //             email: res.data.email,
                //             id: res.data.id,
                //             username: res.data.username,
                //             goals: res.data.Goals,
                //             groups: res.data.Groups,
                //         }
                //     })
                    history.push('/dashboard/mygroups')

                // })

            })

    }


    return (
        <div>
            <DesktopNav header="Desktop"
            homeBtn={desktopHome}
            groupBtn={desktopGroup}
            calendarBtn={desktopCalendar}
            actionBtn={<p className="desktop-header-text">Create Group</p>}
            />
            <NavTop header="Create Group" />
            <form onSubmit={handleSubmit} className='createGroupForm'>
                <div>
                    <h3 className='blueish'>Enter Group name</h3>
                    <input
                        className="createGroupInput"
                        type="text"
                        placeholder=" Enter a Group name..."
                        name="name"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ newGroup, name: e.target.value })}
                    />
                </div>
                    <DesktopSaveGroupBtn />
                    <SaveGroupBtn />
            </form>
        </div>
    )
}

export default CreateGroup;