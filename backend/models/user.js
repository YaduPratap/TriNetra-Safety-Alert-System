import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ["citizen", "police"],
        required: true,
    },
    geoLocation: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number] }, // [longitude, latitude]
    },
}, { timestamps: true });

userSchema.index({ geoLocation: '2dsphere' });

export default mongoose.model("User", userSchema);