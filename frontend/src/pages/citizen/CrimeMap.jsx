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

const crimeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const CrimeMap = () => {
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
          console.log(data)
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
    <Box sx={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          bottom: 20,
          left: 16,
          zIndex: 1000,
          p: 2,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom>
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
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Paper>

      {/* Map */}
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredCrimes.map((crime, index) => (
          <Marker
            key={index}
            position={[crime.location.latitude, crime.location.longitude]}
            icon={crimeIcon}
          >
            <Popup>
              <Typography variant="body1">
                <strong>Type:</strong> {crime.typeOfCrime}
                <br />
                <strong>Reported By:</strong> {crime.typeOfReporter}
                <br />
                {crime.customCrimeDescription && (
                  <>
                    <strong>Description:</strong>{" "}
                    {crime.customCrimeDescription}
                  </>
                )}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default CrimeMap;
