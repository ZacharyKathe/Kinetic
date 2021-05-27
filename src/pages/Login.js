import React, {useState, useEffect} from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import API from '../utils/API'
import Rotate from 'react-reveal/Rotate'

const Login = () => {

  const [formState,setFormState] = useState({
    email:"",
    password:""
  })

  const [userState,setUserState] = useState({
    token:"",
    user:{
    }
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
        console.log("no logged in user", err)
        setUserState({
          token:"",
          user:{}
        })
      })
    } else {
      console.log("no token provided")
    }
    
  },[])

  // When user tries to login:
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
          name:res.data.user.name,
          id:res.data.user.id
        }
      })
      API.getDashboard(userState.token);
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

  const location = useLocation();
  
  

  return (
    <div className='logInScreen'>
      <Link to="/NewUser" className={location.pathname === "/NewUser" ? "nav-link active" : "nav-link NewUser"}>
          New User
        </Link>
      
      <Rotate>
      <Jump> <h2 className='logIn'>Log in</h2> </Jump>
      <form onSubmit={handleFormSubmit}>
        <Container className="signInForm">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder="Email" name="email" value={formState.email} onChange={event=>setFormState({ ...formState, email: event.target.value})} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder="Password"  name="password" value={formState.password} onChange={event=>setFormState({ ...formState, password: event.target.value})}
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

export default Login;
