// GeoFencingMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, useMap, Marker, Popup } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fly to user
function FlyToUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 13, { duration: 2 });
    }
  }, [position, map]);
  return null;
}

// Generate fake heatmap points
function generateFakeHeatmapPoints(center, count = 10, minRadius = 0.001, maxRadius = 0.008) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = minRadius + Math.random() * (maxRadius - minRadius);
    const latOffset = distance * Math.cos(angle);
    const lngOffset = distance * Math.sin(angle);
    points.push({
      lat: center.lat + latOffset,
      lng: center.lng + lngOffset,
      value: 1,
    });
  }
  return points;
}

// Calculate distance between two coordinates (Haversine Formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;
  return d;
}

const GeoFencingMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [crimeLocations, setCrimeLocations] = useState([]);
  const [fakeLocations, setFakeLocations] = useState([]);
  const [dangerAlert, setDangerAlert] = useState(false);
  const geofenceRadius = 300; // meters

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(userPos);

          // Generate more scattered fake points
          const closePoints = generateFakeHeatmapPoints(userPos, 10, 0.001, 0.003);
          const mediumPoints = generateFakeHeatmapPoints(userPos, 10, 0.004, 0.006);
          const farPoints = generateFakeHeatmapPoints(userPos, 10, 0.006, 0.008);
          setFakeLocations([...closePoints, ...mediumPoints, ...farPoints]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported.');
    }
  }, []);

  // Fetch real crime locations
  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/crime/getCrimeLocation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCrimeLocations(data.locations || []);
        } else {
          console.error('Failed to fetch crime locations:', data.message);
        }
      } catch (err) {
        console.error('Error fetching crime data:', err);
      }
    };

    fetchCrimes();
  }, []);

  const combinedCrimeLocations = [...crimeLocations, ...fakeLocations];

  // Check if user is in danger zone
  useEffect(() => {
    if (userPosition && combinedCrimeLocations.length > 0) {
      for (let loc of combinedCrimeLocations) {
        const dist = getDistance(userPosition.lat, userPosition.lng, loc.lat, loc.lng);
        if (dist <= 300) { // 300 meters danger zone
          setDangerAlert(true);
          break;
        }
      }
    }
  }, [userPosition, combinedCrimeLocations]);

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Default center
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Heatmap Layer */}
      {combinedCrimeLocations.length > 0 && (
        <HeatmapLayer
          points={combinedCrimeLocations.map(loc => ({
            lat: loc.lat,
            lng: loc.lng,
            value: 1,
          }))}
          longitudeExtractor={m => m.lng}
          latitudeExtractor={m => m.lat}
          intensityExtractor={m => m.value}
          radius={25}
          blur={20}
          max={5}
        />
      )}

      {/* User's Geofence */}
      {userPosition && (
        <>
          <Circle
            center={[userPosition.lat, userPosition.lng]}
            radius={geofenceRadius}
            pathOptions={{ color: 'blue', fillOpacity: 0.2 }}
          />
          <Marker position={[userPosition.lat, userPosition.lng]} icon={L.divIcon({ className: 'custom-icon', html: '📍' })}>
            <Popup>
              You are here
            </Popup>
          </Marker>
          <FlyToUser position={userPosition} />
        </>
      )}

      {/* Danger Alert Popup */}
      {dangerAlert && userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]} icon={L.divIcon({ className: 'danger-icon', html: '⚠' })}>
          <Popup>
            ⚠ <strong>Warning:</strong> Stay Safe in this Area!
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default GeoFencingMap;