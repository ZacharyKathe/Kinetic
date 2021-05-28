import API from "./utils/API";
import React, { useState, useEffect } from "react";
import NavTabs from './components/NavTabs';
import Group from './pages/Group';
import GroupGoals from './pages/GroupGoals';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/Signup'
import "./App.css";
import Dashboard from "./pages/Dashboard";
const token = localStorage.getItem('token');

function App() {

  const [formState,setFormState] = useState({
    email:"",
    password:""
  })
  const [signupFormState,setSignupFormState] = useState({
    email:"",
    password:"",
    username:""
  })

  const [userState,setUserState] = useState({
    token:"",
    user:{}
  })

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      API.getDashboard(token).then(res=>{
        console.log(res.data);
        setUserState({
          token:token,
          user:{
            email:res.data.email,
            id:res.data.id,
            username:res.data.username
          }
        })
      }).catch(err=>{
        console.log("no logged in user")
        setUserState({
          token:"",
          user:{}
        })
      })
    } else {
      console.log("no token provided")
    }
    
  },[])

  const handleFormSubmit = e =>{
    e.preventDefault();
    API.login(formState).then(res=>{
      console.log(res.data);
      localStorage.setItem("token",res.data.token)
      setUserState({
        ...userState,
        token:res.data.token,
        user:{
          email:res.data.user.email,
          username:res.data.user.username,
          id:res.data.user.id
        }
      })
    }).catch(err=>{
      console.log("error occured")
      console.log(err);
      localStorage.removeItem("token");
      setUserState({
        token:"",
        user:{}
      })
    })
    setFormState({
      email:"",
      password:""
    })
  }

  const handleSignupFormSubmit = e=>{
    e.preventDefault();
    console.log(signupFormState);
    API.signup(signupFormState).then(res=>{
      localStorage.setItem("token",res.data.token)
      setUserState({
        ...userState,
        token:res.data.token,
        user:{
          email:res.data.user.email,
          username:res.data.user.username,
          id:res.data.user.id
        }
      })
    }).catch(err=>{
      console.log("error occured")
      console.log(err);
      localStorage.removeItem("token");
      setUserState({
        token:"",
        user:{}
      })
    })
    setSignupFormState({
      name:"",
      email:"",
      password:""
    })
  }

  // const handleLogout = ()=>{
  //   setUserState({
  //     token:"",
  //     user:{}
  //   })
  //   localStorage.removeItem("token")
  // }

  return (
    <Router>
      <div className="App">


      </div>
      {/* <Route exact path="/" render={() => (
        token ? (
          <Redirect to="/dashboard" />
        ) : <Redirect to="/" />
      )} /> */}
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
      
        <Dashboard user={userState.user} token={userState.token}/>
      </Route>
      <Route exact path="/groups">
        <Group user={userState.user} token={userState.token}/>
      </Route>
      {/* <Route exact path="/groupgoals" component={GroupGoals} /> */}
      <NavTabs />
    </Router>
  );
}

export default App;
