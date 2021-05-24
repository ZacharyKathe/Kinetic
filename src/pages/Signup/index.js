import React, {useState} from "react";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Bounce from 'react-reveal/Bounce'
import Zoom from 'react-reveal/Zoom'
import LightSpeed from 'react-reveal/LightSpeed'

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
       <LightSpeed><h2>Log in</h2></LightSpeed>
      <Zoom>
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
            Submit
          </button>
        </Container>
      </form>
      </Zoom>
      <br/>
      <br/>
      <br/>
      <br/>
      
        <div className="mt-4">
        <LightSpeed> <h2>Sign Up</h2></LightSpeed>
      </div>
      
      <br/>
      <Zoom>
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
            Submit
          </button>
        </Container>
      </form>
      </Zoom>

    </div>
  );
};

export default Signup;
