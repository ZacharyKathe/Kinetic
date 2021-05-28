import React from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import Rotate from 'react-reveal/Rotate';
import logo from "../images/kinetic-logo.png";

const Login = (props) => {
  const location = useLocation();

  return (
    <div className='logInScreen'>
      <Rotate>
        <div>
            <img src={logo} alt="kinetic logo"/>
        </div>
      </Rotate>
      
      <div>
        <p className="logo-text">kinetik</p>
      </div>

      <div>
          <Link id="signup-inactive" to="/newuser" className={location.pathname === "/NewUser" ? "nav-link active" : "nav-link NewUser"}>
            Sign up
          </Link>
      </div>

        <div id="login-active">
          <p>Log in</p>
        </div>

      <form onSubmit={props.handleFormSubmit}>
        <Container className="signInForm">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder=" Email" name="email" value={props.formState.email} onChange={event=>props.setFormState({ ...props.formState, email: event.target.value})} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder=" Password"  name="password" value={props.formState.password} onChange={event=>props.setFormState({ ...props.formState, password: event.target.value})}
              />
            </Col>
          </Row>
          {/* {<Link to="/dashboard"} */}
          <button className="btn btn-success" type="submit">
            Log in
          </button>
          {/* </Link> */}
        </Container>
      </form>
      

    </div>
  );
};

export default Login;
