import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";

const crimeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Styled Components
const GlassPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(20, 20, 40, 0.8)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
  },
}));

const CrimeDashboardMap = () => {
  const [crimeLocations, setCrimeLocations] = useState([]);
  const [filters, setFilters] = useState({
    Theft: true,
    Vandalism: true,
    Violence: true,
    Custom: true,
  });

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://trinetrawebapp.onrender.com/api/crime/getCrimeLocation",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setCrimeLocations(data.locations);
          console.log(data);
        } else {
          console.error("Failed to fetch:", data.message);
        }
      } catch (err) {
        console.error("Error fetching crime data:", err);
      }
    };

    fetchCrimes();
  }, []);

  const handleFilterChange = (type) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredCrimes = crimeLocations.filter((crime) => {
    const type = crime.typeOfCrime?.toLowerCase();
    if (type.includes("theft") && filters.Theft) return true;
    if (type.includes("vandalism") && filters.Vandalism) return true;
    if (type.includes("violence") && filters.Violence) return true;
    if (
      !["theft", "vandalism", "violence"].some((t) => type.includes(t)) &&
      filters.Custom
    )
      return true;
    return false;
  });

  return (
    <Box sx={{ height: "100vh", width: "100vw", position: "relative", bgcolor: "#0f0f1a" }}>
      {/* Filter Panel */}
      <GlassPaper
        elevation={3}
        sx={{
          position: "absolute",
          bottom: 20,
          left: 16,
          zIndex: 1000,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#fff",
            fontWeight: 600,
            background: "linear-gradient(45deg, #6b48ff, #00ddeb)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Filter Crimes
        </Typography>
        <FormGroup>
          {["Theft", "Vandalism", "Violence", "Custom"].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={filters[label]}
                  onChange={() => handleFilterChange(label)}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-checked": {
                      color: "#00ddeb",
                    },
                  }}
                />
              }
              label={label}
              sx={{ color: "rgba(255, 255, 255, 0.9)" }}
            />
          ))}
        </FormGroup>
      </GlassPaper>

      {/* Map */}
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {filteredCrimes.map((crime, index) => (
          <Marker
            key={index}
            position={[crime.location.latitude, crime.location.longitude]}
            icon={crimeIcon}
          >
            <Popup>
              <Box sx={{ color: "#fff", bgcolor: "rgba(20, 20, 40, 0.9)", p: 1, borderRadius: "8px" }}>
                <Typography variant="body1">
                  <strong style={{ color: "#00ddeb" }}>Type:</strong> {crime.typeOfCrime}
                  <br />
                  <strong style={{ color: "#00ddeb" }}>Reported By:</strong> {crime.typeOfReporter}
                  <br />
                  {crime.customCrimeDescription && (
                    <>
                      <strong style={{ color: "#00ddeb" }}>Description:</strong>{" "}
                      {crime.customCrimeDescription}
                    </>
                  )}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default CrimeDashboardMap;