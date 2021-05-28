import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import API from '../utils/API'
import Rotate from 'react-reveal/Rotate'

const Login = ({token}) => {

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  })

  const [userState, setUserState] = useState({
    token: "",
    user: {}
  })

  useEffect(() => {
    if (token) {
      API.getProfile(token).then(res => {
        console.log(res.data);
        setUserState({
          token: token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username
          }
        })
        console.log(userState);
      }).catch(err => {
        console.log("no logged in user", err)
        setUserState({
          token: "",
          user: {}
        })
      })
    } else {
      console.log("no token provided")
    }

  }, [])

  // When user tries to login:
  const handleFormSubmit = e => {
    e.preventDefault();
    API.login(formState).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token)
      setUserState({
        ...userState,
        token: res.data.token,
        user: {
          email: res.data.user.email,
          username: res.data.user.username,
          id: res.data.user.id
        }
      })
      localStorage.setItem("user", JSON.stringify(res.data.user))
      // localStorage.setItem('user', JSON.stringify(userState.user.username))

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

  const location = useLocation();



  return (
    <div className='logInScreen'>
      <Link to="/newuser" className={location.pathname === "/newuser" ? "nav-link active" : "nav-link NewUser"}>
        New User
        </Link>

      <Rotate>
        <Jump> <h2 className='logIn'>Log in</h2> </Jump>
        <form onSubmit={handleFormSubmit}>
          <Container className="signInForm">
            <Row className="form-group">
              <Col size="12">
                <input className="form-control" type="text" placeholder="Email" name="email" value={formState.email} onChange={event => setFormState({ ...formState, email: event.target.value })} />
              </Col>
            </Row>
            <Row className="form-group">
              <Col size="12">
                <input className="form-control" type="password" placeholder="Password" name="password" value={formState.password} onChange={event => setFormState({ ...formState, password: event.target.value })}
                />
              </Col>
            </Row>
            {/* <Link to="/dashboard"> */}
              <button className="btn btn-success" type="submit" >
                Log in
              </button>
            {/* </Link> */}
          </Container>
        </form>
      </Rotate>


    </div>
  );
};

export default Login;
