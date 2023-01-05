import mongoose from "mongoose";

export default new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
});

