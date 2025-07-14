import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    plan: {
        type: String,
        enum: ["basic", "pro", "premium"],
        default: "basic"
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
