// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './LandingPage.css';
import LogOut from './logout';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="buttons-container">
        <Button variant="contained" onClick={() => navigate('/login')} className="Button">
          Login/Signup
        </Button>&nbsp;&nbsp;
        <Button variant="contained" onClick={() => navigate('/LandingPage')} className="Button">
          Home
        </Button>&nbsp;&nbsp;
        <Button variant="contained" onClick={() => navigate('/About')} className="Button">
          About
        </Button>&nbsp;&nbsp;
      </div>
      <div className="image-container">
        <img src="/image.jpg" alt="image" />
        <h1>Welcome to DAILYDOSE Medicine App</h1>
      </div>
    </div>
  );
};

export default Home;


