import React from "react";
import Signup from "./pages/Signup";
import NavTabs from './components/NavTabs';
import Group from './pages/Group';
import GroupGoals from './pages/GroupGoals';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NewUser from './pages/NewUser'
import "./App.css";
import Dashboard from "./pages/Dashboard";


function App() {
  
  return (
    <Router>
    <div className="App">
      

    </div>
    <Route exact path="/" component={Signup} />
    <Route exact path="/NewUser" component={NewUser} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/Group" component={Group} />
    <Route exact path="/GroupGoals" component={GroupGoals} />
    <NavTabs />
    </Router>
  );
}

export default App;
