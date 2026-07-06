import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    session_id: {
        type: String,
        required: true,
    },
    session_name: {
        type: String,
    },
    chats: {
        type: Array,
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default chatSchema;
