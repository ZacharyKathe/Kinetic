import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import saveGroupBtn from '../components/SaveGroupBtn'
import NavTop from "../components/NavTop";
import API from "../utils/API"
import SaveGoalBtn from "../components/SaveGoalBtn";


const CreateGroup = (props) =>{
    const history = useHistory();

    const [newGroup, setNewGroup] = useState({
        name:"",

    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        API.createGroup(newGroup, props.token)
    }
    
    return(
        <div>
            <NavTop header="Create Group"/>
            <form onSubmit={handleSubmit} className='creatGroupForm'>
            <input
                className="createGroupInput"
                type="text"
                placeholder=" Enter a Group name..."
                name="name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
                <SaveGoalBtn />
            </form>
        </div>
    )
}

export default CreateGroup;