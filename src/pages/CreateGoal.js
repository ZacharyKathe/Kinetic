import React, {useState} from "react";
import Container from "../components/Container";
import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import Rotate from 'react-reveal/Rotate';


const CreateGoal = () => {
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const handleSubmit = e => {
      e.preventDefault();
      console.log(username, password)
      setusername("");
      setpassword("");
    };
  
    const location = useLocation();
    
    
  
    return (
      <div className='logInScreen'>
        <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active" : "nav-link NewUser"}>
            Dashboard
          </Link>
        
        <Rotate>
        <Jump> <h2 className='logIn'>Log in</h2> </Jump>
        <form onSubmit={handleSubmit}>
          <Container className="signInForm">
            <Row className="form-group">
              <Col size="12">
                <input className="form-control" type="text" placeholder="goal_category" name="goal_category" value={goal_category} onChange={event=>setusername(event.target.value)} />
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
        
  
      </div>
    );
  };
  
  export default CreateGoal;
  