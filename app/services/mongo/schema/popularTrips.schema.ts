import mongoose from "mongoose";

const popularTripsSchema = new mongoose.Schema({
    trip_name: {
        type: String,
        required: true,
    },
    trip_details: {
        type: Object,
        default: {},
    },
    user_reviews: {
        type: Array,
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default popularTripsSchema
