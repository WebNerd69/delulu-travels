import mongoose, { InferSchemaType } from "mongoose";
import chatSchema from "../schema/chat.schema";

type chatType = InferSchemaType<typeof chatSchema>;

const CHAT =
    (mongoose.models.Chat as mongoose.Model<chatType>) ||
    mongoose.model("Chat", chatSchema);

export default CHAT;
