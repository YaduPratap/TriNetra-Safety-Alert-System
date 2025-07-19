import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Divider, Snackbar, Alert } from "@mui/material";
import { io } from "socket.io-client";

const socket = io("https://trinetrawebapp.onrender.com"); // or your deployed server

const BroadcastFeed = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    socket.on("receiveBroadcast", (messageObj) => {
      setBroadcasts((prev) => [messageObj, ...prev]);
      setLatestMessage(messageObj.message);
      setSnackbarOpen(true);
    });

    return () => socket.off("receiveBroadcast");
  }, []);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        📢 Broadcasts
      </Typography>

      {broadcasts.length === 0 ? (
        <Typography variant="body1" align="center">No broadcasts yet.</Typography>
      ) : (
        broadcasts.map((b, i) => (
          <Card key={i} variant="outlined" sx={{ mb: 2, bgcolor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{b.message}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="textSecondary">
                From: {b.createdBy || "Police"} • {new Date(b.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* 🔔 Snackbar Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          📢 New Broadcast: {latestMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BroadcastFeed;
