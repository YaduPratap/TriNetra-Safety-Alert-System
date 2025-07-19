import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EyeAnimation from "../../components/EyeAnimation";
import API from "../../api/api"
import { useDispatch } from 'react-redux';
import { login } from '../../features/suthSlice';


const Loginpolice = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); // Loading screen state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserLocationAndUpdate = async (token) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          await API.patch('/user/update-location', {
            latitude,
            longitude
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Location updated successfully.");
        } catch (err) {
          console.error("Failed to update location:", err.message);
        }
      },
      (error) => {
        console.warn("Error getting location:", error.message);
      }
    );
  };


  const handleLogin = async (e) => {
    console.log('hello')
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data } = await API.post('/auth/login', {
        email,
        password
      });

      const { token, user } = data;
      // dispatch(login({ user, token }));
      dispatch(login({ user: data.user, token: data.token }));

      await getUserLocationAndUpdate(token);

      setShowLoadingScreen(true);
      setTimeout(() => {
        navigate('/policehome');
      }, 5000);
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      setErrorMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
    sx={{
      bgcolor: "#020240",
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent:'space-between',
      alignItems: "center",
      paddingTop:"40px",
      paddingBottom:"80px",
    }}
  >
    <Box>
    <EyeAnimation />
    <form onSubmit={handleLogin} >
          <Typography color={'white'} variant="body2" fontWeight={300} gutterBottom>Email</Typography>
          <TextField
            size='small'
            fullWidth
            variant='outlined'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px", // Rounded corners
                backgroundColor: "transparent", // Transparent background
                border: "1px solid rgba(255, 255, 255, 0.5)", // Light border
                color: "white", // White text color
              },
              "& .MuiInputBase-input": {
                color: "white", // White input text
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.8)", // Border color on hover
              },
            }}
          />
          <br />
          <br />
          <Typography color={'white'} variant="body2" fontWeight={300} gutterBottom>Password</Typography>
          <TextField
            size='small'
            fullWidth
            variant='outlined'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px", // Rounded corners
                backgroundColor: "transparent", // Transparent background
                border: "1px solid rgba(255, 255, 255, 0.5)", // Light border
                color: "white", // White text color
              },
              "& .MuiInputBase-input": {
                color: "white", // White input text
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.8)", // Border color on hover
              },
            }}
          />
          <br />
          <br />
          <br />
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Button
            color='black'
            fullWidth
            variant='contained'
            type="submit"
            disabled={isLoading}
            sx={{
              borderRadius: '25px',
              bgcolor: 'white',
              color: 'black',
              boxShadow: 'none', // Removes the shadow
              '&:hover': {
                bgcolor: '#f0f0f0', // Optional: Change hover color
                boxShadow: 'none' // Ensure no shadow on hover
              }
            }}
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </Button>
        </form>
    </Box>
  </Box>
  )
}

export default Loginpolice