import React, { useState, useRef, useEffect } from "react";
import {
    Box, Typography, RadioGroup, FormControlLabel, Radio,
    Button, Paper, Grid, IconButton, TextField, Card,
    CardMedia, Stack
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/api";

const CrimeDetails = () => {
    const [reporterType, setReporterType] = useState("Victim");
    const [crimeType, setCrimeType] = useState("Vandalism");
    const [severity, setSeverity] = useState("Low");
    const [customCrime, setCustomCrime] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [allowUpload, setAllowUpload] = useState("no");

    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fallback = location.state?.location;
        if (fallback && Array.isArray(fallback) && fallback.length === 2) {
            setCoords({ latitude: fallback[0], longitude: fallback[1] });
            return;
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setErrorMessage("Please allow location access to continue.");
                }
            );
        } else {
            setErrorMessage("Geolocation is not supported by this browser.");
        }
    }, [location]);

    const triggerImageUpload = () => {
        if (images.length >= 5) {
            alert("You can upload up to 5 images.");
            return;
        }
        imageInputRef.current.click();
    };

    const triggerVideoUpload = () => {
        if (video) {
            alert("Only one video is allowed.");
            return;
        }
        videoInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const remainingSlots = 5 - images.length;
        const filesToAdd = selectedFiles.slice(0, remainingSlots);
        setImages((prev) => [...prev, ...filesToAdd]);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        const { latitude, longitude } = coords;
        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            setErrorMessage("Location data is missing. Please allow location access and try again.");
            return;
        }

        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("typeOfReporter", reporterType.toLowerCase());
        formData.append("typeOfCrime", crimeType === "custom" ? "custom" : crimeType.toLowerCase());

        if (crimeType === "custom") {
            formData.append("customCrimeDescription", customCrime);
        }

        formData.append("severity", severity.toLowerCase());

        if (reporterType === "spectator" || allowUpload === "yes") {
            images.forEach((img) => {
                formData.append("proof", img);
            });
            if (video) {
                formData.append("proof", video);
            }
        }

        try {
            await API.post("/crime/report", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            navigate("/reportcrime");
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to submit crime report.");
        }
    };

    return (
        <Box minHeight="100vh" px={{ xs: 2, sm: 4 }} py={4} sx={{ background: "linear-gradient(to bottom right, #a1f0c4, #c2f3ff)" }}>
            <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 3, mb: 5 }}>
                <Typography variant="h5" fontWeight={800} align="center" gutterBottom>
                    CRIME DETAILS
                </Typography>

                {/* Reporter Type */}
                <Typography variant="subtitle1" mt={2} fontWeight={800}>Reporter Type</Typography>
                <RadioGroup
                    row
                    value={reporterType}
                    onChange={(e) => {
                        setReporterType(e.target.value);
                        if (e.target.value === "victim") {
                            setAllowUpload("no");
                        } else {
                            setAllowUpload("yes");
                        }
                    }}
                >
                    <FormControlLabel value="victim" control={<Radio />} label="Victim" />
                    <FormControlLabel value="spectator" control={<Radio />} label="Spectator" />
                </RadioGroup>

                {/* Ask if victim wants to upload */}
                {reporterType === "victim" && (
                    <Box mt={1}>
                        <Typography variant="subtitle2" fontWeight={600}>Do you want to upload any media?</Typography>
                        <RadioGroup
                            row
                            value={allowUpload}
                            onChange={(e) => setAllowUpload(e.target.value)}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Box>
                )}

                {/* Crime Type */}
                <Typography variant="subtitle1" mt={2} fontWeight={800}>Crime Type</Typography>
                <RadioGroup value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
                    <FormControlLabel value="theft" control={<Radio />} label="Theft" />
                    <FormControlLabel value="vandalism" control={<Radio />} label="Vandalism" />
                    <FormControlLabel value="violence" control={<Radio />} label="Violence" />
                    <FormControlLabel value="custom" control={<Radio />} label="Other" />
                </RadioGroup>

                {crimeType === "custom" && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Describe the Crime"
                        value={customCrime}
                        onChange={(e) => setCustomCrime(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                )}

                {/* Severity */}
                <Typography variant="subtitle1" mt={2} fontWeight={800}>Severity of Crime</Typography>
                <RadioGroup row value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <FormControlLabel value="low" control={<Radio />} label="Low" />
                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="high" control={<Radio />} label="High" />
                    <FormControlLabel value="critical" control={<Radio />} label="Critical" />
                </RadioGroup>

                {/* Upload Section */}
                {(reporterType === "spectator" || allowUpload === "yes") && (
                    <>
                        {/* Images */}
                        <Typography variant="subtitle1" mt={2} fontWeight={800}>Upload Images (up to 5)</Typography>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <IconButton onClick={triggerImageUpload} sx={{ backgroundColor: "#001233", color: "#fff" }}>
                                    <CameraAltIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs>
                                <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pt: 1 }}>
                                    {images.map((file, index) => (
                                        <Card key={index} sx={{ width: 80, height: 80 }}>
                                            <CardMedia component="img" height="80" image={URL.createObjectURL(file)} />
                                        </Card>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Video */}
                        <Typography variant="subtitle1" mt={3} fontWeight={800}>Upload Video (only 1)</Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <IconButton onClick={triggerVideoUpload} sx={{ backgroundColor: "#001233", color: "#fff" }}>
                                    <VideocamIcon />
                                </IconButton>
                            </Grid>
                            {video && (
                                <Grid item xs>
                                    <Card>
                                        <CardMedia component="video" src={URL.createObjectURL(video)} controls sx={{ width: "100%", height: 180 }} />
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </>
                )}

                {/* Hidden Inputs */}
                <input type="file" accept="image/*" multiple ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
                <input type="file" accept="video/*" ref={videoInputRef} style={{ display: "none" }} onChange={handleVideoChange} />

                {/* Submit */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, backgroundColor: "#001233", py: 1.5, fontWeight: "bold", borderRadius: 2 }}
                    onClick={handleSubmit}
                >
                    NEXT
                </Button>

                {errorMessage && (
                    <Typography mt={2} color="error" align="center">{errorMessage}</Typography>
                )}
            </Paper>
        </Box>
    );
};

export default CrimeDetails;
