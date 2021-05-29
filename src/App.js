import API from "./utils/API";
import React, { useState, useEffect } from "react";
// import NavTabs from './components/NavTabs';
import Group from './pages/Group';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/Signup'
import "./App.css";
import Dashboard from "./pages/Dashboard";
const token = localStorage.getItem('token');

function App() {

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  })
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [userState, setUserState] = useState({
    token: "",
    user: {}
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      API.getDashboard(token).then(res => {
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
      console.log(result.data);
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
        console.log("no logged in user")
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
      name: "",
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
          />
      </Route>
      <Route exact path="/newuser">
        <Signup
          user={userState.user}
          handleFormSubmit={handleSignupFormSubmit}
          signupFormState={signupFormState}
          setSignupFormState={setSignupFormState}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard user={userState.user} token={userState.token} />
      </Route>
      <Route exact path="/groups">
        <Group user={userState.user} token={userState.token} />
      </Route>
      {/* <NavTabs /> */}
    </Router>
  );
}

export default App;
