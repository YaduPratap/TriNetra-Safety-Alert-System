import React from "react";
import EyeAnimation from "../components/EyeAnimation";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
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
        <Typography variant="h2" fontWeight={600} color="white">
          TRINETRA
        </Typography>
        <Typography variant="body1" color="white">
          Law for the people.Law by the people
        </Typography>
      </Box>
      <EyeAnimation />
      <Button  onClick={() => navigate("/roleselection")} variant="text" color="#020240" sx={{ bgcolor: "white",width:'300px',borderRadius:4 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default SplashScreen;
