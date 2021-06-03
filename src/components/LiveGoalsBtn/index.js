import React from 'react';
import "./style.scss"
import { Link } from "react-router-dom";

export default function LiveGoalsBtn() {
  return (
    <div className="text-center completed-goals">
      <Link to="/dashboard/" className="completed-goals">
      <button class="btny btn-5">Back to Current Goals</button>
      </Link>
    </div>
  )
}
