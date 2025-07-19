import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EyeAnimation from "../../components/EyeAnimation";
import API from "../../api/api"


const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("citizen");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); // Loading screen state

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    console.log('hello')
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data } = await API.post('/auth/register', {
        name:name,
        email:email,
        password:password,
        roles:roles,
      });
      console.log(data)
      setShowLoadingScreen(true);
      setTimeout(() => {
        navigate('/citizenlogin');
      }, 1000);
    } catch (err) {
      setErrorMessage('Signup failed. Please check your credentials.');
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
    <form onSubmit={handleSignup} >
          <Typography color={'white'} variant="body2" fontWeight={300} gutterBottom>Name</Typography>
          <TextField
            size='small'
            fullWidth
            variant='outlined'
            name='name'
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
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
            {isLoading ? "Signing up..." : "SIGN UP"}
          </Button>
          <br />
          <br />
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant="caption" color='#e6dfdf' >Already Have An Account? <Link to="/citizenlogin" underline="none" color={"white"}>Login</Link>
            </Typography>
          </Box>
        </form>
     
    
    </Box>
  </Box>
  )
}

export default Signup