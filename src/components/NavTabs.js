import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavTabs() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Dashboard"
          className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Group"
          className={location.pathname === "/Group" ? "nav-link active" : "nav-link"}
        >
          Group
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/GroupGoals"
          className={location.pathname === "/GroupGoals" ? "nav-link active" : "nav-link"}
        >
          Group Goals
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/contact/learn"
          className={location.pathname === "/contact/learn" ? "nav-link active" : "nav-link"}
        >
          Learn
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;