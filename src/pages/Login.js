import { React, useEffect } from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
// import Jump from 'react-reveal/Jump';
import { Link, useLocation, useHistory } from "react-router-dom";
import Rotate from 'react-reveal/Rotate';
import logo from "../images/kinetic-logo.png";



const Login = (props) => {
  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    if (props.user.email) {
      history.push('/dashboard');
    }
  }
  )

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

      <div className="signup-text">
          New User? 
          <Link id="signup-inactive" to="/newuser" className={location.pathname === "/NewUser" ? " active" : " NewUser"}>
          <div className="text-danger"> Sign up</div>
          </Link>
      </div>

        <div id="login-active">
          <p>Log in</p>
        </div>

      <form onSubmit={props.handleFormSubmit}>
        <Container className="signInForm">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" required type="text" placeholder=" Email" autoComplete="on" name="email" value={props.formState.email} onChange={event=>props.setFormState({ ...props.formState, email: event.target.value})} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" required  type="password"  placeholder=" Password" autoComplete="on" name="password" value={props.formState.password} onChange={event=>props.setFormState({ ...props.formState, password: event.target.value})}
              />
            </Col>
          </Row>
          {<div className="form-error text-danger">{props.formErr}</div>}
          <div className="login-signin-btn">
            <button className="btn btn-outline-primary btn-block btn-lg" type="submit">
              Log in
            </button>
          </div>
          {/* </Link> */}
        </Container>
      </form>
      

    </div>
  );
};

export default Login;
