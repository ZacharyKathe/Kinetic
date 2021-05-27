import React from "react";
import NavTabs from './components/NavTabs';
import Group from './pages/Group';
import GroupGoals from './pages/GroupGoals';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/Signup'
import "./App.css";
import Dashboard from "./pages/Dashboard";


function App() {

  return (
    <Router>
      <div className="App">


      </div>
      <Route exact path="/" component={Login} />
      <Route exact path="/newuser" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/group" component={Group} />
      <Route exact path="/groupgoals" component={GroupGoals} />
      <NavTabs />
    </Router>
  );
}

export default App;
