import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Grid,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';

// Styled Components
const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  height: '100%', // Allow grid to handle height
  display: 'flex',
  flexDirection: 'column',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  background: 'linear-gradient(45deg, #6b48ff, #00ddeb)',
  color: 'white',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(45deg, #5433ff, #00b7c2)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

const CrimeReports = () => {
  const [crimeReports, setCrimeReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showVictims, setShowVictims] = useState(true);
  const [showSpectators, setShowSpectators] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCrimeReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/crime/getCrime', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrimeReports(response.data.crime || []);
      } catch (error) {
        console.error('Failed to fetch crime reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrimeReports();
  }, []);

  useEffect(() => {
    let filtered = crimeReports.filter((report) => {
      if (report.typeOfReporter === 'victim' && !showVictims) return false;
      if (report.typeOfReporter === 'spectator' && !showSpectators) return false;

      const query = searchQuery.toLowerCase();
      const typeOfCrime = report.typeOfCrime?.toLowerCase() || '';
      const reporterType = report.typeOfReporter?.toLowerCase() || '';
      const location = typeof report.location === 'string' ? report.location.toLowerCase() : '';

      return (
        typeOfCrime.includes(query) ||
        reporterType.includes(query) ||
        location.includes(query)
      );
    });
    setFilteredReports(filtered);
  }, [crimeReports, showVictims, showSpectators, searchQuery]);

  const handleSort = (type) => {
    let sorted = [...filteredReports];
    if (type === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (type === 'type') {
      sorted.sort((a, b) => a.typeOfCrime.localeCompare(b.typeOfCrime));
    }
    setFilteredReports(sorted);
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#0f0f1a' }}>
        <CircularProgress sx={{ color: '#00ddeb' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f0f1a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(20, 20, 40, 0.8)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ background: 'linear-gradient(45deg, #6b48ff, #00ddeb)', WebkitBackgroundClip: 'text', color: 'transparent' }}
        >
          Crime Reports
        </Typography>

        <TextField
          size="small"
          variant="outlined"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '40%',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
              '&:hover fieldset': { borderColor: '#00ddeb' },
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#00ddeb' }} /></InputAdornment>,
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')}><ClearIcon sx={{ color: '#fff' }} /></IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <Tooltip title="Sort Options">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: '#fff' }}><SortIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Toggle Victims">
            <IconButton onClick={() => setShowVictims(!showVictims)} sx={{ color: showVictims ? '#00ddeb' : '#fff' }}><PersonIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Toggle Spectators">
            <IconButton onClick={() => setShowSpectators(!showSpectators)} sx={{ color: showSpectators ? '#00ddeb' : '#fff' }}><VisibilityIcon /></IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { bgcolor: 'rgba(20, 20, 40, 0.9)', color: '#fff', borderRadius: '12px' } }}
          >
            <MenuItem onClick={() => handleSort('newest')}>Newest First</MenuItem>
            <MenuItem onClick={() => handleSort('oldest')}>Oldest First</MenuItem>
            <MenuItem onClick={() => handleSort('type')}>Sort by Type</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Reports Grid */}
      <Box sx={{ p: '20px 80px', flexGrow: 1, overflowY: 'auto' }}>
        {filteredReports.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No reports found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredReports.map((report, index) => (
              <Grid item xs={12} sm={6} md={4} key={report._id || index}>
                <Box sx={{ height: '100%',width:'300px' }}>
                  <GlassCard>
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#00ddeb' }}>
                          {report.typeOfCrime.toUpperCase()}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                          <strong>Type:</strong> {report.typeOfReporter}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          <strong>Reported:</strong> {new Date(report.createdAt).toLocaleString()}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          <strong>Occurred:</strong> {new Date(report.timeOfCrime).toLocaleString()}
                        </Typography>
                      </Box>
                      <GradientButton
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => {
                          setSelectedProof(Array.isArray(report.proof) ? report.proof : []);
                          setOpenModal(true);
                        }}
                        disabled={!Array.isArray(report.proof) || report.proof.length === 0}
                      >
                        View Proof
                      </GradientButton>
                    </CardContent>
                  </GlassCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Proof Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(20, 20, 40, 0.9)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            color: '#fff',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, background: 'linear-gradient(45deg, #6b48ff, #00ddeb)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Proofs
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {selectedProof.length > 0 ? (
              selectedProof.map((url, i) => (
                url.endsWith('.mp4') ? (
                  <Box key={i}>
                    <video width="300" controls style={{ borderRadius: '12px' }}>
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ) : url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                  <GlassCard key={i} sx={{ width: 300, height: 'auto' }}>
                    <CardMedia
                      component="img"
                      image={url}
                      alt={`proof-${i}`}
                      sx={{ height: 200, borderRadius: '12px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = '/placeholder.jpg')}
                    />
                  </GlassCard>
                ) : (
                  <Box key={i} sx={{ width: 300 }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Unsupported file type: {url}</Typography>
                  </Box>
                )
              ))
            ) : (
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>No proofs to display.</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CrimeReports;
