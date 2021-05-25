import React, {useState} from "react";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Jump from 'react-reveal/Jump'

import Rotate from 'react-reveal/Rotate'

const Signup = () => {
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password)
    setusername("");
    setpassword("");
  };

  
  
  

  return (
    <div className='logInScreen'>
      <Jump> <h2 className='logIn'>Log in</h2> </Jump>
      <Rotate>
      <form onSubmit={handleSubmit}>
        <Container className="signInForm">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder="Username" name="username" value={username} onChange={event=>setusername(event.target.value)} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder="Password"  name="password" value={password} onChange={event=>setpassword(event.target.value)}
              />
            </Col>
          </Row>
          <button className="btn btn-success" type="submit">
            Log in
          </button>
        </Container>
      </form>
      </Rotate>
      <br/>
      <br/>
      <br/>
      <br/>
      
        <div className="mt-4">
        <Jump> <h2>Sign Up</h2> </Jump>
      </div>
      
      <br/>
      <Rotate>
      <form onSubmit={handleSubmit}>
        <Container className="mt-3 px-5">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder="Username" name="username" value={username} onChange={event=>setusername(event.target.value)} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder="Password"  name="password" value={password} onChange={event=>setpassword(event.target.value)}
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
