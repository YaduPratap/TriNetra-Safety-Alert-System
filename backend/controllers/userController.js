import User from "../models/user.js";

export const updateUserLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const { userId } = req.user;

        if (!userId || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                geoLocation: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Location updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating location:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserById = async (req, res) =>{
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        return res.status(200).json({message: "success", userName:user.name })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}