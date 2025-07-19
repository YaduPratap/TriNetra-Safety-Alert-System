import express from "express";
import SOS from "../models/sosModel.js";
import User from "../models/user.js";

const sosCall = async(req, res)=>{
    try {
        const { userId, role } = req.user;
        const { latitude, longitude } = req.body;
        if (role !== "citizen") {
            return res.status(403).json({ message: "Only citizens can send SOS alerts." });
        }
        const newSOS = await SOS.create({
            location: { latitude, longitude },
            reporter: userId
        });
        res.status(201).json({ message: "SOS Alert Sent!", sos: newSOS });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateLocation = async (req, res)=>{
    try {
        const { userId, latitude, longitude } = req.body;

        // Update location in database
        await User.findByIdAndUpdate(userId, { location: { latitude, longitude } });

        res.json({ message: "Location updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const nearestLocation = async (req, res)=>{
    try {
        const { latitude, longitude } = req.query;

        const policeOfficers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    distanceField: "distance",
                    maxDistance: 5000,
                    spherical: true
                }
            },
            { $match: { roles: "police" } },
            { $sort: { distance: 1 } }  // Sort by nearest police officer
        ]);

        res.json({ policeOfficers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {sosCall, updateLocation}