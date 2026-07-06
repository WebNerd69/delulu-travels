import mongoose, { InferSchemaType } from "mongoose";
import userSchema from "../schema/user.schema";

type userType = InferSchemaType<typeof userSchema>;

const USER =
    (mongoose.models.User as mongoose.Model<userType>) ||
    mongoose.model("User", userSchema);

export default USER;
