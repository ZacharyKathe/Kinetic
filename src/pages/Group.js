import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";

function Group(props) {

  const [myGroup, setMyGroup] = useState()

  // Grabs url group id
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // Fetches the group based off the url id, then sets state as group
    API.getOneGroup(id)
      .then((res => {
        console.log(res.data);
        setMyGroup(res.data)
      }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{myGroup ? myGroup.name : ""}</h1>
      <div className="group-updates">
        <h3>Updates render here</h3>
      </div>
    </div>
  );
}

export default Group;