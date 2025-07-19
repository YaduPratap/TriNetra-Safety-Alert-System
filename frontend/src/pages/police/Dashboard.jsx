import React from 'react';
import { Box, Typography } from '@mui/material';
import PieChartM from '../../components/PieChart';
import BarChartM from '../../components/BarChart';
import CountUp from 'react-countup';
import { styled } from '@mui/system';

// Styled Card with modern dark design
const GlassStatCard = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)', // Zooms in slightly on hover
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 4,
        bgcolor: '#0f0f1a', // Dark futuristic background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Stats Row */}
      <Box
        sx={{
          width: '100%',
          height: '20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <GlassStatCard
          sx={{
            width: '255px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ color: '#ff6b6b', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            <CountUp end={737} duration={1.5} />
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 1 }}>
            Theft
          </Typography>
        </GlassStatCard>

        <GlassStatCard
          sx={{
            width: '255px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ color: '#4ecdc4', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            <CountUp end={359} duration={1.5} />
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 1 }}>
            Vandalism
          </Typography>
        </GlassStatCard>

        <GlassStatCard
          sx={{
            width: '255px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ color: '#ff9f1c', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            <CountUp end={90} duration={1.5} />
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 1 }}>
            Violence
          </Typography>
        </GlassStatCard>

        <GlassStatCard
          sx={{
            width: '255px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ color: '#6b48ff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            <CountUp end={113} duration={1.5} />
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 1 }}>
            Others
          </Typography>
        </GlassStatCard>
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          width: '100%',
          height: '78%',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '49%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 5,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <BarChartM />
        </Box>
        <Box
          sx={{
            width: '49%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 5,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <PieChartM />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;