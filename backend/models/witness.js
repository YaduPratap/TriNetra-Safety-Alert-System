// models/Witness.js
import mongoose from "mongoose";

const witnessSchema = new mongoose.Schema({
    crime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crime",
        required: true
    },
    witness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    response: {
        type: String,
        enum: ["yes", "no", "not sure", null],
        default: null
    },
    respondedAt: {
        type: Date
    },
    notifiedAt: {
        type: Date,
        default: Date.now
    },
    optionalProof: {
        type: [String] // URLs of image/video proof
    }
}, { timestamps: true });

export default mongoose.model("Witness", witnessSchema);
