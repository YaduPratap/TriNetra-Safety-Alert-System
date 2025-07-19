import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/suthSlice'; 
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());                    // 1. clear Redux auth state
    navigate('/');                         // 2. redirect to landing or login page
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Settings;
