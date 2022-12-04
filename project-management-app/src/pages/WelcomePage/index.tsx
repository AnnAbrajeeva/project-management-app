import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import './styles.css';

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-header">
        <ButtonGroup>
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </ButtonGroup>
      </div>
      <div className="welcome-main">
        <div className="welcome-info">
          <p>
            Hello! We are Shahzod and Anna and we made TaskMaster. What is TaskMaster? TaskMaster is
            the visual tool that empowers your team to manage any type of project, workflow, or task
            tracking. Add files, checklists, or even automation: Customize it all for how your team
            works best. Just sign up, create a board, and you are off!
          </p>
          <img
            className="welcome-img"
            src="https://img.freepik.com/free-vector/scrum-method-concept-illustration_114360-9828.jpg?w=2000"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
