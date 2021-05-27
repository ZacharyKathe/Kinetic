import React, { useState } from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
import Jump from "react-reveal/Jump";
import { Link, useLocation } from "react-router-dom";
import Rotate from "react-reveal/Rotate";
import API from "../utils/API";

const Signup = () => {
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [userState, setUserState] = useState({
    token: "",
    user: {},
  });

  const location = useLocation();

  // When user signs up:
  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    console.log(signupFormState);
    API.signup(signupFormState)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUserState({
          ...userState,
          token: res.data.token,
          user: {
            email: res.data.user.email,
            username: res.data.user.username,
            id: res.data.user.id,
          },
        });
      })
      .catch((err) => {
        console.log("error occured");
        console.log(err);
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {},
        });
      });
    setSignupFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="NewUserScreen">
      <Link
        to="/"
        className={
          location.pathname === "/" ? "nav-link active" : "nav-link NewUser"
        }
      >
        Log in
      </Link>

      <div className="mt-4">
        <Jump>
          {" "}
          <h2>Sign Up</h2>{" "}
        </Jump>
      </div>

      <br />
      <Rotate>
        <form onSubmit={handleSignupFormSubmit}>
          <Container className="mt-3 px-5">
            <Row className="form-group">
              <Col size="12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={signupFormState.username}
                  onChange={(e) =>
                    setSignupFormState({
                      ...signupFormState,
                      username: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col size="12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={signupFormState.email}
                  onChange={(e) =>
                    setSignupFormState({
                      ...signupFormState,
                      email: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col size="12">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signupFormState.password}
                  onChange={(e) =>
                    setSignupFormState({
                      ...signupFormState,
                      password: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <button className="btn btn-success" type="submit">
              Sign up
            </button>
          </Container>
        </form>
      </Rotate>
    </div>
  );
};

export default Signup;
