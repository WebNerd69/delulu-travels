import mongoose, { InferSchemaType } from "mongoose";
import popularTripsSchema from "../schema/popularTrips.schema";

type PTtype = InferSchemaType<typeof popularTripsSchema>;

const POPULAR_TRIPS =
    (mongoose.models.PopularTrips as mongoose.Model<PTtype>) ||
    mongoose.model("PopularTrips", popularTripsSchema);

export default POPULAR_TRIPS;
