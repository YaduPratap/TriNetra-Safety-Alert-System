import React from 'react';
import { Outlet } from 'react-router-dom';
import CitizenNavbar from '../pages/citizen/CitizenNavbar';
import PoliceNavbar from '../pages/police/PoliceNavbar';
import Box from '@mui/material/Box';

const PrivateLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")); // adapt this if using context or cookies
  const role = user?.role;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Conditionally render navbar */}
      {role === 'citizen' && <CitizenNavbar />}
      {role === 'police' && <PoliceNavbar />}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PrivateLayout;
