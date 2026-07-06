import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    current_plan: {
        type: String,
        enum: ["FREE", "GO", "PREMIUM"],
        default: "FREE",
        required: true,
    },
    payment_status: {
        type: String,
        enum: ["PAID", "FAILED", "PENDING", "UNPAID"],
        default: "UNPAID",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default userSchema;
