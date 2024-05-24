import React from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './logout.css';

const LogOut = () => {
    const navigate = useNavigate();

    return(
        <>
        <Button variant ="contained" color = "error" onClick={() => navigate('/login')} className="Button">
          LOGOUT
        </Button>&nbsp;&nbsp;
        </>
    );
}
export default LogOut;