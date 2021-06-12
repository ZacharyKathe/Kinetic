<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import updateGoals from "./components/updateGoals"
=======
import refreshGoals from "./components/refreshGoals"
>>>>>>> 5c85231bfc0d398ff796707ace1a7c63a295bd5c
import API from "./utils/API";
import Group from './pages/Group';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/Signup'
import "./App.css";
import Dashboard from "./pages/Dashboard";
import MyGroups from "./pages/MyGroups";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateGoal from "./pages/CreateGoal";
import CreateGroup from "./pages/CreateGroup";
import CompleteGoals from "./pages/CompleteGoals";
import AcceptInv from "./pages/AcceptInv";
import Members from "./pages/Members";

// import {initDB} from 'react-indexed-db'
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
        refreshGoals(token, res.data.Goals)
        // const request = window.indexedDB.open('kinetik-token',2)  //creating the indexDB
        // request.onupgradeneeded = event => {
        //   const db = event.target.result
        //   console.log('indexedDB-in progress')
        //   const tokenStore = request.result.createObjectStore("token", {
        //     keyPath: "token",
        //     autoIncrement: true
        //   })
        //   tokenStore.createIndex("userToken", "token")
        // }
        // request.onsuccess = () => {
        //   const db = request.result;
        //   const transaction = db.transaction(["token"], "readwrite");
        //   const tokenStore = transaction.objectStore("token")
        //   const userToken = tokenStore.index("userToken")
          
        //   tokenStore.add({userToken: token})
        // }
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
      const token = localStorage.getItem("token");
        // const request = window.indexedDB.open('kinetik-token',5)  //creating the indexDB
        // request.onupgradeneeded = event => {
        //   const db = event.target.result
        //   console.log('indexedDB-in progress')
        //   const tokenStore = request.result.createObjectStore("token", {
        //     keyPath: "token",
        //     autoIncrement: true
        //   })
        //   tokenStore.createIndex("userToken", "token")
        // }
        // request.onsuccess = () => {
        //   const db = request.result;
        //   const transaction = db.transaction(["token"], "readwrite");
        //   const tokenStore = transaction.objectStore("token")
        //   const userToken = tokenStore.index("userToken")
          
        //   tokenStore.add({userToken: result.data.token})
        // }
      API.getDashboard(token).then(res => {
        // console.log(res.data);
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
    // console.log(signupFormState);
    API.signup(signupFormState).then(result => {
      // console.log(result);
      localStorage.setItem("token", result.data.token)
      const request = window.indexedDB.open('kinetik-token',5)  //creating the indexDB
      request.onupgradeneeded = event => {
        const db = event.target.result
        console.log('indexedDB-in progress')
        const tokenStore = request.result.createObjectStore("token", {
          keyPath: "token",
          autoIncrement: true
        })
        tokenStore.createIndex("userToken", "token")
      }
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["token"], "readwrite");
        const tokenStore = transaction.objectStore("token")
        const userToken = tokenStore.index("userToken")
        
        tokenStore.add({userToken: result.data.token})
      }
      API.getDashboard(result.data.token).then(res => {
        // alert("Signup Successful!")
        // console.log(res.data);
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
      <Route exact path="/group/:id">
        <Group user={userState.user} token={userState.token} />
      </Route>
      <Route exact path="/group/:id/members">
        <Members user={userState.user} token={userState.token} />
      </Route>
      <Route exact path="/group/invitation/:id">
        <AcceptInv user={userState.user} token={userState.token} />
      </Route>
      <Route path="/dashboard/mycalendar">
        <Calendar user={userState.user} token={userState.token} />
      </Route>
      <Route path={`/profile/${userState.user.username}`}>
        <Profile user={userState.user} token={userState.token} />
      </Route>
      <Route exact path="/profile/settings">
        <Settings user={userState.user} token={userState.token} />
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
