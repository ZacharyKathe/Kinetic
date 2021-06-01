import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect} from "react-router-dom";
import NavTop from "../components/NavTop";
import API from "../utils/API";
import SaveGroupBtn from "../components/SaveGroupBtn"


const CreateGroup = (props) =>{
    const history = useHistory();

    const [newGroup, setNewGroup] = useState({
        name:"",

    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        API.createGroup(newGroup, props.token)
         
    }
    
   const id = props.user.id
   console.log(id)
    
    
    return(
        <div>
            <NavTop header="Create Group"/>
            <form onSubmit={handleSubmit} className='createGroupForm'>
                <h3>Enter Group name</h3>
            <input
                className="createGroupInput"
                type="text"
                placeholder=" Enter a Group name..."
                name="name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({newGroup, name: e.target.value})}
                />
                <SaveGroupBtn />
            
            </form>
        </div>
    )
}

export default CreateGroup;