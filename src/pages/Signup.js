import React from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
// import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import Rotate from 'react-reveal/Rotate';

import logo from "../images/kinetic-logo.png";


const Signup = (props) => {
  const location = useLocation(); 

  return (
    <div className='NewUserScreen'>
      <Rotate>
        <div>
            <img src={logo} alt="kinetic logo"/>
        </div>
      </Rotate>
      <div>
        <p className="logo-text">kinetik</p>
      </div>

      <div>
        <Link id="login-inactive" to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link NewUser"}>
          Log in
        </Link>
      </div>
        <div id="signup-active">
          <p>Sign up</p>
        </div>

      <form onSubmit={props.handleSignupFormSubmit}>
        <Container className="mt-3 px-5">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder=" Username" name="username" value={props.signupFormState.username} onChange={e=>props.setSignupFormState({...props.signupFormState, username: e.target.value})} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder=" Email" name="email" value={props.signupFormState.email} onChange={e=>props.setSignupFormState({...props.signupFormState, email: e.target.value})} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder=" Password"  name="password" value={props.signupFormState.password} onChange={e=>props.setSignupFormState({...props.signupFormState, password: e.target.value})}
              />
            </Col>
          </Row>
          <button className="btn btn-success" type="submit">
            Sign up
          </button>
        </Container>
      </form>

    </div>
  );
};

export default Signup;