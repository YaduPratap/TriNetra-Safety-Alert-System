import mongoose from "mongoose";

const crimeSchema = new mongoose.Schema({
    location: {
        type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        required: true
    },
    timeOfCrime: {
        type: Date,
        required: true
    },
    typeOfReporter: {
        type: String,
        enum: ["victim", "spectator"],
        required: true
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    typeOfCrime: {
        type: String,
        enum: ["theft", "vandalism", "violence", "custom"],
        required: true
    },
    severity:{
        type: String,
        enum: ["low", "medium", "high", "critical"],
    },
    customCrimeDescription: {
        type: String,
        required: function () { return this.typeOfCrime === "custom"; }  // Required if typeOfCrime is custom
    },
    proof: {
        type: [String],
        validate: {
            validator: function (urls) {
                return urls.every(url => /^https?:\/\/.+\.(jpg|jpeg|png|mp4|avi|mov)$/i.test(url));
            },
            message: "Proof must be valid image or video URLs"
        }
    },
    
}, { timestamps: true });

export default mongoose.model("Crime", crimeSchema);
