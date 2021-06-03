import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import NavTop from "../components/NavTop";
import API from "../utils/API";
import SaveGroupBtn from "../components/SaveGroupBtn"


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

    const id = props.user.id
    console.log(id)


    return (
        <div>
            <NavTop header="Create Group" />
            <form onSubmit={handleSubmit} className='createGroupForm'>
                <div>
                    <h3 className='blueBack'>Enter Group name</h3>
                    <input
                        className="createGroupInput"
                        type="text"
                        placeholder=" Enter a Group name..."
                        name="name"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ newGroup, name: e.target.value })}
                    />
                </div>
                <SaveGroupBtn />

            </form>
        </div>
    )
}

export default CreateGroup;