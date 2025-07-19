import { Button } from '@mui/material';
import { styled } from '@mui/system';

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

export default GradientButton;
