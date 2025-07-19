import Broadcast from "../models/broadcastModel.js";
import User from "../models/user.js";
import { broadcastMessageToUsers } from "../server.js";

const broadcastMessage = async (req, res) => {
    try {
        const { message, coordinates, radius } = req.body;

        const broadcast = new Broadcast({
            message,
            createdBy: req.user.userId,
            targetLocation: coordinates && radius ? {
                type: "Point",
                coordinates,
                radius
            } : undefined
        });

        broadcastMessageToUsers({
            message: broadcast.message,
            createdBy: req.user.userName,
            createdAt: broadcast.createdAt,
          });

        await broadcast.save();

        res.status(201).json({ message: "Broadcast sent successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const getMessege = async (req, res)=>{
    const { lat, lng } = req.query;

    let filter = {};
    if (lat && lng) {
        filter = {
            $or: [
                {
                    targetLocation: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [parseFloat(lng), parseFloat(lat)],
                            },
                            $maxDistance: 5000,
                        },
                    },
                },
                { targetLocation: null }
            ]
        };
    }

    const broadcasts = await Broadcast.find(filter)
        .sort({ createdAt: -1 })
        .populate("createdBy", "name");

    res.json(broadcasts);
}

export { broadcastMessage, getMessege }