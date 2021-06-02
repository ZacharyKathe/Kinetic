import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function OldGoalsBtn() {
  return (
    <div className="text-center completed-goals">
      <Link to="/dashboard/" className="completed-goals">
        <Button className="completed-goals" color="primary">Back to Current Goals</Button>
      </Link>
    </div>
  )
}
