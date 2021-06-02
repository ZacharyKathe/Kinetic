import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function OldGoalsBtn() {
  return (
    <div className="text-center completed-goals">
      <Link to="/dashboard/completed-goals" className="completed-goals">
        <Button className="completed-goals" color="primary">See Completed Goals</Button>
      </Link>
    </div>
  )
}
