import updateGoals from "./components/updateGoals"
import API from "./utils/API";
import React, { useState, useEffect } from "react";
// import NavTabs from './components/NavTabs';
import Group from './pages/Group';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/Signup'
import "./App.css";
import Dashboard from "./pages/Dashboard";
import MyGroups from "./pages/MyGroups";
import Calendar from "./pages/Calendar";
import CreateGoal from "./pages/CreateGoal";
import CreateGroup from "./pages/CreateGroup";
import CompleteGoals from "./pages/CompleteGoals";
const token = localStorage.getItem('token');

function App() {

  // const location = useLocation();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [userState, setUserState] = useState({
    token: "",
    user: {}
  })

  const [formErr, setFormErr] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      API.getDashboard(token).then(res => {
        // FUNCTION TO CHECK FREQUENCY/IF COMPLETE, THEN DISPLAY ACCORDINGLY
        updateGoals(token, res.data.Goals)
        setUserState({
          token: token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username,
            goals: res.data.Goals,
            groups: res.data.Groups,
          }
        })
        console.log(userState);
      }).catch(err => {
        console.log(err);
        console.log("no logged in user")
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {}
        })
      })
    } else {
      console.log("no token provided")
    }

  }, [])


  const handleFormSubmit = e => {
    e.preventDefault();
    API.login(formState).then(result => {
      localStorage.setItem("token", result.data.token)
      API.getDashboard(result.data.token).then(res => {
        console.log(res.data);
        setUserState({
          token: token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username,
            goals: res.data.Goals,
            groups: res.data.Groups,
          }
        })
      }).catch(err => {
        console.log("no logged in user", err)
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {}
        })
      })
    }).catch(err => {
      console.log("error occured")
      console.log(err);
      localStorage.removeItem("token");
      setUserState({
        token: "",
        user: {}
      })
      setFormErr("Incorrect email or password");
    })
    setFormState({
      email: "",
      password: ""
    })
  }

  const handleSignupFormSubmit = e => {
    e.preventDefault();
    console.log(signupFormState);
    API.signup(signupFormState).then(result => {
      console.log(result);
      localStorage.setItem("token", result.data.token)
      API.getDashboard(result.data.token).then(res => {
        alert("Signup Successful!")
        console.log(res.data);
        setUserState({
          token: token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username,
            goals: res.data.Goals,
            groups: res.data.Groups,
          }
        });
      }).catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {}
        })
      })
    }).catch(err => {
      console.log("error occured")
      console.log(err);
      localStorage.removeItem("token");
      setUserState({
        token: "",
        user: {}
      })
    })
    setSignupFormState({
      username: "",
      email: "",
      password: ""
    })
  }

  return (
    <Router>
      <div className="App">


      </div>
      <Route exact path="/">
        <Login
          user={userState.user}
          handleFormSubmit={handleFormSubmit}
          formState={formState}
          setFormState={setFormState}
          formErr={formErr}
        />
      </Route>
      <Route exact path="/newuser">
        <Signup
          user={userState.user}
          handleSignupFormSubmit={handleSignupFormSubmit}
          signupFormState={signupFormState}
          setSignupFormState={setSignupFormState}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard user={userState.user} token={token} />
      </Route>
      <Route path="/dashboard/mygroups">
        <MyGroups user={userState.user} token={userState.token} />
      </Route>
      <Route path="/dashboard/completed-goals">
        <CompleteGoals user={userState.user} token={userState.token} />
      </Route>
      <Route path="/group/:id">
        <Group user={userState.user} token={userState.token} />
      </Route>
      <Route path="/dashboard/mycalendar">
        <Calendar user={userState.user} token={userState.token} />
      </Route>
      <Route exact path="/creategoal">
        <CreateGoal user={userState.user} token={userState.token} setUserState={setUserState} />
      </Route>
      <Route exact path="/createGroup">
        <CreateGroup user={userState.user} token={userState.token} setUserState={setUserState}/>
      </Route>
      {/* <NavTabs /> */}
    </Router>
  );
}

export default App;
