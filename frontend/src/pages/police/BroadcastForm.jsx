import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { styled } from '@mui/system';
import GradientButton from '../../components/shared/GradientButton'; // reuse if you have it already styled
import axios from "axios";

// Styled Glass Container
const GlassContainer = styled(Box)(({ theme }) => ({
  maxWidth: 700,
  margin: 'auto',
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  color: '#fff',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  '& .MuiInputBase-root': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00ddeb',
  },
  marginBottom: theme.spacing(2),
}));

const PoliceBroadcastForm = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      await axios.post(
        "https://trinetrawebapp.onrender.com/api/broadcast/",
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(true);
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Failed to send broadcast");
    }
  };

  return (
    <Box sx={{ bgcolor: "#0f0f1a", minHeight: "100vh", py: 6 }}>
      <GlassContainer>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #6b48ff, #00ddeb)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 3,
            textAlign: 'center',
          }}
        >
          🚔 Police Broadcast Panel
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Broadcast Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
          />

          <GradientButton type="submit" fullWidth>
            Send Broadcast
          </GradientButton>
        </form>
      </GlassContainer>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Broadcast sent successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PoliceBroadcastForm;
