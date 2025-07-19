import mongoose from "mongoose";

const broadcastSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    targetLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: undefined,
        },
        radius: {
            type: Number, // in meters
            default: undefined,
        },
    }
});

export default mongoose.model("Broadcast", broadcastSchema);
