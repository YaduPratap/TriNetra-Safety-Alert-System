import { Box } from '@mui/material';
import React from 'react';
import GeoFenceComponent from '../../components/GeoFence'; // ✅ Import the real GeoFence (renamed to avoid confusion)

const GeoFence = () => {
  return (
    <Box>
      <GeoFenceComponent /> {/* ✅ Use your working map component */}
    </Box>
  );
}

export default GeoFence;