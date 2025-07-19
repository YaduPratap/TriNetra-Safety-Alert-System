import React from "react";
import { Container, Typography, Button, Box, Card, CardActionArea, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    navigate(role === "citizen" ? "/citizenlogin" : "/policelogin");
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
            <Typography variant="h2" fontWeight={600} color="white">
            Select Your Role
            </Typography>
            <Typography variant="body1" color="white">
            Choose whether you are a Citizen or a Police Officer to continue.
            </Typography>
          </Box>

      <Box  display="flex" justifyContent="center" gap={3} height={'140px'}>
        <Card  onClick={() => handleSelectRole("citizen")} sx={{ width: 150, textAlign: "center", cursor: "pointer",borderRadius:'50%' }}>
          <CardActionArea >
            <CardContent>
              <PersonIcon sx={{ fontSize: 50, }} />
              <Typography variant="h6" mt={1}>Citizen</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card onClick={() => handleSelectRole("police")} sx={{ width: 150, textAlign: "center", cursor: "pointer",borderRadius:'50%' }}>
          <CardActionArea >
            <CardContent>
              <LocalPoliceIcon sx={{ fontSize: 50,}} />
              <Typography variant="h6" mt={1}>Police</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    <Typography variant="body1" color="white" mt={3}>Trinetra</Typography>
  </Box>
  );
};

export default RoleSelection;
