import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      const latLng = [e.latlng.lat, e.latlng.lng];
      console.log("📍 Map clicked:", latLng);
      onSelect(latLng);
    },
  });
  return null;
};

const MapFlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 16, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [location, map]);

  return null;
};

const ReportCrime = () => {
  const [location, setLocation] = useState(null);
  const [mode, setMode] = useState(""); // 'current' or 'map'
  const navigate = useNavigate();

  const handleUseCurrent = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setLocation(coords);
        setMode("current");
      },
      (err) => {
        console.error(err);
        alert("Unable to get current location.");
      }
    );
  };

  const handleChooseFromMap = () => {
    setLocation(null); // Clear existing location
    setMode("map");
  };

  const handleSubmit = () => {
    if (!location) {
      alert("Please select a location first.");
      return;
    }

    navigate("/crimedetails", { state: { location } });
  };

  return (
    <Box position="relative" height="100vh" width="100vw">
      {/* Floating Box */}
      <Box
        position="absolute"
        bottom={55}
        left="50%"
        sx={{
          transform: "translateX(-50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pb: 2,
          zIndex: 888,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "90%",
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Report a Crime
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" onClick={handleUseCurrent}>
              Use Current Location
            </Button>
            <Button variant="outlined" onClick={handleChooseFromMap}>
              Choose from Map
            </Button>
          </Box>

          {location && (
            <Typography>
              📍 Selected Location: {location[0].toFixed(4)},{" "}
              {location[1].toFixed(4)}
            </Typography>
          )}

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {/* Map */}
      <MapContainer
        center={location || [20.5937, 78.9629]} // Default center India
        zoom={location ? 16 : 5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mode === "map" && <LocationPicker onSelect={setLocation} />}
        {location && <Marker position={location} />}
        {location && <MapFlyToLocation location={location} />}
      </MapContainer>
    </Box>
  );
};

export default ReportCrime;
