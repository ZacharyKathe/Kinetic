import React from "react";
import "./style.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import profPic from '../../images/prof-pic.jpg'


function MemberCard(props) {

  return (
    <div className="member-card" key={props.key}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={profPic} />
        <Card.Body>
          <Card.Title><span className="text-center text-primary">{props.name}</span></Card.Title>
          <Card.Text>
            Hi, this is a short bio about who I am. I cannot wait to pursue all of my goals together with all of you!
    </Card.Text>
          <Button variant="primary">My Profile</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MemberCard;