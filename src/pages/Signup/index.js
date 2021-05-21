import React, {useState} from "react";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";

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
    <div>
      <div className="mt-4">
        <h2>Sign Up</h2>
      </div>
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
        <Container className="mt-4">
          <h3>WAZZUP {username} </h3>
          <p>I probably shouldn't tell you this, but your password is {password}!</p>
        </Container>
      </form>
    </div>
  );
};

export default Signup;
